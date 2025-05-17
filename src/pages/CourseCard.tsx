import { Link } from "react-router-dom";
import type { Course } from "../types";

const CourseCard = ({ course }: { course: Course }) => (
  <Link
    to={`/courses/${course.id}`}
    key={course.id}
    className="block border border-gray-200 p-4 rounded-lg shadow hover:shadow-lg transition"
  >
    <h2 className="text-xl font-semibold text-blue-700">{course.title}</h2>
    <p className="text-sm text-gray-600">{course.category}</p>
    <p className="mt-2 text-gray-700">{course.description}</p>
    <p className="mt-2 text-sm">Duration: {course.duration} hrs</p>
    <p
      className={`mt-1 font-medium ${
        course.isFree ? "text-green-600" : "text-red-600"
      }`}
    >
      {course.isFree ? "Free" : "Paid"}
    </p>
  </Link>
);

export default CourseCard;
