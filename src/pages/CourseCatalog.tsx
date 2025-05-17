import {
  VariableSizeGrid as Grid,
  type GridChildComponentProps,
} from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import useCourseCatalog from "../hooks/useCourseCatalog";
import CourseCard from "./CourseCard";

const CourseCatalog = () => {
  const {
    filteredCourses,
    categoryFilter,
    setCategoryFilter,
    freeFilter,
    setFreeFilter,
    sortOption,
    setSortOption,
    uniqueCategories,
  } = useCourseCatalog();

  const columnWidth = 320;
  const rowHeight = 260;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Course Catalog</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          className="border rounded p-2"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          {uniqueCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          className="border rounded p-2"
          value={freeFilter}
          onChange={(e) => setFreeFilter(e.target.value)}
        >
          <option value="all">All Courses</option>
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>

        <select
          className="border rounded p-2"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="title">Sort by Title</option>
          <option value="duration">Sort by Duration</option>
        </select>
      </div>

      {/* Courses */}
      {filteredCourses.length > 0 ? (
        <div className=" min-h-[600px]">
          <AutoSizer>
            {({ height, width }) => {
              const columnCount = Math.floor(width / columnWidth);
              const rowCount = Math.ceil(filteredCourses.length / columnCount);

              return (
                <Grid
                  columnCount={columnCount}
                  columnWidth={() => columnWidth}
                  height={height}
                  rowCount={rowCount}
                  rowHeight={() => rowHeight}
                  width={width}
                >
                  {({
                    columnIndex,
                    rowIndex,
                    style,
                  }: GridChildComponentProps) => {
                    const index = rowIndex * columnCount + columnIndex;
                    const course = filteredCourses[index];
                    if (!course) return null;

                    return (
                      <div style={style} className="p-2 min-h-[280px]">
                        <CourseCard course={course} />
                      </div>
                    );
                  }}
                </Grid>
              );
            }}
          </AutoSizer>
        </div>
      ) : (
        <p>No courses found.</p>
      )}
    </div>
  );
};

export default CourseCatalog;
