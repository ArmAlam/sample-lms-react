import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStorageData } from "../utils/localStorage";

const NavBar = () => {
  const leftNavItems = [
    { name: "Catalog", path: "/" },
    { name: "My Learning", path: "/learning" },
    { name: "History", path: "/history" },
    { name: "Search", path: "/search" },
  ];

  const [username, setUsername] = useState("");

  useEffect(() => {
    try {
      const data = getStorageData();
      const name = data?.user?.name || "User";
      const parts = name.trim().split(" ");
      const username =
        parts.length >= 2 ? parts[0][0] + parts[1][0] : parts[0][0];
      setUsername(username.toUpperCase());
    } catch {
      setUsername("U");
    }
  }, []);

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 shadow">
      <div className="flex justify-between items-center">
        {/* Left nav links */}
        <ul className="flex gap-6">
          {leftNavItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "font-semibold" : "hover:underline"
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Profile avatar on the right */}
        <NavLink to="/profile">
          <div className="w-9 h-9 flex items-center justify-center bg-white text-blue-600 font-bold rounded-full hover:ring-2 ring-white transition">
            {username}
          </div>
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
