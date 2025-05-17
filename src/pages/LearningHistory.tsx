import useLearningHistory from "../hooks/useLearningHistory";

const LearningHistory = () => {
  const { completedCourses, totalHours } = useLearningHistory();
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">
        Learning History
      </h1>

      {completedCourses.length === 0 ? (
        <p>You have not completed any courses yet.</p>
      ) : (
        <>
          <table className="w-full table-auto border-collapse border border-gray-300 mb-6">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Title
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Category
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Completed At
                </th>
              </tr>
            </thead>
            <tbody>
              {completedCourses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {course.title}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {course.category}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(course.completedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-lg font-semibold">
            Total Courses Completed: {completedCourses.length}
            <br />
            Total Learning Hours: {totalHours} hrs
          </div>
        </>
      )}
    </div>
  );
};

export default LearningHistory;
