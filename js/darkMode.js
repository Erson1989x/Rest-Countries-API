const initDarkMode = () => {
  const darkModeToggle = document.querySelector(".dark-mode-button");
  const moonIcon = document.querySelector(".fa-moon");

  const darkMode = localStorage.getItem("darkMode");

  const enableDarkMode = () => {
    document.documentElement.setAttribute("data-theme", "dark");
    moonIcon.classList.remove("far");
    moonIcon.classList.add("fas");
    localStorage.setItem("darkMode", "enabled");
  };

  const disableDarkMode = () => {
    document.documentElement.setAttribute("data-theme", "light");
    moonIcon.classList.remove("fas");
    moonIcon.classList.add("far");
    localStorage.setItem("darkMode", null);
  };

  if (darkMode === "enabled") {
    enableDarkMode();
  }

  darkModeToggle.addEventListener("click", () => {
    const darkMode = localStorage.getItem("darkMode");
    if (darkMode !== "enabled") {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
  });
};

export default initDarkMode;
