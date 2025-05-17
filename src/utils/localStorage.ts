import type { LocalStorageData, Enrollment } from "../types";

export const STORAGE_KEY = "lms_data";

export function getStorageData(): LocalStorageData {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data)
    return {
      courses: [],
      user: {
        userId: "",
        name: "",
        email: "",
        preferences: { preferredCategories: [], notifications: false },
      },
      enrollments: [],
    };
  return JSON.parse(data);
}

export function saveStorageData(data: LocalStorageData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function saveEnrollment(enrollment: Enrollment) {
  const data = getStorageData();
  data.enrollments.push(enrollment);
  saveStorageData(data);
}
