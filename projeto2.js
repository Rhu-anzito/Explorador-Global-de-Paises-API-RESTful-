const countriesContainer = document.getElementById('countries-container');
const loadingMessage = document.getElementById('loading-message');
const errormessage = document.getElementById('error-message');
const searchInput = document.getElementById('search-input');


const API_URL = 'https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags';

let allCountriesData = [];

function createCountryCard(country) {
   
    const populationFormatted = typeof country.population === 'number' ? country.population.toLocaleString('pt-BR') : 'N/A';

   return `
        <div class="country-card">
            <img src="${country.flags.svg}" alt="Bandeira de ${country.name.common}">
            <div class="card-info">
                <h2>${country.name.common}</h2>
                <p><strong>População:</strong> ${populationFormatted}</p>
                <p><strong>Região:</strong> ${country.region}</p>
                <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
            </div>
        </div>
    `;
}

function displayCountries(countries) {
    countriesContainer.innerHTML = '';

    if (countries.length === 0) {
        countriesContainer.innerHTML = '<p style="text-align: center; width: 100%; margin-top: 50px;"> Nenhum país encontrado com este nome.</p>';
        return;

    }
     const cardsHtml = countries.map(country => createCountryCard(country)).join('');
     countriesContainer.innerHTML = cardsHtml;

}

async function fetchCountries() {
    loadingMessage.classList.remove('hidden');
    errormessage.classList.add('hidden');

    try {
        const response = await fetch(API_URL);

       
        if (!response.ok) { 
            throw new Error(`erro na rede: ${response.status}`);
        }
        
       allCountriesData = await response.json();
       displayCountries(allCountriesData);

    } catch (error) {
        console.error('Falha ao buscar países: ', error); 
        errormessage.classList.remove('hidden');

    } finally{
        loadingMessage.classList.add('hidden');
    }
}


function filterCountries() {
    const searchTerm = searchInput.value.toLowerCase().trim();

    console.log("Termo de Busca:", searchTerm);

    const filteredCountries = allCountriesData.filter(country =>
        country.name.common.toLowerCase().includes(searchTerm)
    );

    console.log("Países Encontrados:", filteredCountries.length);

    displayCountries(filteredCountries);
}

fetchCountries();