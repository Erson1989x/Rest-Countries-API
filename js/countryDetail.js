import initDarkMode from "../js/darkMode.js";

// Initialize dark mode
initDarkMode();


const displayCountryDetail = async () => {

  const countryDetailContainer = document.querySelector(".country-detail");
  const template = document.querySelector("#country-detail-template");

  // Get the selected country from localStorage
  const selectedCountry = JSON.parse(localStorage.getItem("selectedCountry"));

  if (!selectedCountry) {
    countryDetailContainer.innerHTML = "<p>No country selected</p>";
    return;
  }

  try {
    // Fetch all countries to get border countries information
    const response = await fetch("https://restcountries.com/v3.1/all");
    const allCountries = await response.json();

    // Get border countries names
    const borderCountries =
      selectedCountry.borders?.map((border) => {
        const borderCountry = allCountries.find((c) => c.cca3 === border);
        return borderCountry ? borderCountry.name.common : border;
      }) || [];

    // Clone the template
    const clone = template.content.cloneNode(true);

    // Fill in the template with country data
    clone.querySelector(".country-flag").src = selectedCountry.flags.png;
    clone.querySelector(".country-flag").alt = `Flag of ${selectedCountry.name.common}`;
    clone.querySelector(".country-name").textContent = selectedCountry.name.common;
    clone.querySelector(".native-name").textContent = Object.values(selectedCountry.name.nativeName || {})[0].common || "N/A";
    clone.querySelector(".population").textContent = selectedCountry.population.toLocaleString();
    clone.querySelector(".region").textContent = selectedCountry.region;
    clone.querySelector(".subregion").textContent = selectedCountry.subregion || "N/A";
    clone.querySelector(".capital").textContent = selectedCountry.capital?.[0] || "N/A";
    clone.querySelector(".domain").textContent = selectedCountry.tld?.[0] || "N/A";
    clone.querySelector(".currencies").textContent = Object.values(selectedCountry.currencies || {}).map((currency) => currency.name).join(", ") || "N/A";
    clone.querySelector(".languages").textContent = Object.values(selectedCountry.languages || {}).join(", ") || "N/A";

    // Create and append border countries

    const borderContainer = clone.querySelector(".border-countries-container");
    if(borderCountries.length > 0) {
      borderCountries.forEach((borderCountry) => {
        const span = document.createElement("span");
        span.className = "border-country";
        span.textContent = borderCountry;
        borderContainer.appendChild(span);
      })
    } else {
      const span = document.createElement("span");
      span.className = "border-country";
      span.textContent = "None";
      borderContainer.appendChild(span);
    }

    // Clear previous content and append new content
    countryDetailContainer.innerHTML = "";
    countryDetailContainer.appendChild(clone);
  
    // Add click handlers to border countries
    document.querySelectorAll(".border-country").forEach((btn, index) => {
      if (borderCountries[index] && btn.textContent !== "None") {
        btn.onclick = () => {
          const borderCountry = allCountries.find(
            (c) => c.name.common === btn.textContent
          );
          if (borderCountry) {
            localStorage.setItem(
              "selectedCountry",
              JSON.stringify(borderCountry)
            );
            window.location.reload();
          }
        };
      }
    });
  } catch (error) {
    console.error("Error:", error);
    countryDetailContainer.innerHTML = "<p>Error loading country details</p>";
  }
};

// Initialize the detail view
displayCountryDetail();
