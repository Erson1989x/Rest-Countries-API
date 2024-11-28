const initFilter = () => {
    
const filterContainer = document.querySelector('.filter-container');
const filterSelect = document.querySelector('.selected');
const filterOptions = document.querySelectorAll('.select-items');
const filterDivs = document.querySelectorAll('.select-items div');

filterContainer.addEventListener('click', () => {
    filterOptions.style.display = optionContainer.style.display === 'flex' ? 'none' : 'flex';

})

filterDivs.forEach(option => {
    option.addEventListener('click', () => {
        const value = option.getAttribute('data-value');
        filterSelect.textContent = option.textContent;
        filterOptions.style.display = 'none';

        if(value === 'all') {
            displayCountries(countries);
        } else {
            const filteredCountries = countries.filter((country) => country.region.toLowerCase() === value.toLocaleLowerCase());
            displayCountries(filteredCountries);
        }

    })

})

document.addEventListener('click', (event) => {
    if(!filterContainer.contains(event.target)) {
        filterOptions.style.display = 'none';
    }
})

}

export default initFilter;
