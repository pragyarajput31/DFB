import React, { useState, useEffect } from "react";
import JSONEditor from "./components/JSONEditor";
import FormPreview from "./components/FormPreview";

const App: React.FC = () => {
  // Set default JSON schema
  const [schema, setSchema] = useState<string>(JSON.stringify({
    formTitle: "Project Requirements Survey",
    formDescription: "Please fill out this survey about your project needs",
    fields: [
      {
        id: "name",
        type: "text",
        label: "Full Name",
        required: true,
        placeholder: "Enter your full name"
      },
      {
        id: "email",
        type: "email",
        label: "Email Address",
        required: true,
        placeholder: "you@example.com"
      }
    ]
  }, null, 2));

  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Retrieve theme from localStorage or default to light
    return localStorage.getItem("theme") === "dark";
  });

  // Toggle the theme
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  // Apply theme to the document body
  useEffect(() => {
    document.documentElement.className = isDarkMode ? "dark" : "light";
  }, [isDarkMode]);

  return (
    <div className={`flex flex-col md:flex-row h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      {/* Theme Toggle Button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* JSON Editor and Form Preview */}
      <JSONEditor schema={schema} setSchema={setSchema} />
      <FormPreview schema={schema} />
    </div>
  );
};

export default App;
