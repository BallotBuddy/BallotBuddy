import axios from 'axios';


var configuration = require('../../config.js');

 var config = configuration.configuration();


var env =config.client;
console.log('index.js in actions',env);

// request URL for candidate search
const URL_NAME = 'http://'+env +'/candname?name=';

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
