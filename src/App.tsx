import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { initializeStorage } from "./utils/initStorage";
import NavBar from "./components/NavBar";
import CourseCatalog from "./pages/CourseCatalog";
import CourseDetails from "./pages/CourseDetails";
import MyLearning from "./pages/MyLearning";
import Profile from "./pages/Profile";
import LearningHistory from "./pages/LearningHistory";
import Search from "./pages/Search";

function App() {
  useEffect(() => {
    initializeStorage();
  }, []);

  return (
    <Router>
      <NavBar />
      <div className="max-w-5xl mx-auto">
        <Routes>
          <Route path="/" element={<CourseCatalog />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/learning" element={<MyLearning />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/history" element={<LearningHistory />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
