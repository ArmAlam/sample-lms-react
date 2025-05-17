import useProfile from "../hooks/useProfile";

const Profile = () => {
  const {
    message,
    name,
    setName,
    email,
    setEmail,
    availableCategories,
    preferredCategories,
    toggleCategory,
    notifications,
    setNotifications,
    handleSave,
  } = useProfile();

  return (
    <div className="max-w-xl mx-auto p-6">
      <div>
        <h1 className="text-3xl font-bold mb-6 text-blue-700">My Profile</h1>

        {message && (
          <div
            className={`mb-4 p-3 rounded ${
              message.includes("success")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <label className="block mb-2 font-semibold" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          type="text"
          className="w-full p-2 border rounded mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="block mb-2 font-semibold" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="w-full p-2 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <fieldset className="mb-4">
          <legend className="font-semibold mb-2">Preferred Categories</legend>
          <div className="flex flex-wrap gap-3">
            {availableCategories.map((category) => (
              <label
                key={category}
                className="inline-flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={preferredCategories.includes(category)}
                  onChange={() => toggleCategory(category)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <label className="inline-flex items-center space-x-2 mb-6 cursor-pointer">
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span>Receive email notifications</span>
        </label>
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition "
      >
        Save
      </button>
    </div>
  );
};

export default Profile;
