import { Link } from "react-router-dom";
import useSearch from "../hooks/useSearch";

const Search = () => {
  const { query, setQuery, filteredCourses } = useSearch();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Search Courses</h1>

      <input
        type="text"
        placeholder="Search by title or category..."
        className="w-full p-3 mb-6 border border-gray-300 rounded"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoFocus
      />

      {filteredCourses.length === 0 ? (
        <p>No courses match your search.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCourses.map((course) => (
            <Link
              to={`/courses/${course.id}`}
              key={course.id}
              className="border border-gray-300 rounded p-4 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
              <p className="text-gray-600 mb-1">Category: {course.category}</p>
              <p className="text-gray-600 mb-1">
                Duration: {course.duration} hour
                {course.duration !== 1 ? "s" : ""}
              </p>
              <p
                className={`font-semibold ${
                  course.isFree ? "text-green-600" : "text-red-600"
                }`}
              >
                {course.isFree ? "Free" : "Paid"}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
