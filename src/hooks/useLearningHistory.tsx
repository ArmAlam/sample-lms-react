import { useEffect, useState } from "react";
import { getStorageData } from "../utils/localStorage";

interface CompletedCourse {
  id: string;
  title: string;
  category: string;
  completedAt: string;
  duration: number;
}

const useLearningHistory = () => {
  const [completedCourses, setCompletedCourses] = useState<CompletedCourse[]>(
    []
  );
  const [totalHours, setTotalHours] = useState(0);

  useEffect(() => {
    const data = getStorageData();

    const completedEnrollments = data.enrollments.filter(
      (e) => e.userId === data.user.userId && e.status === "completed"
    );

    const completedList: CompletedCourse[] = completedEnrollments
      .map((enrollment) => {
        const course = data.courses.find((c) => c.id === enrollment.courseId);
        if (!course || !enrollment.completedAt) return null;
        return {
          id: course.id,
          title: course.title,
          category: course.category,
          completedAt: enrollment.completedAt,
          duration: course.duration,
        };
      })
      .filter(Boolean) as CompletedCourse[];

    setCompletedCourses(completedList);

    const total = completedList.reduce((sum, c) => sum + c.duration, 0);
    setTotalHours(total);
  }, []);

  return {
    completedCourses,
    totalHours,
  };
};

export default useLearningHistory;
