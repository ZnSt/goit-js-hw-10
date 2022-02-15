import './css/styles.css';
import { fetchCountries } from './java-script/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  div: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(handleInputCountr, DEBOUNCE_DELAY));

function clearPage() {
  refs.div.innerHTML = '';
  refs.list.innerHTML = '';
}

function handleInputCountr(event) {
  const valueInput = event.target.value.trim();

  if (!valueInput) {
    clearPage();

    return;
  }
  fetchCountries(valueInput)
    .then(response => {
      clearPage();

      if (response.length === 1) {
        clearPage();
        renderCountry(response);
      } else if (response.length > 1 && response.length <= 10) {
        clearPage();
        infoCountrList(response);
      } else {
        Notify.info('Too many matches found. Please enter a more specific name.');
      }
    })
    .catch(error => Notify.warning('Oops, there is no country with that name'));
}

function infoCountrList(array) {
  const arrayCountry = array
    .map(({ name, flags }) => {
      return `<li class="item">
  <img src="${flags.svg}" alt="${name.official}" width=60px/>
  <h2>${name.official}</h2>
</li>`;
    })
    .join('');
  refs.list.insertAdjacentHTML('afterbegin', arrayCountry);
}

function renderCountry(array) {
  const arrayCountry = array
    .map(({ name, capital, population, flags, languages }) => {
      return `<div>
  <img src="${flags.svg}" alt="${name.official}" width=60px class="img-countr"/>
</div>
<h2>${name.official}</h2>
<span>Capital: ${capital}</span>
<span>Population: ${population}</span>
<span>Languages: ${Object.values(languages).join(', ')}</span>`;
    })
    .join('');
  refs.div.insertAdjacentHTML('afterbegin', arrayCountry);
}
