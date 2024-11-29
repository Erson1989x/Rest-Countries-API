const initFilter = () => {
  const filterContainer = document.querySelector(".filter-container");
  const selected = document.querySelector(".selected");
  const optionsContainer = document.querySelector(".select-items");

  if (!filterContainer || !selected || !optionsContainer) {
    console.error("Filter elements not found");
    return;
  }

  const optionDivs = optionsContainer.querySelectorAll("div");

  // Toggle dropdown
  filterContainer.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent event from bubbling up
    if (optionsContainer.style.display === "block") {
      optionsContainer.style.display = "none";
    } else {
      optionsContainer.style.display = "block";
    }
  });

  // Handle option selection
  optionDivs.forEach((option) => {
    option.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent event from bubbling up
      const value = option.getAttribute("data-value");
      selected.textContent = option.textContent;
      optionsContainer.style.display = "none";

      // Filter countries
      if (value === "all") {
        window.displayCountries(window.countries);
      } else {
        const filteredCountries = window.countries.filter(
          (country) => country.region.toLowerCase() === value.toLowerCase()
        );
        window.displayCountries(filteredCountries);
      }
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", () => {
    if (optionsContainer) {
      optionsContainer.style.display = "none";
    }
  });
};

export default initFilter;
