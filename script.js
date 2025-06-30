
const countriesContainer = document.querySelector(".countries-container");
// console.log(fetch('https://restcountries.com/v3.1/all?fields=name,capital,region,flags,population'));
// console.log(fetch('https://restcountries.com/v3.1/all?fields=name,capital,region,flags,population').then((resObj) => {
//     console.log(resObj);
//     // console.log(resObj.json());
//     return resObj.json();
// }));
const filterByRegion = document.querySelector(".filter-by-region");

const searchInput = document.querySelector('.search-container input');

const themeChanger = document.querySelector('.theme-changer');

const light = document.getElementById('light');


let allCountriesData;
fetch(
  "https://restcountries.com/v3.1/all?fields=name,capital,region,flags,population"
)
  .then((responseObj) => {
    // console.log(responseObj);
    return responseObj.json();
  })
  .then((data) => {
    renderCountries(data);
    allCountriesData = data;
  });
// for fetching the border-countries we'll use another api
filterByRegion.addEventListener("change", (e) => {
  // console.log(e.target.value);
  fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((responseObj) => {
      // console.log(responseObj);
      return responseObj.json();
    })
    .then(renderCountries);
});

function renderCountries(data) {
  countriesContainer.innerHTML = "";
  // console.log(data);
  data.forEach((country) => {
    // now while looping we have to create cards for each country
    // each individual country here is an object only
    // console.log(country);
    const countryCard = document.createElement("a");

    countryCard.classList.add("country-card");
    // countryCard.classList.add("glitter");
    countryCard.href = `/country.html?name=${country.name.common}`;
    // const cardImage = document.createElement('img');
    // cardImage.src = 'https://flagcdn.com/tg.svg';
    // countryCard.append(cardImage);
    // alternate way to
    const cardHTML = `
    <img src="${country.flags.svg}" alt=${country.name.common} />
          <div class="card-text">
            <h3 class="card-title">${country.name.common}</h3>
            <p><b>Population: </b>${country.population.toLocaleString(
              "en-In"
            )}</p>
            <p><b>Region: </b>${country.region}</p>
            <p><b>Capital: </b>${country.capital?.[0]}</p>
          </div>

`;

    countryCard.innerHTML = cardHTML;
    countriesContainer.append(countryCard);
  });
}

searchInput.addEventListener('input', (e) => {
  const filteredCountries = allCountriesData.filter((country) => {
    return country.name.common.toLowerCase().includes(e.target.value.toLowerCase());
    
  })
  // console.log(filteredCountries);
  renderCountries(filteredCountries);
})

themeChanger.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  if(document.body.classList.contains('dark')) {
    // means there is light mode
    light.style.display = 'block';
    themeChanger.append(light);
    themeChanger.innerText = 'Light Mode';
  } else {
    themeChanger.innerText = 'Dark Mode';
  }
});