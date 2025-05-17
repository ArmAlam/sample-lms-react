import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStorageData, saveStorageData } from "../utils/localStorage";
import type { Course, Enrollment } from "../types";

const useCourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    try {
      const data = getStorageData();
      const found = data.courses.find((c) => c.id === id);
      if (!found) {
        setMessage("Course not found.");
        setLoading(false);
        return;
      }
      setCourse(found);

      const alreadyEnrolled = data.enrollments.find(
        (e) => e.userId === data.user.userId && e.courseId === found.id
      );
      setIsEnrolled(!!alreadyEnrolled);

      setLoading(false);
    } catch (e) {
      console.error("Error loading course:", e);
      setMessage("Error loading course.");
      setLoading(false);
    }
  }, [id]);

  const handleEnroll = () => {
    if (!course) return;
    const data = getStorageData();
    const userId = data.user.userId;

    const alreadyEnrolled = data.enrollments.find(
      (e) => e.userId === userId && e.courseId === course.id
    );
    if (alreadyEnrolled) {
      setMessage("You are already enrolled in this course.");
      setIsEnrolled(true);
      return;
    }

    const missingPrereqs = course.prerequisites.filter((pid) => {
      const enrollment = data.enrollments.find(
        (e) =>
          e.userId === userId && e.courseId === pid && e.status === "completed"
      );
      return !enrollment;
    });

    if (missingPrereqs.length > 0) {
      const missingTitles = missingPrereqs
        .map((pid) => {
          const prereq = data.courses.find((c) => c.id === pid);
          return prereq ? prereq.title : pid;
        })
        .join(", ");
      setMessage(
        `You must complete these prerequisite courses before enrolling: ${missingTitles}`
      );
      return;
    }

    const newEnrollment: Enrollment = {
      userId,
      courseId: course.id,
      status: "enrolled",
      progress: 0,
      enrolledAt: new Date().toISOString(),
    };
    data.enrollments.push(newEnrollment);
    saveStorageData(data);
    setMessage("Successfully enrolled!");
    setIsEnrolled(true);
  };

  return {
    course,
    message,
    loading,
    isEnrolled,
    handleEnroll,
    setMessage,
    setIsEnrolled,
    navigate,
  };
};

export default useCourseDetails;
