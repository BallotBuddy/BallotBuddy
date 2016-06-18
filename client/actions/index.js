import axios from 'axios';

const configuration = require('../../config.js');
const config = configuration.configuration();
const env = config.client;
// request URL for candidate search
const URL = 'http://'+env +'/cand';

export const FETCH_PROFILE = 'FETCH_PROFILE';
export const FETCH_CANDIDATE = 'FETCH_CANDIDATE';
export const FETCH_BY_ZIP = 'FETCH_BY_ZIP';


// fetch profiles based on name search
export function fetchProfile(term){
  const route = 'name?name=';
  //convert to uppercase to avoid case sensitivity
  const name = term.toUpperCase();
  const url = `${URL}${route}${name}`;
  const request = axios.get(url);

  return {
    type: FETCH_PROFILE,
    payload: request
  };
} 


// fetch single candidate's information
export function fetchCandidate(cid) {
  const route = 'id?id=';
  const url = `${URL}${route}${cid}`;
  const request = axios.get(url);

  return {
    type: FETCH_CANDIDATE,
    payload: request
  };
}

// Fetch candidates via zip code:
export function fetchByZip(zip) {
  const route = 'zip?zip=';
  const url = `${URL}${route}${zip}`;
  const request = axios.get(url);

  return {
    type: FETCH_BY_ZIP,
    payload: request
  }
}