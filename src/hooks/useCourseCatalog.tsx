import { useEffect, useState } from "react";
import type { Course } from "../types";
import { getStorageData } from "../utils/localStorage";

const useCourseCatalog = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [freeFilter, setFreeFilter] = useState<string>("all");
  const [sortOption, setSortOption] = useState<string>("title");

  useEffect(() => {
    const data = getStorageData();
    setCourses(data.courses);
  }, [courses]);

  useEffect(() => {
    let updated = [...courses];

    if (categoryFilter !== "all") {
      updated = updated.filter((c) => c.category === categoryFilter);
    }

    if (freeFilter !== "all") {
      updated = updated.filter((c) =>
        freeFilter === "free" ? c.isFree : !c.isFree
      );
    }

    if (sortOption === "title") {
      updated.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "duration") {
      updated.sort((a, b) => a.duration - b.duration);
    }

    setFilteredCourses(updated);
  }, [courses, categoryFilter, freeFilter, sortOption]);

  const uniqueCategories = Array.from(new Set(courses.map((c) => c.category)));

  return {
    courses,
    filteredCourses,
    categoryFilter,
    setCategoryFilter,
    freeFilter,
    setFreeFilter,
    sortOption,
    setSortOption,
    uniqueCategories,
  };
};

export default useCourseCatalog;
