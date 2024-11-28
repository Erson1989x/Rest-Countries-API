import initDarkMode from "./darkMode.js";
import initFilter from "./filter.js";

const countriesContainer = document.getElementById('countries-container');
const searchInput = document.getElementById('search-input');

// Initialize features
initDarkMode();
initFilter();

let countries = [];

const fetchCountries = async () => {
    try {
        const res = await fetch('https://restcountries.com/v3.1/all');
        const data = await res.json();
        countries = data;
        displayCountries(data);
    } catch (error) {
        console.error('Error fetching countries:', error);
        countriesContainer.innerHTML = '<p>Error loading countries. Please try again later.</p>';
    }
};

const displayCountries = (countriesData) => {
    countriesContainer.innerHTML = '';

    countriesData.forEach(country => {
        const countryCard = document.createElement('div');
        countryCard.className = 'country-card';

        countryCard.innerHTML = `
            <img src="${country.flags.png}" alt="${country.name.common} flag">
            <div class="country-info">
                <h2>${country.name.common}</h2>
                <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Region:</strong> ${country.region}</p>
                <p><strong>Capital:</strong> ${country.capital?.[0] || 'N/A'}</p>
            </div>
        `;
        
        countriesContainer.appendChild(countryCard);
    });
};

const searchCountry = (search) => {
    const filteredCountries = countries.filter((country) => 
        country.name.common.toLowerCase().includes(search.toLowerCase())
    );
    displayCountries(filteredCountries);
};


fetchCountries();

searchInput.addEventListener('input', () => {
    const search = searchInput.value;
    searchCountry(search);
});

window.displayCountries = displayCountries;
window.countries = countries;