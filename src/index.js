import "./css/styles.css";
import { fetchCountries } from "./java-script/fetchCountries";
import { Notify } from "notiflix/build/notiflix-notify-aio";
const debounce = require("lodash.debounce");

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector("#search-box"),
  list: document.querySelector(".country-list"),
  div: document.querySelector(".country-info"),
};

refs.input.addEventListener("input", debounce(handleInputCountr, DEBOUNCE_DELAY));

function handleInputCountr(event) {
  const valueInput = event.target.value.trim();

  if (!valueInput) {
    return;
  }
  fetchCountries(valueInput).then((response) => {
    console.log(response);
    if (response.length === 1) {
      renderCountry(response);
    }
    if (response.length < 10) {
      ``;
    }
  });
}

function renderCountry(array) {
  const arrayCountry = array
    .map(({ name, capital, population, flags, languages }) => {
      return `<div>
  <img src="${flags.svg}" alt="${name.official}" width=50px/>
</div>
<h2>${name.official}</h2>
<span>Capital:${capital}</span>
<span>Population:${population}</span>
<span>Languages:${Object.values(languages).join(", ")}</span>`;
    })
    .join();
  refs.div.insertAdjacentHTML("afterbegin", arrayCountry);
}
