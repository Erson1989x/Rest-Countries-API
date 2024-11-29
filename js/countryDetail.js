import initDarkMode from "../js/darkMode.js";

// Initialize dark mode
initDarkMode();

const countryDetailContainer = document.querySelector(".country-detail");

const displayCountryDetail = async () => {
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

    // Create border countries HTML
    const borderCountriesHTML =
      borderCountries.length > 0
        ? borderCountries
            .map((country) => `<span class="border-country">${country}</span>`)
            .join("")
        : '<span class="border-country">None</span>';

    countryDetailContainer.innerHTML = `
            <img src="${selectedCountry.flags.png}" alt="${
      selectedCountry.name.common
    } flag">
            <div class="country-info">
                <h1>${selectedCountry.name.common}</h1>
                <div class="detail-grid">
                    <div class="left-col">
                        <p><strong>Native Name: </strong>${
                          Object.values(
                            selectedCountry.name.nativeName || {}
                          )[0]?.common || "N/A"
                        }</p>
                        <p><strong>Population: </strong>${selectedCountry.population.toLocaleString()}</p>
                        <p><strong>Region: </strong>${
                          selectedCountry.region
                        }</p>
                        <p><strong>Sub Region: </strong>${
                          selectedCountry.subregion || "N/A"
                        }</p>
                        <p><strong>Capital: </strong>${
                          selectedCountry.capital?.[0] || "N/A"
                        }</p>
                    </div>
                    <div class="right-col">
                        <p><strong>Top Level Domain: </strong>${
                          selectedCountry.tld?.[0] || "N/A"
                        }</p>
                        <p><strong>Currencies: </strong>${
                          Object.values(selectedCountry.currencies || {})
                            .map((c) => c.name)
                            .join(", ") || "N/A"
                        }</p>
                        <p><strong>Languages: </strong>${
                          Object.values(selectedCountry.languages || {}).join(
                            ", "
                          ) || "N/A"
                        }</p>
                    </div>
                </div>
                <div class="border-countries">
                    <strong>Border Countries: </strong>
                    ${borderCountriesHTML}
                </div>
            </div>
        `;

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
