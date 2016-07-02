import axios from 'axios';

const configuration = require('../../config.js');
const config = configuration.configuration();
let env = config.client;
const URL = 'http://' + env + '/cand';

export const FETCH_PROFILE = 'FETCH_PROFILE';
export const FETCH_CANDIDATE = 'FETCH_CANDIDATE';
export const FETCH_BY_ZIP = 'FETCH_BY_ZIP';
export const FETCH_VOTE_SMART_BIO = 'FETCH_VOTE_SMART_BIO';
export const FETCH_CANDIDATE_SECTOR_FUNDING = 'FETCH_CANDIDATE_SECTOR_FUNDING';
export const CLEAR_VOTE_SMART_BIO = 'CLEAR_VOTE_SMART_BIO';
export const FETCH_COURAGE_SCORE = 'FETCH_COURAGE_SCORE';
export const FETCH_TWITTER = 'FETCH_TWITTER';
export const SHOW_SEARCH = 'SHOW_SEARCH';
export const SHOW_LIST = 'SHOW_LIST';
export const CLEAR_PROFILES = 'CLEAR_PROFILES';
export const FETCH_CANDIDATE_VIDEO = 'FETCH_CANDIDATE_VIDEO';
export const CLEAR_VIDEO = 'CLEAR_VIDEO';

// fetch top candidate industry contributors
export function fetchCandidateSectorFunding(crpid) {
  const route = 'SectorFunding?candId=';
  const url = `${URL}${route}${crpid}`;
  const request = axios.get(url);

  return {
    type: FETCH_CANDIDATE_SECTOR_FUNDING,
    payload: request
  }
}

// fetch twitter data based on twitter candidate nickname
export function fetchTwitter(cid) {
  const route = 'twitter?candtwitternickname=';
  const url = `${URL}${route}${cid}`
  const request = axios.get(url);

  return {
    type: FETCH_TWITTER,
    payload: request
  };
}

// fetch profiles based on name search
export function fetchProfile(term) {
  const route = 'name?name=';
  //convert input term to uppercase to avoid case sensitivity
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
  const route = 'VoteSmartId?votesmart_id=';
  const url = `${URL}${route}${cid}`;
  const request = axios.get(url);

  return {
    type: FETCH_CANDIDATE,
    payload: request
  };
}
// 
// I think we should add routes to all these like below
// 
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

// fetch single candidate's information
export function fetchVoteSmartBio(cid) {
  const route = 'bio?candId=';
  const url = `${URL}${route}${cid}`;
  const request = axios.get(url);

  return {
    type: FETCH_VOTE_SMART_BIO,
    payload: request
  }
}

// clears the VoteSmartBio state when the back button is clicked
export function clearVoteSmartBio() {

  return {
    type: CLEAR_VOTE_SMART_BIO,
    payload: ''
  }
}

// clears the Video state when the back button is clicked
export function clearVideo() {

  return {
    type: CLEAR_VIDEO,
    payload: ''
  }
}

// instructs the landing_page to render the header/search component
export function showSearch() {

  return {
    type: SHOW_SEARCH
  }
}

// instructs landing_page component to render the profiles_list component
export function showList() {

  return {
    type: SHOW_LIST
  }
}

// clears profiles results from previous search.
export function clearProfiles() {

  return {
    type: CLEAR_PROFILES,
    payload: ''
  }
}

//http://localhost:8080/candCourageScore?candId=.... // <= like these.......
export function fetchCourageScore(cid) {
  const route = 'CourageScore?candId=';
  const url = `${URL}${route}${cid}`;
  const request = axios.get(url);

  return {
    type: FETCH_COURAGE_SCORE,
    payload: request
  }
}

// http://localhost:8080/candyoutube?term=Clinton
export function fetchCandidateVideo(name) {
  const route = 'youtube?term=';
  const url = `${URL}${route}${name}`;
  const request = axios.get(url);

  return {
    type: FETCH_CANDIDATE_VIDEO,
    payload: request
  }
}

