import { getStorageData } from "../utils/localStorage";
import useCourseDetails from "../hooks/useCourseDetails";

const CourseDetails = () => {
  const { course, message, loading, isEnrolled, handleEnroll } =
    useCourseDetails();

  if (loading) return <p className="p-6">Loading course...</p>;

  if (!course) return <p className="p-6 text-red-600">{message}</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* TODO: IMPLEMENT BACK BUTTON */}

      <h1 className="text-3xl font-bold mb-4 text-blue-700">{course.title}</h1>
      <p className="mb-2 text-gray-700">{course.description}</p>
      <p className="mb-1">
        <strong>Category:</strong> {course.category}
      </p>
      <p className="mb-1">
        <strong>Duration:</strong> {course.duration} hours
      </p>
      <p className="mb-3">
        <strong>Status:</strong>{" "}
        <span className={course.isFree ? "text-green-600" : "text-red-600"}>
          {course.isFree ? "Free" : "Paid"}
        </span>
      </p>

      {/* Prerequisites */}
      <div className="mb-4">
        <strong>Prerequisites:</strong>{" "}
        {course.prerequisites.length === 0 ? (
          <span>None</span>
        ) : (
          <ul className="list-disc list-inside text-gray-700">
            {course.prerequisites.map((pid) => {
              const prereq = getStorageData().courses.find((c) => c.id === pid);
              return <li key={pid}>{prereq ? prereq.title : pid}</li>;
            })}
          </ul>
        )}
      </div>

      {/* Enroll Button */}
      <button
        onClick={handleEnroll}
        className={`px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition ${
          isEnrolled ? "cursor-not-allowed" : ""
        }`}
        disabled={isEnrolled}
      >
        {isEnrolled ? "Already Enrolled" : "Enroll Now"}
      </button>

      {message && (
        <p className="mt-4 text-sm font-medium text-red-600">{message}</p>
      )}
    </div>
  );
};

export default CourseDetails;
