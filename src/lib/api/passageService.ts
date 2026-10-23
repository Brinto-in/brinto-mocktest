// src/lib/api/passageService.ts
import { apiClient } from "./client";

export async function fetchMockTestPassage(testName: string) {
  try {
    const encodedName = encodeURIComponent(testName);
    const json = await apiClient(`/api/mocktest-passages?test_name=${encodedName}`, {
      headers: { "Accept": "*/*" }
    });
    if (json?.success && json?.data) {
      return json.data;
    }
    return null;
  } catch (err) {
    console.error("Error fetching mock test passage:", err);
    return null;
  }
}
