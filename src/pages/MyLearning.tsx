import useMyLearning from "../hooks/useMyLearning";

const MyLearning = () => {
  const { enrollments, coursesMap, updateProgress } = useMyLearning();

  if (enrollments.length === 0) {
    return <p className="p-6">You are not enrolled in any courses yet.</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">My Learning</h1>
      <div className="space-y-6">
        {enrollments.map((enrollment) => {
          const course = coursesMap[enrollment.courseId];
          if (!course) return null;
          return (
            <div
              key={enrollment.courseId}
              className="border border-gray-300 p-4 rounded shadow-sm"
            >
              <h2 className="text-xl font-semibold mb-1">{course.title}</h2>
              <p className="text-gray-600 mb-2">
                Status:{" "}
                <span
                  className={
                    enrollment.status === "completed"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }
                >
                  {enrollment.status}
                </span>
              </p>

              <label
                htmlFor={`progress-${course.id}`}
                className="block mb-1 font-medium"
              >
                Progress: {enrollment.progress}%
              </label>
              <input
                type="range"
                id={`progress-${course.id}`}
                min={0}
                max={100}
                value={enrollment.progress}
                onChange={(e) =>
                  updateProgress(course.id, Number(e.target.value))
                }
                className="w-full"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyLearning;
