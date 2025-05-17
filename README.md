# Learning Management System (LMS) - Frontend

# Project structure

/src
/components # Reusable UI components (CourseCard, NavBar, etc.)
/hooks # Custom React hooks (e.g., useCourseCatalog for filtering/sorting)
/pages # Page components for routes (Catalog, CourseDetails, Profile, etc.)
/utils # Utility functions (localStorage read/write helpers)
/types # TypeScript interfaces and types for strong typing
/assets # Static assets (images, icons)
main.tsx # App entry point and router setup
App.tsx # Main app component with routing and layout
tailwind.config.js # Tailwind CSS configuration
vite.config.ts # Vite build configuration

# State Management

React's built-in state (useState and useEffect) is used throughout the app for UI state like filters, inputs, and loading status.

Complex state logic for courses, filters, sorting, and enrollments is encapsulated in custom hooks (e.g., useCourseCatalog), improving modularity and reusability.

React Router manages page navigation with URL parameters for details views.

- [Live URL](https://sample-lms-react-git-main-armalams-projects.vercel.app/)
