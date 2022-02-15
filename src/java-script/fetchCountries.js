const BASE_URL = 'https://restcountries.com/v3.1/name/';

const countryParam = `?fields=name,capital,population,flags,languages`;

const fetchCountries = name => {
  return fetch(`${BASE_URL}${name}${countryParam}`).then(responce => {
    if (!responce.ok) {
      throw new Error(responce.message);
    } else {
      return responce.json();
    }
  });
};
export { fetchCountries };
