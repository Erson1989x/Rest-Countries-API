import initDarkMode from "../js/darkMode.js";
import initFilter from "../js/filter.js";

const countriesContainer = document.getElementById("countries-container");
const searchInput = document.getElementById("search-input");

// Initialize dark mode
initDarkMode();

// Store countries and functions globally
window.countries = [];
window.displayCountries = (countries) => {
  // Clear the container
  countriesContainer.innerHTML = "";

  countries.forEach((country) => {
    // Create article element
    const article = document.createElement("article");
    article.className = "country-card";

    // Create link element
    const link = document.createElement("a");
    link.href = "country.html";
    link.className = "country-link";
    link.setAttribute("tabindex", "0");
    link.setAttribute("aria-label", `View details for ${country.name.common}`);

    // Create and set image
    const img = document.createElement("img");
    img.src = country.flags.png;
    img.alt = `Flag of ${country.name.common}`;

    // Create info container
    const infoDiv = document.createElement("div");
    infoDiv.className = "country-info-two";

    // Add country information
    infoDiv.innerHTML = `
            <h2>${country.name.common}</h2>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Capital:</strong> ${country.capital?.[0] || "N/A"}</p>
        `;

    // Add click and keydown events
    link.addEventListener("click", (e) => {
      e.preventDefault();
      handleCountrySelection(country);
    });

    link.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleCountrySelection(country);
      }
    });

    // Assemble the card
    link.appendChild(img);
    link.appendChild(infoDiv);
    article.appendChild(link);
    countriesContainer.appendChild(article);
  });
};

// Separate function to handle country selection
const handleCountrySelection = (country) => {
  localStorage.setItem("selectedCountry", JSON.stringify(country));
  window.location.href = "country.html";
};

const fetchCountries = async () => {
  try {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const data = await res.json();
    // Set the global countries variable
    window.countries = data;
    // Display the countries
    window.displayCountries(data);
    // Initialize filter after we have the data
    initFilter();
  } catch (error) {
    console.error("Error fetching countries:", error);
    countriesContainer.innerHTML =
      "<p>Error loading countries. Please try again later.</p>";
  }
};

const searchCountry = (search) => {
  if (!window.countries) return;

  const filteredCountries = window.countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  window.displayCountries(filteredCountries);
};

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  fetchCountries();

  // Add search functionality
  searchInput.addEventListener("input", (e) => {
    searchCountry(e.target.value);
  });
});
