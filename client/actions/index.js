import axios from 'axios';

// request URL for candidate search
const URL_NAME = 'http://localhost:8080/candname?name=';

export const FETCH_PROFILE = 'FETCH_PROFILE';

// fetch profiles based on name search
export function fetchProfile(term){
  //convert to uppercase to avoid case sensitivity
  const name = term.toUpperCase();
  const url = `${URL_NAME}${name}`;
  const request = axios.get(url);

  return {
    type: FETCH_PROFILE,
    payload: request
  };
}
