export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  isFree: boolean;
  prerequisites: string[];
  duration: number;
}

export interface Enrollment {
  userId: string;
  courseId: string;
  status: "enrolled" | "completed";
  progress: number;
  enrolledAt: string;
  completedAt?: string;
}

export interface User {
  userId: string;
  name: string;
  email: string;
  preferences: {
    preferredCategories: string[];
    notifications: boolean;
  };
}

export interface LocalStorageData {
  courses: Course[];
  enrollments: Enrollment[];
  user: User;
}
