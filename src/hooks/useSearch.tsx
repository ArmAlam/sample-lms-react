import { useEffect, useState } from "react";
import type { Course } from "../types";
import { getStorageData } from "../utils/localStorage";

const useSearch = () => {
  const [query, setQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>([]);

  useEffect(() => {
    const data = getStorageData();
    setAllCourses(data.courses);
    setFilteredCourses(data.courses);
  }, []);

  useEffect(() => {
    const q = query.toLowerCase().trim();

    if (!q) {
      setFilteredCourses(allCourses);
      return;
    }

    const filtered = allCourses.filter(
      (course) =>
        course.title.toLowerCase().includes(q) ||
        course.category.toLowerCase().includes(q)
    );
    setFilteredCourses(filtered);
  }, [query, allCourses]);

  return {
    query,
    setQuery,
    filteredCourses,
  };
};

export default useSearch;
