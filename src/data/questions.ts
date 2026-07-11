// This is a temporary data structure to help with seeding.
// We'll associate these questions with a test based on the test's `href`.
export const questionsByTest: Record<string, any[]> = {
  '/test/osssc-ri-ari-mock-1': [
    // ── GENERAL KNOWLEDGE (5 Qs) ──
    {
      section: "General Knowledge",
      text: 'Which river is known as the "Mahanadi" (Great River) and is the largest river in Odisha?',
      options: ["Brahmani", "Mahanadi", "Subarnarekha", "Baitarani"],
      correct: 1,
      explanation:
        'Mahanadi literally means "Great River." It is the largest river in Odisha and the third largest in the Indian subcontinent, draining an area of about 141,589 km².',
    },
    {
      section: "General Knowledge",
      text: "The famous Lingaraj Temple in Bhubaneswar is dedicated to which deity?",
      options: [
        "Lord Vishnu",
        "Lord Brahma",
        "Lord Shiva",
        "Goddess Durga",
      ],
      correct: 2,
      explanation:
        'The Lingaraj Temple is dedicated to Lord Shiva, known here as "Harihara," a fusion of Shiva and Vishnu. Built in the 11th century, it is the largest temple in Bhubaneswar.',
    },
    {
      section: "General Knowledge",
      text: 'Which Article of the Indian Constitution deals with "Right to Education" (RTE)?',
      options: ["Article 21", "Article 21A", "Article 22", "Article 25"],
      correct: 1,
      explanation:
        "Article 21A was inserted by the 86th Constitutional Amendment Act, 2002. It makes free and compulsory education a fundamental right for children aged 6–14 years.",
    },
    {
      section: "General Knowledge",
      text: 'The "Rath Yatra" festival of Lord Jagannath is celebrated in which city of Odisha?',
      options: ["Bhubaneswar", "Cuttack", "Puri", "Konark"],
      correct: 2,
      explanation:
        "The Rath Yatra (Chariot Festival) of Lord Jagannath is held annually in Puri, Odisha. It is one of the largest public processions in the world and typically draws millions of devotees.",
    },
    {
      section: "General Knowledge",
      text: "As per Census 2011, what is the approximate population of Odisha?",
      options: ["3.2 Crore", "4.2 Crore", "5.2 Crore", "6.2 Crore"],
      correct: 1,
      explanation:
        "According to the 2011 Census, the population of Odisha is approximately 4.19 crore (41.97 million), making it the 11th most populous state in India.",
    },

    // ── REASONING (5 Qs) ──
    {
      section: "Reasoning",
      text: 'If "BOOK" is coded as "CPPL", what is the code for "PENCIL"?',
      options: ["QFODKM", "QFODJM", "RFODKM", "QFODIM"],
      correct: 1, // Note: The explanation in the original file was slightly off, the correct code is QFODJM.
      explanation:
        "Each letter is shifted +1 in the alphabet. B→C, O→P, O→P, K→L. Applying the same: P→Q, E→F, N→O, C→D, I→J, L→M gives QFODJM.",
    },
    {
      section: "Reasoning",
      text: "In a row of 40 students, Ravi is 15th from the left. What is his position from the right?",
      options: ["24th", "25th", "26th", "27th"],
      correct: 2,
      explanation:
        "Position from right = Total students – Position from left + 1 = 40 – 15 + 1 = 26. So Ravi is 26th from the right.",
    },
    {
      section: "Reasoning",
      text: "Find the odd one out: 2, 5, 10, 17, 26, 37, 50, 64",
      options: ["37", "50", "64", "26"],
      correct: 2,
      explanation:
        "The pattern is n² + 1: 1²+1=2, 2²+1=5, 3²+1=10, 4²+1=17, 5²+1=26, 6²+1=37, 7²+1=50. The next number should be 8²+1=65. The number 64 breaks the pattern.",
    },
    {
      section: "Reasoning",
      text: "A is B's sister. C is B's mother. D is C's father. E is D's mother. How is A related to D?",
      options: [
        "Granddaughter",
        "Daughter",
        "Great-granddaughter",
        "Niece",
      ],
      correct: 0,
      explanation:
        "A is B's sister, and C is B's mother, so A is C's daughter. D is C's father. Therefore, A is the daughter of D's daughter, which makes A D's granddaughter.",
    },
    {
      section: "Reasoning",
      text: "Which of the following Venn diagrams correctly represents the relationship: Teachers, Doctors, Humans?",
      options: [
        "Two separate circles inside a larger circle",
        "Three completely overlapping circles",
        "Three separate circles",
        "Two overlapping circles inside a larger circle",
      ],
      correct: 3, // The original file had an incorrect answer. Some doctors can be teachers (e.g., professors in medical school).
      explanation:
        'Both Teachers and Doctors are Humans, so their circles must be inside the "Humans" circle. Some doctors can be teachers (and vice-versa), so their circles should overlap. This is represented by two overlapping circles inside a larger circle.',
    },

    // ── MATHEMATICS (5 Qs) ──
    {
      section: "Mathematics",
      text: "A train travels 360 km in 4 hours. What is its speed in m/s?",
      options: ["20 m/s", "25 m/s", "30 m/s", "35 m/s"],
      correct: 1,
      explanation:
        "Speed = 360 km / 4 h = 90 km/h. To convert km/h to m/s, multiply by 5/18. So, 90 × (5/18) = 25 m/s.",
    },
    {
      section: "Mathematics",
      text: "The simple interest on ₹5,000 at 8% per annum for 3 years is:",
      options: ["₹1,000", "₹1,200", "₹1,400", "₹1,600"],
      correct: 1,
      explanation:
        "Simple Interest (SI) = (Principal × Rate × Time) / 100 = (5000 × 8 × 3) / 100 = ₹1,200.",
    },
    {
      section: "Mathematics",
      text: "If the ratio of two numbers is 3:5 and their LCM is 120, what is the HCF?",
      options: ["6", "8", "10", "12"],
      correct: 1,
      explanation:
        "Let the numbers be 3x and 5x, where x is the HCF. The product of numbers = HCF × LCM. So, (3x)(5x) = x × 120. This gives 15x² = 120x. Since x is not zero, we can divide by x: 15x = 120, so x = 8. The HCF is 8.",
    },
    {
      section: "Mathematics",
      text: "A shopkeeper marks a product 40% above the cost price and gives a 20% discount. What is the profit percentage?",
      options: ["8%", "10%", "12%", "16%"],
      correct: 2,
      explanation:
        "Let the Cost Price (CP) be 100. The Marked Price (MP) is 40% above, so MP = 140. A 20% discount on MP is 0.20 × 140 = 28. The Selling Price (SP) = 140 - 28 = 112. The profit is SP - CP = 112 - 100 = 12. The profit percentage is 12%.",
    },
    {
      section: "Mathematics",
      text: "What is the area of a right-angled triangle with hypotenuse 10 cm and one leg 6 cm?",
      options: ["20 cm²", "24 cm²", "28 cm²", "30 cm²"],
      correct: 1,
      explanation:
        "Using the Pythagorean theorem (a² + b² = c²), the other leg is √(10² – 6²) = √(100 – 36) = √64 = 8 cm. The area of a right-angled triangle is (1/2) × base × height = (1/2) × 6 × 8 = 24 cm².",
    },
  ]
  // You can add more questions for other tests here, using the test's `href` as the key.
};