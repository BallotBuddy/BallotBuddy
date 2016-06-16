import axios from 'axios';
// request URL for candidate search
const URL = 'http://localhost:8080/cand';

export const FETCH_PROFILE = 'FETCH_PROFILE';
export const FETCH_CANDIDATE = 'FETCH_CANDIDATE';

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
