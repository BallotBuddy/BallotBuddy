import axios from 'axios';
var env = process.env.DOMAIN || 'localhost:8080';
// request URL for candidate search
const URL_NAME = 'http://ballotbuddy.herokuapp.com/candname?name=';

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
