import { useEffect, useState } from "react";
import type { Course, Enrollment } from "../types";
import { getStorageData, saveStorageData } from "../utils/localStorage";

const useMyLearning = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [coursesMap, setCoursesMap] = useState<Record<string, Course>>({});

  useEffect(() => {
    const data = getStorageData();
    setEnrollments(
      data.enrollments.filter((e) => e.userId === data.user.userId)
    );
    const map: Record<string, Course> = {};
    data.courses.forEach((c) => {
      map[c.id] = c;
    });
    setCoursesMap(map);
  }, []);

  const updateProgress = (courseId: string, newProgress: number) => {
    if (newProgress < 0) newProgress = 0;
    if (newProgress > 100) newProgress = 100;

    const data = getStorageData();
    const userId = data.user.userId;

    const enrollmentIndex = data.enrollments.findIndex(
      (e) => e.userId === userId && e.courseId === courseId
    );
    if (enrollmentIndex === -1) return;

    data.enrollments[enrollmentIndex].progress = newProgress;

    if (
      newProgress === 100 &&
      data.enrollments[enrollmentIndex].status !== "completed"
    ) {
      data.enrollments[enrollmentIndex].status = "completed";
      data.enrollments[enrollmentIndex].completedAt = new Date().toISOString();
    } else if (newProgress < 100) {
      data.enrollments[enrollmentIndex].status = "enrolled";
      delete data.enrollments[enrollmentIndex].completedAt;
    }

    saveStorageData(data);
    setEnrollments(data.enrollments.filter((e) => e.userId === userId));
  };

  return {
    enrollments,
    coursesMap,
    updateProgress,
  };
};

export default useMyLearning;
