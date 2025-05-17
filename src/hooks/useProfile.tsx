import { useEffect, useState } from "react";
import { getStorageData, saveStorageData } from "../utils/localStorage";

const availableCategories = [
  "Programming",
  "Design",
  "Marketing",
  "Business",
  "Photography",
];

const useProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [preferredCategories, setPreferredCategories] = useState<string[]>([]);
  const [notifications, setNotifications] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const data = getStorageData();
      setName(data.user.name);
      setEmail(data.user.email);
      setPreferredCategories(data.user.preferences.preferredCategories);
      setNotifications(data.user.preferences.notifications);
    } catch {
      setMessage("Failed to load user data.");
    }
  }, []);

  // Email validation regex
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const toggleCategory = (category: string) => {
    setPreferredCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleSave = () => {
    if (!name.trim()) {
      setMessage("Name cannot be empty.");
      return;
    }
    if (!validateEmail(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      const data = getStorageData();
      data.user.name = name;
      data.user.email = email;
      data.user.preferences.preferredCategories = preferredCategories;
      data.user.preferences.notifications = notifications;

      saveStorageData(data);
      setMessage("Profile updated successfully.");
    } catch {
      setMessage("Failed to save profile.");
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    preferredCategories,
    setPreferredCategories,
    notifications,
    setNotifications,
    message,
    handleSave,
    toggleCategory,
    availableCategories,
  };
};

export default useProfile;
