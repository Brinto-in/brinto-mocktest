import {
  createMockTestSession,
  submitMockTestAttempt,
  fetchTestDetails,
  fetchAttemptDetailsBySession,
  fetchTestWithSession
} from "../../../lib/api/mockTestService";
import {
  fetchMockTestPassage,
  submitTypingResult
} from "../../../lib/api/passageService";

export function initComboEngine() {
  const configEl = document.getElementById("combo-config");
  const testIdRaw = configEl?.dataset.testIdRaw || "";
  const passageTestName = configEl?.dataset.passageTestName || "Odisha RI Typing Test";
  const testTitle = configEl?.dataset.testTitle || "";

  // Set to true ONLY for local dev if you want dummy questions when the API is down.
  const ALLOW_FALLBACK_QUESTIONS = false;

  // ── STATE ──
  let currentStage = 1; // 1 = MCQ, 2 = Typing 1, 3 = Typing 2
  let testActive = false;
  let busy = false;
  let finished = false;
  let mcqSubmitted = false;
  const typingPosted: Record<number, boolean> = { 1: false, 2: false };

  let questions: any[] = [];
  let currentIndex = 0;
  let answers: Record<number, number> = {};
  let marked = new Set<number>();
  let visited = new Set<number>();
  let sessionId: string | null = null;
  let mcqStartedAt = 0;
  let activeSection = "all";

  const parsedId = parseInt(testIdRaw, 10) || 11;
  const getToken = () => {
    const t = localStorage.getItem("brinto_token");
    return t && t !== "null" && t !== "undefined" ? t.trim() : "";
  };
  const getGuestId = () => {
    const g = localStorage.getItem("brinto_guest_id");
    return g && g !== "null" && g !== "undefined" ? g.trim() : "";
  };

  // ── ELEMENTS ──
  const step1 = document.getElementById("step-1");
  const step2 = document.getElementById("step-2");
  const step3 = document.getElementById("step-3");
  const panel1 = document.getElementById("mcq-panel");
  const panel2 = document.getElementById("typing-panel-1");
  const panel3 = document.getElementById("typing-panel-2");

  const btnHeaderSubmit = document.getElementById("btn-header-submit") as HTMLButtonElement | null;
  const comboModal = document.getElementById("combo-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");
  const btnModalCancel = document.getElementById("btn-modal-cancel") as HTMLButtonElement | null;
  const btnModalConfirm = document.getElementById("btn-modal-confirm") as HTMLButtonElement | null;
  const toastEl = document.getElementById("toast");

  const instrOverlay = document.getElementById("instr-overlay");
  const instrCb = document.getElementById("instr-agree-cb") as HTMLInputElement | null;
  const btnStart = document.getElementById("btn-start-test") as HTMLButtonElement | null;

  function showToast(msg: string, ms = 3500, title = "Tab switch detected!", badgeText?: string) {
    const tabToast = document.getElementById("tab-toast");
    const toastTitle = document.getElementById("toast-title");
    const toastSub = document.getElementById("toast-sub");
    const toastBadge = document.getElementById("toast-badge");

    if (toastTitle) toastTitle.textContent = title;
    if (toastSub) toastSub.textContent = msg;
    if (toastBadge) {
      if (badgeText) {
        toastBadge.textContent = badgeText;
        toastBadge.style.display = "inline-block";
      } else {
        toastBadge.style.display = "none";
      }
    }

    tabToast?.classList.add("show");
    clearTimeout((showToast as any)._t);
    (showToast as any)._t = setTimeout(() => {
      tabToast?.classList.remove("show");
    }, ms);
  }

  // ── LOAD TEST DETAILS FOR START MODAL ──
  fetchTestDetails(String(parsedId))
    .then((d: any) => {
      if (!d) return;
      const set = (id: string, v: any) => {
        const el = document.getElementById(id);
        if (el) el.textContent = String(v);
      };
      if (d.title) {
        set("instr-title", d.title);
        set("eh-title", d.title);
        document.title = `${d.title} | Brinto MockTest`;
      }
      if (d.exam) set("instr-exam-name", `${d.exam} · Combo Test`);
      if (d.duration) set("instr-duration", d.duration);

      const qCount = Array.isArray(d.questions) ? d.questions.length : d.questions || 100;
      const cMarks = d.correct_marks !== undefined ? d.correct_marks : 1;
      const wPenalty = d.wrong_penalty !== undefined ? d.wrong_penalty : 0.25;
      const tMarks = d.total_marks !== undefined ? d.total_marks : qCount * cMarks;

      set("instr-questions", qCount);
      set("instr-marks", tMarks);
      set("instr-mg-correct", `+${cMarks}`);
      set("instr-mg-wrong", wPenalty > 0 ? `-${wPenalty}` : "0");
      set("instr-correct-text", `${cMarks} mark${cMarks === 1 ? "" : "s"}`);
      set("instr-penalty-desc", wPenalty > 0 ? `Wrong answers attract a -${wPenalty} penalty.` : "No penalty for wrong answers.");
      set("instr-neg-text", wPenalty > 0 ? `Negative Marking (-${wPenalty})` : "No Negative Marking");
      const pill = document.getElementById("instr-neg-pill");
      if (pill) {
        pill.style.cssText = wPenalty > 0 ? "background:rgba(176,0,32,0.3)" : "background:rgba(27,107,58,0.2); color:#1b6b3a;";
      }
    })
    .catch((e: any) => console.warn("Failed to load test details:", e));

  instrCb?.addEventListener("change", () => {
    if (btnStart) btnStart.disabled = !instrCb.checked;
  });

  // ── FULLSCREEN ──
  const ENTER_FS_SVG = `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>`;
  const EXIT_FS_SVG = `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg>`;
  const btnFullscreen = document.getElementById("btn-fullscreen");

  function isFullscreen() {
    return !!(document.fullscreenElement || (document as any).webkitFullscreenElement || (document as any).msFullscreenElement);
  }
  function updateFullscreenIcon() {
    if (!btnFullscreen) return;
    const fs = isFullscreen();
    btnFullscreen.innerHTML = fs ? EXIT_FS_SVG : ENTER_FS_SVG;
    btnFullscreen.title = fs ? "Exit Fullscreen" : "Enter Fullscreen";
    btnFullscreen.setAttribute("aria-label", btnFullscreen.title);
  }
  function enterFullscreen() {
    const elem = document.documentElement as any;
    if (elem.requestFullscreen) elem.requestFullscreen().catch(() => {});
    else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
    else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
  }
  function exitFullscreen() {
    if (!isFullscreen()) return;
    const doc = document as any;
    if (doc.exitFullscreen) doc.exitFullscreen().catch(() => {});
    else if (doc.webkitExitFullscreen) doc.webkitExitFullscreen();
    else if (doc.msExitFullscreen) doc.msExitFullscreen();
  }
  btnFullscreen?.addEventListener("click", () => (isFullscreen() ? exitFullscreen() : enterFullscreen()));
  document.addEventListener("fullscreenchange", updateFullscreenIcon);
  document.addEventListener("webkitfullscreenchange", updateFullscreenIcon);
  document.addEventListener("msfullscreenchange", updateFullscreenIcon);

  btnStart?.addEventListener("click", async () => {
    enterFullscreen();
    btnStart.disabled = true;
    btnStart.textContent = "Starting Test...";
    try {
      await initMCQ();
      mcqStartedAt = Date.now();
      testActive = true;

      if (instrOverlay) {
        instrOverlay.style.transition = "opacity 0.3s";
        instrOverlay.style.opacity = "0";
        setTimeout(() => (instrOverlay.style.display = "none"), 300);
      }

      startStageTimer(totalSeconds);

      try {
        if (typeof (window as any).gtag === 'function') {
          (window as any).gtag('event', 'test_start', {
            test_id: testIdRaw || "11",
            test_type: 'combo',
            test_title: document.title
          });
        }
      } catch (gtagErr) {
        console.warn("gtag test_start error:", gtagErr);
      }
    } catch (err: any) {
      console.error("Error starting test:", err);
      alert("Unable to start test session: " + (err?.message || "Network error. Please try again."));
      if (btnStart && instrCb) {
        btnStart.disabled = !instrCb.checked;
        btnStart.textContent = "Start Test →";
      }
    }
  });

  // ── TIMER (uses end timestamp so background-tab throttling can't slow it) ──
  let totalSeconds = 120 * 60;
  let endAt = 0;
  let timerInterval: any = null;
  const timerEl = document.getElementById("combo-timer");

  function renderTimer(secs: number) {
    if (!timerEl) return;
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    timerEl.textContent = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }

  function startStageTimer(seconds: number) {
    clearInterval(timerInterval);
    totalSeconds = seconds;
    endAt = Date.now() + totalSeconds * 1000;
    renderTimer(totalSeconds);
    timerInterval = setInterval(async () => {
      const remaining = Math.max(0, Math.round((endAt - Date.now()) / 1000));
      renderTimer(remaining);
      if (remaining <= 0) {
        clearInterval(timerInterval);
        if (comboModal) comboModal.style.display = "none";
        if (currentStage === 1) {
          showToast("Advancing to Passage 1…", 3500, "MCQ section time up!");
          await submitMCQAttempt();
          goToStage(2);
          tt1.load(null);
        } else if (currentStage === 2) {
          showToast("Advancing to Passage 2…", 3500, "Passage 1 time up!");
          await postTypingResult(1);
          const p1Id = tt1.getPassageId();
          goToStage(3);
          tt2.load(p1Id);
        } else {
          showToast("Submitting final test…", 3500, "Passage 2 time up!");
          await postTypingResult(2);
          await finalSubmit(true);
        }
      }
    }, 1000);
  }

  // ── TAB-SWITCH MONITOR + LEAVE WARNING ──
  let tabSwitches = 0;
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && testActive && !finished) {
      tabSwitches++;
    } else if (!document.hidden && testActive && !finished && tabSwitches > 0) {
      showToast(
        "Please stay on this tab during the test.",
        4000,
        "Tab switch detected!",
        `${tabSwitches} warning${tabSwitches > 1 ? "s" : ""}`
      );
    }
  });
  window.addEventListener("beforeunload", (e) => {
    if (testActive && !finished) {
      e.preventDefault();
      e.returnValue = "";
    }
  });

  // ── STAGE UI ──
  function setStepState(el: HTMLElement | null, state: string, num: string, full: string, short: string) {
    if (!el) return;
    el.className = `combo-step ${state}`.trim();
    el.innerHTML = `<span class="step-num">${num}</span><span class="step-full">${full}</span><span class="step-short">${short}</span>`;
  }
  function setConnector(id: string, done: boolean) {
    const c = document.getElementById(id);
    if (c) c.className = done ? "step-connector done" : "step-connector";
  }

  function updateHeaderButton() {
    if (!btnHeaderSubmit) return;
    const lbl = (full: string, short: string) => `<span class="lbl-full">${full}</span><span class="lbl-short">${short}</span>`;
    if (currentStage === 1) btnHeaderSubmit.innerHTML = lbl("Submit MCQ & Next →", "Submit →");
    else if (currentStage === 2) btnHeaderSubmit.innerHTML = lbl("Submit Passage 1 →", "Submit P1 →");
    else btnHeaderSubmit.innerHTML = lbl("Submit Passage 2 →", "Submit P2 →");
  }

  function goToStage(n: number) {
    currentStage = n;
    clearInterval(timerInterval);
    renderTimer(15 * 60);

    if (n === 2) {
      setStepState(step1, "completed", "✓", "MCQ Test", "MCQ");
      setStepState(step2, "active", "2", "Passage 1", "P1");
      setConnector("conn-1-2", true);
      panel1?.classList.remove("active");
      panel2?.classList.add("active");
      const mobNav = document.getElementById("mobile-nav-bar");
      if (mobNav) mobNav.style.display = "none";
      const palToggle = document.getElementById("palette-toggle");
      if (palToggle) palToggle.style.display = "none";
      closeSidebarMob();
      const ov1 = document.getElementById("tt1-start-overlay");
      if (ov1) ov1.style.display = "flex";
    } else if (n === 3) {
      setStepState(step2, "completed", "✓", "Passage 1", "P1");
      setStepState(step3, "active", "3", "Passage 2", "P2");
      setConnector("conn-2-3", true);
      panel2?.classList.remove("active");
      panel3?.classList.add("active");
      const ov2 = document.getElementById("tt2-start-overlay");
      if (ov2) ov2.style.display = "flex";
    }
    updateHeaderButton();
  }

  document.getElementById("btn-start-p1")?.addEventListener("click", () => {
    const ov = document.getElementById("tt1-start-overlay");
    if (ov) ov.style.display = "none";
    startStageTimer(15 * 60);
    tt1.load(null);
  });

  document.getElementById("btn-start-p2")?.addEventListener("click", () => {
    const ov = document.getElementById("tt2-start-overlay");
    if (ov) ov.style.display = "none";
    const p1Id = tt1.getPassageId();
    startStageTimer(15 * 60);
    tt2.load(p1Id);
  });

  function requestAdvanceStage() {
    if (finished || busy) return;
    const answeredCount = Object.keys(answers).length;
    const markedCount = marked.size;
    const s1 = tt1.getStats();
    const s2 = tt2.getStats();

    const sumAns = document.getElementById("sum-mcq-ans");
    if (sumAns) sumAns.textContent = `${answeredCount} / ${questions.length}`;
    const sumMarked = document.getElementById("sum-mcq-marked");
    if (sumMarked) sumMarked.textContent = String(markedCount);
    const sumTt1 = document.getElementById("sum-tt1");
    if (sumTt1) sumTt1.textContent = `${s1.wpm} WPM (${s1.acc})`;
    const sumTt2 = document.getElementById("sum-tt2");
    if (sumTt2) sumTt2.textContent = `${s2.wpm} WPM (${s2.acc})`;

    const cardMcqAns = document.getElementById("mcard-mcq-ans");
    const cardMcqMark = document.getElementById("mcard-mcq-marked");
    const cardTt1 = document.getElementById("mcard-tt1");
    const cardTt2 = document.getElementById("mcard-tt2");

    if (currentStage === 1) {
      if (modalTitle) modalTitle.textContent = "Submit Section 1 (MCQ Test)?";
      if (modalDesc) modalDesc.textContent = `You have answered ${answeredCount} of ${questions.length} questions. Once submitted, you will advance to Passage 1 and cannot return to the MCQ section.`;
      if (cardMcqAns) cardMcqAns.style.display = "block";
      if (cardMcqMark) cardMcqMark.style.display = "block";
      if (cardTt1) cardTt1.style.display = "none";
      if (cardTt2) cardTt2.style.display = "none";
      if (btnModalConfirm) btnModalConfirm.textContent = "Submit and Proceed →";
    } else if (currentStage === 2) {
      if (modalTitle) modalTitle.textContent = "Submit Section 2 (Passage 1)?";
      if (modalDesc) modalDesc.textContent = `Your typing speed is ${s1.wpm} WPM with ${s1.acc} accuracy. Once submitted, you will proceed to Passage 2.`;
      if (cardMcqAns) cardMcqAns.style.display = "block";
      if (cardMcqMark) cardMcqMark.style.display = "none";
      if (cardTt1) cardTt1.style.display = "block";
      if (cardTt2) cardTt2.style.display = "none";
      if (btnModalConfirm) btnModalConfirm.textContent = "Submit and Proceed →";
    } else {
      if (modalTitle) modalTitle.textContent = "Final Submit OSSSC Combo Test?";
      if (modalDesc) modalDesc.textContent = "Review your overall performance across MCQ and both passages before final submission.";
      if (cardMcqAns) cardMcqAns.style.display = "block";
      if (cardMcqMark) cardMcqMark.style.display = "block";
      if (cardTt1) cardTt1.style.display = "block";
      if (cardTt2) cardTt2.style.display = "block";
      if (btnModalConfirm) btnModalConfirm.textContent = "Confirm Final Submission";
    }
    if (btnModalConfirm) btnModalConfirm.disabled = false;
    if (comboModal) comboModal.style.display = "grid";
  }

  btnHeaderSubmit?.addEventListener("click", requestAdvanceStage);
  btnModalCancel?.addEventListener("click", () => {
    if (busy) return;
    if (comboModal) comboModal.style.display = "none";
  });
  document.getElementById("tt1-submit-step")?.addEventListener("click", requestAdvanceStage);
  document.getElementById("tt2-submit-step")?.addEventListener("click", requestAdvanceStage);

  btnModalConfirm?.addEventListener("click", async () => {
    if (busy || finished) return;
    busy = true;
    if (btnModalConfirm) btnModalConfirm.disabled = true;
    if (btnModalCancel) btnModalCancel.disabled = true;
    const originalLabel = btnModalConfirm?.textContent || "Submit and Proceed →";
    if (btnModalConfirm) btnModalConfirm.textContent = "Submitting...";

    try {
      if (currentStage === 1) {
        const ok = await submitMCQAttempt();
        if (!ok) {
          alert("Could not submit your MCQ answers. Please check your internet connection and try again.");
          if (btnModalConfirm) btnModalConfirm.textContent = originalLabel;
          return;
        }
        if (comboModal) comboModal.style.display = "none";
        goToStage(2);
      } else if (currentStage === 2) {
        await postTypingResult(1);
        if (comboModal) comboModal.style.display = "none";
        goToStage(3);
      } else {
        if (comboModal) comboModal.style.display = "none";
        await finalSubmit(false);
      }
    } finally {
      busy = false;
      if (btnModalCancel) btnModalCancel.disabled = false;
      if (!finished && btnModalConfirm) btnModalConfirm.disabled = false;
    }
  });

  // ── MOBILE SIDEBAR ──
  const sidebar = document.getElementById("sidebar");
  const sidebarBackdrop = document.getElementById("sidebar-backdrop");
  const paletteToggle = document.getElementById("palette-toggle");
  const sidebarCloseBtn = document.getElementById("sidebar-close-btn");

  function closeSidebarMob() {
    sidebar?.classList.remove("open");
    sidebarBackdrop?.classList.remove("open");
  }
  paletteToggle?.addEventListener("click", () => {
    sidebar?.classList.add("open");
    sidebarBackdrop?.classList.add("open");
  });
  sidebarCloseBtn?.addEventListener("click", closeSidebarMob);
  sidebarBackdrop?.addEventListener("click", closeSidebarMob);

  // ── MCQ ENGINE ──
  const qNum = document.getElementById("q-num");
  const qText = document.getElementById("q-text");
  const optionsContainer = document.getElementById("options-container");
  const qSectionTag = document.getElementById("q-section-tag");
  const qProgressText = document.getElementById("q-progress-text");
  const qProgressFill = document.getElementById("q-progress-fill");
  const btnPrev = document.getElementById("btn-prev") as HTMLButtonElement | null;
  const btnNext = document.getElementById("btn-next") as HTMLButtonElement | null;
  const btnMark = document.getElementById("btn-mark") as HTMLButtonElement | null;
  const btnClear = document.getElementById("btn-clear") as HTMLButtonElement | null;
  const btnPrevMob = document.getElementById("btn-prev-mob") as HTMLButtonElement | null;
  const btnNextMob = document.getElementById("btn-next-mob") as HTMLButtonElement | null;
  const btnMarkMob = document.getElementById("btn-mark-mob") as HTMLButtonElement | null;
  const paletteGrid = document.getElementById("palette-grid");
  const paletteSections = document.getElementById("palette-sections");

  async function initMCQ() {
    const createdSessionId = await createMockTestSession(parsedId);
    if (createdSessionId) {
      sessionId = createdSessionId;
    }

    const qData = await fetchTestWithSession(parsedId, sessionId);

    if (qData && Array.isArray(qData.questions) && qData.questions.length > 0) {
      questions = qData.questions.map((q: any) => ({
        ...q,
        text: q.text || q.question || q.title || "Question",
        optionsObjects: Array.isArray(q.options) ? q.options : [],
        options: Array.isArray(q.options)
          ? q.options.map((opt: any) => (typeof opt === "object" && opt !== null ? opt.text : opt))
          : [],
      }));
      if (qData.duration) totalSeconds = qData.duration * 60;
    } else if (ALLOW_FALLBACK_QUESTIONS) {
      questions = [
        {
          id: 1,
          text: "In which year was the Odisha Sub-ordinate Staff Selection Commission (OSSSC) established?",
          options: ["2010", "2012", "2015", "2018"],
          optionsObjects: [{ id: "opt-1", text: "2010" }, { id: "opt-2", text: "2012" }, { id: "opt-3", text: "2015" }, { id: "opt-4", text: "2018" }],
          section: "General Awareness",
        },
      ];
    } else {
      throw new Error("Could not load questions. Please try again.");
    }

    buildSectionTabs();
    renderPalette();
    renderQuestion(0);
  }

  function buildSectionTabs() {
    if (!paletteSections) return;
    const secs = [...new Set(questions.map((q) => q.section).filter(Boolean))];
    paletteSections.innerHTML = "";
    const mk = (label: string, key: string) => {
      const b = document.createElement("button");
      b.className = "sec-tab" + (key === activeSection ? " active" : "");
      b.dataset.sec = key;
      b.textContent = label;
      b.addEventListener("click", () => {
        activeSection = key;
        paletteSections.querySelectorAll(".sec-tab").forEach((t: any) => t.classList.toggle("active", t.dataset.sec === key));
        renderPalette();
      });
      paletteSections.appendChild(b);
    };
    mk("All", "all");
    if (secs.length > 1) secs.forEach((s) => mk(s, s));
  }

  function getQState(i: number) {
    const isAnswered = answers[i] !== undefined;
    const isMarked = marked.has(i);
    if (!visited.has(i)) return "not-visited";
    if (isAnswered && isMarked) return "ans-marked";
    if (isMarked) return "marked";
    if (isAnswered) return "answered";
    return "not-answered";
  }

  function renderPalette() {
    if (!paletteGrid) return;
    paletteGrid.innerHTML = "";
    questions.forEach((q, idx) => {
      if (activeSection !== "all" && q.section !== activeSection) return;
      const btn = document.createElement("button");
      btn.className = `pq-btn ${getQState(idx)}`;
      if (idx === currentIndex) btn.classList.add("current");
      btn.dataset.idx = String(idx);
      btn.textContent = String(idx + 1);
      btn.setAttribute("aria-label", `Question ${idx + 1}`);
      btn.addEventListener("click", () => {
        renderQuestion(idx);
        closeSidebarMob();
      });
      paletteGrid.appendChild(btn);
    });
  }

  function updatePaletteButton(idx: number) {
    if (!paletteGrid) return;
    const btn = paletteGrid.querySelector(`[data-idx="${idx}"]`);
    if (!btn) return;
    btn.className = `pq-btn ${getQState(idx)}`;
    if (idx === currentIndex) btn.classList.add("current");
  }

  function renderQuestion(idx: number) {
    const prevIdx = currentIndex;
    currentIndex = idx;
    visited.add(idx);
    const q = questions[idx];
    if (!q) return;

    if (qNum) qNum.textContent = `Question ${idx + 1}`;
    if (qText) qText.textContent = q.text || "Question text unavailable";
    if (qSectionTag) qSectionTag.textContent = q.section || "General";
    if (qProgressText) qProgressText.textContent = `Question ${idx + 1} of ${questions.length}`;
    if (qProgressFill) qProgressFill.style.width = `${((idx + 1) / questions.length) * 100}%`;

    const isFirst = idx === 0;
    if (btnPrev) {
      btnPrev.disabled = isFirst;
      btnPrev.style.opacity = isFirst ? "0.4" : "1";
      btnPrev.style.pointerEvents = isFirst ? "none" : "auto";
    }
    if (btnPrevMob) {
      btnPrevMob.disabled = isFirst;
      btnPrevMob.style.opacity = isFirst ? "0.4" : "1";
      btnPrevMob.style.pointerEvents = isFirst ? "none" : "auto";
    }

    const isLast = idx === questions.length - 1;
    if (btnNext) btnNext.textContent = isLast ? "Submit MCQ & Next →" : "Save & Next →";
    if (btnNextMob) btnNextMob.textContent = isLast ? "Submit →" : "Save & Next →";

    const isMarked = marked.has(idx);
    [btnMark, btnMarkMob].forEach((b) => b && b.classList.toggle("marked", isMarked));

    if (optionsContainer) {
      optionsContainer.innerHTML = "";
      const opts = Array.isArray(q.options) ? q.options : [];
      const keys = ["A", "B", "C", "D", "E", "F"];

      opts.forEach((opt: any, oIdx: number) => {
        const optText = typeof opt === "object" && opt !== null ? opt.text || opt.title || "" : String(opt);
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "option-btn";
        if (answers[idx] === oIdx) btn.classList.add("selected");

        const key = document.createElement("span");
        key.className = "opt-key";
        key.textContent = keys[oIdx] || String(oIdx + 1);

        const label = document.createElement("span");
        label.className = "opt-text";
        label.textContent = optText;

        btn.appendChild(key);
        btn.appendChild(label);
        btn.addEventListener("click", () => {
          answers[idx] = oIdx;
          renderQuestion(idx);
        });
        optionsContainer.appendChild(btn);
      });
    }

    updatePaletteButton(prevIdx);
    updatePaletteButton(idx);
  }

  function handlePrev() {
    if (currentIndex > 0) renderQuestion(currentIndex - 1);
  }
  function handleNext() {
    if (currentIndex < questions.length - 1) renderQuestion(currentIndex + 1);
    else requestAdvanceStage();
  }
  function handleMark() {
    if (marked.has(currentIndex)) marked.delete(currentIndex);
    else marked.add(currentIndex);
    updatePaletteButton(currentIndex);
    const isMarked = marked.has(currentIndex);
    [btnMark, btnMarkMob].forEach((b) => b && b.classList.toggle("marked", isMarked));
  }

  btnPrev?.addEventListener("click", handlePrev);
  btnPrevMob?.addEventListener("click", handlePrev);
  btnNext?.addEventListener("click", handleNext);
  btnNextMob?.addEventListener("click", handleNext);
  btnMark?.addEventListener("click", handleMark);
  btnMarkMob?.addEventListener("click", handleMark);
  btnClear?.addEventListener("click", () => {
    delete answers[currentIndex];
    renderQuestion(currentIndex);
  });

  // ═════════════════════════════════════════════
  // TYPING ENGINE
  // ═════════════════════════════════════════════
  function setupTypingTest(prefix: string) {
    const passageEl = document.getElementById(`${prefix}-passage`);
    const inputEl = document.getElementById(`${prefix}-input`) as HTMLTextAreaElement | null;
    const wpmEl = document.getElementById(`${prefix}-wpm`);
    const accEl = document.getElementById(`${prefix}-acc`);
    const errEl = document.getElementById(`${prefix}-errors`);
    const correctEl = document.getElementById(`${prefix}-correct`);
    const bsEl = document.getElementById(`${prefix}-backspaces`);
    const prgEl = document.getElementById(`${prefix}-progress`);
    const resetBtn = document.getElementById(`${prefix}-reset`);

    let passage = "";
    let passageId: number | null = null;
    let loaded = false;
    let expected: string[] = [];
    let charSpans: HTMLElement[] = [];
    let startedAt = 0;
    let keystrokes = 0;
    let backspaces = 0;
    let loadToken = 0;

    const normalize = (t: any) => String(t || "").replace(/\s+/g, " ").trim();

    function showStatus(html: string, isError = false) {
      loaded = false;
      charSpans = [];
      expected = [];
      if (passageEl) passageEl.innerHTML = `<div class="tt-status ${isError ? "error" : ""}">${html}</div>`;
      if (inputEl) inputEl.disabled = true;
      updateScrollbar();
    }

    function buildSpans() {
      if (!passageEl) return;
      passageEl.innerHTML = "";
      charSpans = [];
      expected = [];
      const tokens = passage.match(/\S+|\s+/g) || [];
      tokens.forEach((token) => {
        if (/^\s+$/.test(token)) {
          for (const ch of token) {
            const s = document.createElement("span");
            s.className = "tt-ch";
            s.textContent = "\u00A0";
            passageEl.appendChild(s);
            charSpans.push(s);
            expected.push(" ");
          }
        } else {
          const wrap = document.createElement("span");
          wrap.className = "tt-word";
          for (const ch of token) {
            const s = document.createElement("span");
            s.className = "tt-ch";
            s.textContent = ch;
            wrap.appendChild(s);
            charSpans.push(s);
            expected.push(ch);
          }
          passageEl.appendChild(wrap);
        }
      });
      if (charSpans[0]) charSpans[0].classList.add("current");
      passageEl.scrollTop = 0;
      updateScrollbar();
    }

    function compute() {
      const val = inputEl?.value || "";
      let correct = 0;
      let errors = 0;
      const n = Math.min(val.length, expected.length);
      for (let i = 0; i < n; i++) {
        if (val[i] === expected[i]) correct++;
        else errors++;
      }
      let wpm = 0;
      if (startedAt > 0 && val.length > 0) {
        const mins = Math.max((Date.now() - startedAt) / 60000, 1 / 60);
        wpm = correct / 5 / mins;
      }
      const accuracy = val.length > 0 ? Math.max(0, Math.round(((val.length - errors) / val.length) * 100)) : 100;
      return { val, correct, errors, wpm, accuracy };
    }

    function resetStats() {
      startedAt = 0;
      keystrokes = 0;
      backspaces = 0;
      if (wpmEl) wpmEl.textContent = "0";
      if (accEl) accEl.textContent = "100%";
      if (errEl) errEl.textContent = "0";
      if (correctEl) correctEl.textContent = "0";
      if (bsEl) bsEl.textContent = "0";
      if (prgEl) prgEl.textContent = "0%";
    }

    function reset() {
      if (!loaded || !inputEl) return;
      inputEl.value = "";
      resetStats();
      buildSpans();
      inputEl.focus();
    }

    function setPassage(text: string, id?: number | null) {
      passage = normalize(text);
      passageId = id ?? null;
      if (inputEl) {
        inputEl.value = "";
        resetStats();
        buildSpans();
        loaded = true;
        inputEl.disabled = false;
        inputEl.maxLength = passage.length;
        inputEl.focus();
      }
    }

    async function fetchPassage(excludeId?: number | null) {
      const passageRes = await fetchMockTestPassage(passageTestName, excludeId);
      if (!passageRes?.text) throw new Error("No passage returned by server");
      return {
        text: passageRes.text,
        id: passageRes.id,
        timeSeconds: passageRes.timeSeconds
      };
    }

    async function load(excludeId?: number | null) {
      const myToken = ++loadToken;
      showStatus("Loading passage…");
      try {
        const p = await fetchPassage(excludeId);
        if (myToken !== loadToken) return;
        setPassage(p.text, p.id);
        if (p.timeSeconds && p.timeSeconds > 0) {
          startStageTimer(p.timeSeconds);
        } else {
          startStageTimer(15 * 60);
        }
      } catch (err) {
        if (myToken !== loadToken) return;
        console.error(`Error fetching passage (${prefix}):`, err);
        showStatus(`Could not load the passage.<button type="button" class="tt-retry">Retry</button>`, true);
        passageEl?.querySelector(".tt-retry")?.addEventListener("click", () => load(excludeId));
      }
    }

    if (inputEl) {
      ["paste", "drop", "cut", "copy", "contextmenu"].forEach((evt) =>
        inputEl.addEventListener(evt, (e) => e.preventDefault())
      );

      const BLOCKED_KEYS = new Set([
        "Enter", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown",
        "Home", "End", "PageUp", "PageDown"
      ]);
      const caretToEnd = () => {
        const len = inputEl.value.length;
        if (inputEl.selectionStart !== len || inputEl.selectionEnd !== len) {
          inputEl.setSelectionRange(len, len);
        }
      };
      inputEl.addEventListener("keydown", (e) => {
        const mod = e.ctrlKey || e.metaKey;
        if (
          BLOCKED_KEYS.has(e.key) ||
          (mod && ["a", "A", "z", "Z", "y", "Y"].includes(e.key)) ||
          ((mod || e.altKey) && (e.key === "Backspace" || e.key === "Delete")) ||
          e.key === "Delete"
        ) {
          e.preventDefault();
          return;
        }
        caretToEnd();
      });
      inputEl.addEventListener("mousedown", (e) => {
        e.preventDefault();
        if (!inputEl.disabled) {
          inputEl.focus();
          caretToEnd();
        }
      });
      ["selectstart", "dragstart"].forEach((evt) =>
        inputEl.addEventListener(evt, (e) => e.preventDefault())
      );
      ["select", "focus", "click", "keyup", "touchend"].forEach((evt) =>
        inputEl.addEventListener(evt, caretToEnd)
      );
      document.addEventListener("selectionchange", () => {
        if (document.activeElement === inputEl) caretToEnd();
      });
    }

    if (passageEl) {
      ["wheel", "touchmove"].forEach((evt) =>
        passageEl.addEventListener(evt, (e) => e.preventDefault(), { passive: false })
      );
    }

    const trackEl = document.getElementById(`${prefix}-scrollbar`);
    const thumbEl = document.getElementById(`${prefix}-thumb`);

    function updateScrollbar() {
      if (!passageEl || !trackEl || !thumbEl) return;
      const { scrollHeight, clientHeight, scrollTop } = passageEl;
      const maxScroll = scrollHeight - clientHeight;
      if (maxScroll <= 1 || clientHeight === 0) {
        trackEl.classList.add("hidden");
        return;
      }
      trackEl.classList.remove("hidden");
      const trackH = trackEl.clientHeight;
      const thumbH = Math.max(32, (clientHeight / scrollHeight) * trackH);
      thumbEl.style.height = `${thumbH}px`;
      thumbEl.style.transform = `translateY(${(scrollTop / maxScroll) * (trackH - thumbH)}px)`;
    }

    function scrollToTrackY(y: number, grabOffset: number) {
      if (!passageEl || !trackEl || !thumbEl) return;
      const maxScroll = passageEl.scrollHeight - passageEl.clientHeight;
      const range = trackEl.clientHeight - thumbEl.offsetHeight;
      if (range <= 0) return;
      const ratio = Math.min(1, Math.max(0, (y - grabOffset) / range));
      passageEl.scrollTop = ratio * maxScroll;
    }

    let grabOffset = 0;
    thumbEl?.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      e.stopPropagation();
      grabOffset = e.clientY - thumbEl.getBoundingClientRect().top;
      thumbEl.setPointerCapture(e.pointerId);
      thumbEl.classList.add("dragging");
    });
    thumbEl?.addEventListener("pointermove", (e) => {
      if (!thumbEl.hasPointerCapture(e.pointerId)) return;
      scrollToTrackY(e.clientY - (trackEl?.getBoundingClientRect().top || 0), grabOffset);
    });
    const endDrag = (e: PointerEvent) => {
      if (thumbEl?.hasPointerCapture(e.pointerId)) thumbEl.releasePointerCapture(e.pointerId);
      thumbEl?.classList.remove("dragging");
    };
    thumbEl?.addEventListener("pointerup", endDrag);
    thumbEl?.addEventListener("pointercancel", endDrag);

    trackEl?.addEventListener("pointerdown", (e) => {
      if (e.target !== trackEl) return;
      e.preventDefault();
      scrollToTrackY(e.clientY - trackEl.getBoundingClientRect().top, (thumbEl?.offsetHeight || 0) / 2);
    });

    passageEl?.addEventListener("scroll", updateScrollbar);
    if (passageEl) new ResizeObserver(updateScrollbar).observe(passageEl);

    inputEl?.addEventListener("input", (e: any) => {
      if (!loaded || !inputEl || !passageEl) return;
      const t = e.inputType || "";
      if (t.startsWith("delete")) backspaces++;
      else if (t.startsWith("insert")) keystrokes++;

      const val = inputEl.value;
      if (!startedAt && val.length > 0) startedAt = Date.now();

      for (let i = 0; i < charSpans.length; i++) {
        const span = charSpans[i];
        span.classList.remove("current", "correct", "wrong");
        if (i < val.length) {
          span.classList.add(val[i] === expected[i] ? "correct" : "wrong");
        } else if (i === val.length) {
          span.classList.add("current");
        }
      }

      const cur = charSpans[Math.min(val.length, charSpans.length - 1)];
      if (cur) {
        const top = cur.offsetTop;
        if (top > passageEl.scrollTop + passageEl.clientHeight - 50 || top < passageEl.scrollTop) {
          passageEl.scrollTop = Math.max(0, top - 60);
        }
      }

      const s = compute();
      const progress = expected.length > 0 ? Math.min(100, Math.round((val.length / expected.length) * 100)) : 0;
      if (wpmEl) wpmEl.textContent = String(Math.round(s.wpm));
      if (accEl) accEl.textContent = `${s.accuracy}%`;
      if (errEl) errEl.textContent = String(s.errors);
      if (correctEl) correctEl.textContent = String(s.correct);
      if (bsEl) bsEl.textContent = String(backspaces);
      if (prgEl) prgEl.textContent = `${progress}%`;
    });

    resetBtn?.addEventListener("click", reset);

    return {
      load,
      isLoaded: () => loaded,
      getPassageId: () => passageId,
      getStats: () => {
        const s = compute();
        return {
          wpm: Number(s.wpm.toFixed(1)),
          acc: `${s.accuracy}%`,
          keystrokes_count: keystrokes,
          error_count: s.errors,
          backspace_count: backspaces,
          typed_word_count: Math.round(s.correct / 5),
          totalWords: Math.round(expected.length / 5),
        };
      },
    };
  }

  const tt1 = setupTypingTest("tt1");
  const tt2 = setupTypingTest("tt2");

  // ═════════════════════════════════════════════
  // SUBMISSIONS
  // ═════════════════════════════════════════════
  let mcqResultData: any = null;
  async function submitMCQAttempt() {
    if (mcqSubmitted) return mcqResultData || true;
    try {
      const timeTaken = Math.round((Date.now() - (mcqStartedAt || Date.now())) / 1000);
      const payloadAnswers = questions.map((q, i) => {
        const userOptIdx = answers[i];
        let selectedOptionId = null;
        if (userOptIdx !== undefined && q.optionsObjects && q.optionsObjects[userOptIdx] !== undefined) {
          const optObj = q.optionsObjects[userOptIdx];
          selectedOptionId = typeof optObj === "object" && optObj !== null ? (optObj.id ?? null) : optObj;
        }
        return { questionId: q.id, selectedOptionId, isMarked: marked.has(i) };
      });

      if (!sessionId) throw new Error("No active session");

      let attemptDetails = await submitMockTestAttempt({
        sessionId,
        timeTaken,
        answers: payloadAnswers
      });

      if (sessionId) {
        try {
          const fullAttempt = await fetchAttemptDetailsBySession(sessionId);
          if (fullAttempt) {
            attemptDetails = fullAttempt;
          }
        } catch (e) {
          console.warn("Error fetching attempt details by session in ComboExamUI:", e);
        }
      }

      mcqSubmitted = true;
      mcqResultData = attemptDetails;
      return mcqResultData || true;
    } catch (e) {
      console.error("Error submitting MCQ attempt:", e);
      return false;
    }
  }

  const fallbackTypingSession = "typing-session-" + Date.now();

  async function postTypingResult(n: number) {
    if (typingPosted[n]) return true;
    const t = n === 1 ? tt1 : tt2;
    if (!t.isLoaded()) return false;
    const stats = t.getStats();
    const pId = t.getPassageId();
    try {
      await submitTypingResult({
        session_id: sessionId || fallbackTypingSession,
        passage_id: pId ?? n,
        passage_number: n,
        keystrokes_count: stats.keystrokes_count,
        error_count: stats.error_count,
        backspace_count: stats.backspace_count,
        total_word_count: stats.totalWords || 0,
        typed_word_count: stats.typed_word_count,
        wpm: Number(stats.wpm),
      });
      typingPosted[n] = true;
      return true;
    } catch (e) {
      console.error(`Error submitting Passage ${n} results:`, e);
      return false;
    }
  }

  async function finalSubmit(timeUp: boolean) {
    if (finished) return;
    clearInterval(timerInterval);

    const mcqOk = await submitMCQAttempt();
    if (!mcqOk && !timeUp) {
      alert("Could not submit your MCQ answers. Please check your internet connection and try again.");
      if (endAt > Date.now()) {
        timerInterval = setInterval(() => {
          const remaining = Math.max(0, Math.round((endAt - Date.now()) / 1000));
          renderTimer(remaining);
          if (remaining <= 0) {
            clearInterval(timerInterval);
            finalSubmit(true);
          }
        }, 1000);
      }
      return;
    }

    if (currentStage >= 2) await postTypingResult(1);
    if (currentStage >= 3) await postTypingResult(2);

    finished = true;
    testActive = false;
    exitFullscreen();

    try {
      if (typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', 'test_submit', {
          test_id: testIdRaw || "11",
          test_type: 'combo',
          test_title: document.title
        });
      }
    } catch (gtagErr) {
      console.warn("gtag test_submit error:", gtagErr);
    }

    document.querySelectorAll(".test-panel").forEach((p: any) => p.style.display = "none");
    if (btnHeaderSubmit) btnHeaderSubmit.style.display = "none";
    const stepNav = document.getElementById("combo-step-nav");
    if (stepNav) stepNav.style.display = "none";
    const timerBox = document.querySelector(".timer-box") as HTMLElement | null;
    if (timerBox) timerBox.style.display = "none";
    document.getElementById("result-tabs")?.removeAttribute("hidden");
    const mobNav = document.querySelector(".mobile-nav-bar") as HTMLElement | null;
    if (mobNav) mobNav.style.display = "none";
    const mcqPanel = document.getElementById("mcq-panel");
    if (mcqPanel) mcqPanel.style.display = "none";

    const resView = document.getElementById("results-view");
    const comboResults = document.getElementById("combo-results");
    if (comboResults) comboResults.classList.add("show");

    const typingFallback = [tt1, tt2]
      .map((t, i) => ({ t, n: i + 1 }))
      .filter(({ t, n }) => t.isLoaded() && typingPosted[n])
      .map(({ t, n }) => {
        const s = t.getStats();
        return { passage_number: n, ...s };
      });
    if (typeof (window as any).renderTypingResults === "function") {
      (window as any).renderTypingResults(sessionId || fallbackTypingSession, typingFallback);
    }

    if (resView) {
      resView.classList.add("show");
      try {
        const resTestName = document.getElementById("res-test-name");
        if (resTestName) {
          resTestName.textContent = testTitle || document.getElementById("eh-title")?.textContent || "OSSSC Combo Test";
        }

        const serverData = mcqResultData || {};
        let correct = serverData.correct;
        let wrong = serverData.wrong;
        let skipped = serverData.skipped;
        const markedCount = marked.size;

        if (correct === undefined || wrong === undefined || skipped === undefined) {
          correct = 0; wrong = 0; skipped = 0;
          questions.forEach((q, i) => {
            if (answers[i] === undefined) skipped++;
            else if (answers[i] === q.correct) correct++;
            else wrong++;
          });
        }

        const total = questions.length || serverData.totalQuestions || 1;
        const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

        const setVal = (id: string, val: any) => {
          const el = document.getElementById(id);
          if (el) el.textContent = String(val);
        };

        setVal("rc-correct", correct);
        setVal("rc-wrong", wrong);
        setVal("rc-skipped", skipped);
        setVal("rc-marked", markedCount);
        setVal("score-pct-text", pct + "%");

        const circ = document.getElementById("score-ring-circle");
        if (circ) {
          const circumference = 376.99;
          circ.style.transition = "stroke-dashoffset 1.2s ease";
          circ.style.stroke = pct >= 60 ? "#6EE7B7" : pct >= 40 ? "#FCD34D" : "#FCA5A5";
          circ.style.strokeDashoffset = String(circumference - (circumference * pct) / 100);
        }

        const tbody = document.getElementById("section-table-body");
        if (tbody) {
          tbody.innerHTML = "";
          if (Array.isArray(serverData?.sections) && serverData.sections.length > 0) {
            serverData.sections.forEach((sec: any) => {
              const secTotal = sec.total || 0;
              const secCorrect = sec.correct || 0;
              const secWrong = sec.wrong !== undefined ? sec.wrong : Math.max(0, secTotal - secCorrect);
              const secPct = secTotal > 0 ? Math.round((secCorrect / secTotal) * 100) : 0;
              tbody.innerHTML += `
                <tr>
                  <td><strong>${sec.name || sec.sectionName || sec.section || "General"}</strong></td>
                  <td>${secTotal}</td>
                  <td class="td-correct">${secCorrect}</td>
                  <td class="td-wrong">${secWrong}</td>
                  <td><strong>${secPct}%</strong></td>
                </tr>`;
            });
          } else {
            const sections = [...new Set(questions.map((q) => q.section || "General"))];
            sections.forEach((sec) => {
              const qs = questions.filter((q) => (q.section || "General") === sec);
              let sc = 0, sw = 0;
              qs.forEach((q) => {
                const i = questions.indexOf(q);
                if (answers[i] !== undefined && answers[i] === q.correct) sc++;
                else if (answers[i] !== undefined) sw++;
              });
              const secTotal = qs.length;
              const secPct = secTotal > 0 ? Math.round((sc / secTotal) * 100) : 0;
              tbody.innerHTML += `
                <tr>
                  <td><strong>${sec}</strong></td>
                  <td>${secTotal}</td>
                  <td class="td-correct">${sc}</td>
                  <td class="td-wrong">${sw}</td>
                  <td><strong>${secPct}%</strong></td>
                </tr>`;
            });
          }
        }

        const resQuestionMap = new Map();
        if (Array.isArray(serverData?.questions)) {
          serverData.questions.forEach((sq: any) => {
            resQuestionMap.set(Number(sq.questionId), sq);
          });
        }

        const reviewList = document.getElementById("review-list");
        if (reviewList) {
          reviewList.innerHTML = "";
          const keys = ["A", "B", "C", "D"];
          const qList = Array.isArray(serverData?.questions) && serverData.questions.length > 0 ? serverData.questions : questions;

          qList.forEach((q: any, i: number) => {
            const sq = resQuestionMap.get(Number(q.questionId || q.id));
            const userAns = answers[i];
            const isCorrect = q.isCorrect !== undefined ? q.isCorrect : (sq ? sq.isCorrect : (userAns !== undefined && userAns === q.correct));
            const isSkipped = q.isSkipped !== undefined ? q.isSkipped : (sq ? (sq.selectedOptionId === null || sq.selectedOptionId === undefined) : (userAns === undefined));

            const statusClass = isSkipped ? "rs-skipped" : isCorrect ? "rs-correct" : "rs-wrong";
            const statusIcon = isSkipped ? "–" : isCorrect ? "✓" : "✗";

            const optionsList = q.options || [];
            const optionsHtml = optionsList
              .map((opt: any, oi: number) => {
                let cls = "";
                if (opt.isCorrect !== undefined || opt.isSelected !== undefined) {
                  if (opt.isCorrect) cls = "rev-correct";
                  else if (opt.isSelected) cls = "rev-wrong";
                } else {
                  const optObj = q.optionsObjects && q.optionsObjects[oi];
                  const optId = typeof optObj === 'object' && optObj !== null ? (optObj.id ?? optObj) : optObj;
                  const correctAnsId = sq ? sq.answer : q.correct;
                  const selectedOptId = sq ? sq.selectedOptionId : (userAns !== undefined && q.optionsObjects && q.optionsObjects[userAns] ? (q.optionsObjects[userAns].id ?? q.optionsObjects[userAns]) : null);

                  if (correctAnsId !== null && correctAnsId !== undefined) {
                    if (optId === correctAnsId) cls = "rev-correct";
                    else if (optId === selectedOptId) cls = "rev-wrong";
                  } else {
                    if (oi === q.correct) cls = "rev-correct";
                    else if (oi === userAns) cls = "rev-wrong";
                  }
                }
                return `<div class="rev-opt ${cls}"><span class="rev-key">${keys[oi] || (oi + 1)}.</span> ${opt.text || opt}</div>`;
              })
              .join("");

            const card = document.createElement("div");
            card.className = "review-card";
            card.innerHTML = `
              <div class="review-header" onclick="this.parentElement.classList.toggle('rh-open')">
                <div class="review-status ${statusClass}">${statusIcon}</div>
                <span class="rh-qnum">Q${q.questionNumber || (i + 1)}</span>
                <span class="rh-text">${q.text}</span>
                <svg class="rh-chevron" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
              <div class="review-body">
                <div class="review-q-text">${q.text}</div>
                <div class="review-options">${optionsHtml}</div>
                <div class="review-expl"><strong>Explanation:</strong> ${q.explanation || "No explanation provided."}</div>
              </div>`;
            reviewList.appendChild(card);
          });
        }
      } catch (renderErr) {
        console.error("Error rendering results view:", renderErr);
      }
    } else {
      alert("OSSSC Combo Test submitted successfully!");
      window.location.href = "/mocktest/osssc";
    }
  }

  // ── RESULT TAB SWITCH ──
  document.querySelectorAll(".result-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".result-tab").forEach((t) => {
        const isActive = t === tab;
        t.classList.toggle("active", isActive);
        t.setAttribute("aria-selected", String(isActive));
        const targetId = (t as HTMLElement).dataset.target;
        if (targetId) {
          document.getElementById(targetId)?.classList.toggle("show", isActive);
        }
      });
      window.scrollTo({ top: 0 });
    });
  });

  updateHeaderButton();
}
