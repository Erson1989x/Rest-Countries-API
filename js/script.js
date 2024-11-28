import initDarkMode from "./darkMode.js";
import initFilter from "./filter.js";

const countriesContainer = document.getElementById('countries-container');
const searchInput = document.getElementById('search-input');

// Initialize features
initDarkMode();

window.displayCountries = (countriesData) => {
    countriesContainer.innerHTML = '';

    countriesData.forEach(country => {
        const countryCard = document.createElement('div');
        countryCard.className = 'country-card';
        countryCard.onclick = () => {
            // Store the selected country in localStorage
            localStorage.setItem('selectedCountry', JSON.stringify(country));
            // Navigate to country detail page
            window.location.href = 'country.html';
        };

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

const fetchCountries = async () => {
    try {
        const res = await fetch('https://restcountries.com/v3.1/all');
        const data = await res.json();
        // Set the global countries variable
        window.countries = data;
        window.displayCountries(data);
        // Initialize filter after we have the data
        initFilter();
    } catch (error) {
        console.error('Error fetching countries:', error);
        countriesContainer.innerHTML = '<p>Error loading countries. Please try again later.</p>';
    }
};

const searchCountry = (search) => {
    if (!window.countries) return;
    const filteredCountries = window.countries.filter((country) => 
        country.name.common.toLowerCase().includes(search.toLowerCase())
    );
    window.displayCountries(filteredCountries);
};

fetchCountries();

searchInput.addEventListener('input', () => {
    const search = searchInput.value;
    searchCountry(search);
});
