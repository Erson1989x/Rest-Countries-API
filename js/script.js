import initDarkMode from "./darkMode.js";

const countriesContainer = document.getElementById('countries-container');
const searchInput = document.getElementById('search-input');
const filterSelect = document.querySelector('.costum-select');


initDarkMode();

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

const filterByRegion = (region) => {
    const filteredCountries = countries.filter((country) => country.region === region);
    displayCountries(filteredCountries);
};

const searchCountry = (search) => {
    const filteredCountries = countries.filter((country) => 
        country.name.common.toLowerCase().includes(search.toLowerCase())
    );
    displayCountries(filteredCountries);
};

// Initial fetch of countries
fetchCountries();

// Event Listeners
searchInput.addEventListener('input', () => {
    const search = searchInput.value;
    searchCountry(search);
});

filterSelect.addEventListener('click', () => {
    filterSelect.classList.toggle('select-hide');
});

filterSelect.addEventListener('change', (event) => {
    const region = event.target.value;
    filterByRegion(region);
});