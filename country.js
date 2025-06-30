const countryName = new URLSearchParams(location.search).get("name");

const flagImage = document.querySelector(".country-details img");

const countryNameh1 = document.querySelector(".country-details h1");

const nativeName = document.querySelector(".native-name");

const population = document.querySelector(".population");

const region = document.querySelector(".region");

const subRegion = document.querySelector(".sub-region");

const capital = document.querySelector(".capital");

const topLevelDomain = document.querySelector(".top-level-domain");

const currencies = document.querySelector(".currencies");

const languages = document.querySelector(".languages");

const borderCountries = document.querySelector(".border-countries");

const themeChanger = document.querySelector('.theme-changer');

const light = document.getElementById('light');

// console.log(countryName);

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => {
    // console.log(res);
    return res.json();
  })
  .then(([country]) => {
    // as native name for every country is different
    // console.log(country);

    flagImage.src = country.flags.svg;
    countryNameh1.innerText = country.name.common;
    population.innerText = country.population.toLocaleString("en-In");
    region.innerText = country.region;

    topLevelDomain.innerText = country.tld.join(", ");
    if (country.currencies) {
      currencies.innerText = Object.values(country.currencies)
        .map((currency) => {
          return currency.name;
        })
        .join(", ");
    }

    if (country.subregion) {
      subRegion.innerText = country.subregion;
    }

    if (country.capital) {
      capital.innerText = country.capital?.[0];
    }

    if (country.languages) {
      // console.log(country.languages);
      // console.log(Object.values(country.languages));
      languages.innerText = Object.values(country.languages).join(", ");
    }

    if (country.name.nativeName) {
      // console.log(Object.values(country.name.nativeName)[0].common);
      nativeName.innerText = Object.values(country.name.nativeName)[0].common;
    } else {
      nativeName.innerText = country.name.common;
    }

    if (country.borders) {
      // console.log(country.borders);
      country.borders.forEach((border) => {
        // console.log(border);

        // now we'll again send a fetch request to get countries name with the help of their country codes
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => {
            return res.json();
          })
          .then(([borderCountry]) => {
            // console.log(borderCountry);
            const borderCountryTag = document.createElement("a");
            borderCountryTag.innerText = borderCountry.name.common;
            borderCountryTag.href = `country.html?name=${borderCountry.name.common}`;
            borderCountries.append(borderCountryTag);
          });
      });
    }
  });

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