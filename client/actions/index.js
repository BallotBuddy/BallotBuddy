import axios from 'axios';
const configuration = require('../../config.js');
const config = configuration.configuration();
let env = config.client;

// request URL for candidate search
const URL = 'http://' + env + '/cand';

export const FETCH_PROFILE = 'FETCH_PROFILE';
export const FETCH_CANDIDATE = 'FETCH_CANDIDATE';
export const FETCH_BY_ZIP = 'FETCH_BY_ZIP';
export const FETCH_VOTE_SMART_BIO = 'FETCH_VOTE_SMART_BIO';
export const FETCH_CANDIDATE_VIDEO = 'FETCH_CANDIDATE_VIDEO';
export const FETCH_CANDIDATE_INDUSTRY_CONTRIBUTORS = 'FETCH_CANDIDATE_INDUSTRY_CONTRIBUTORS';
export const CLEAR_VOTE_SMART_BIO = 'CLEAR_VOTE_SMART_BIO';
export const FETCH_COURAGE_SCORE = 'FETCH_COURAGE_SCORE';

// fetch top candidate industry contributors
export function fetchCandidateIndustryContributors(crpid){
  const route = 'IndustryContributors?candId=';
  const url = `${URL}${route}${crpid}`;
  const request = axios.get(url);
  request.then(function(data) {
  })
  return {
    type: FETCH_CANDIDATE_INDUSTRY_CONTRIBUTORS,
    payload: request
  }
}

// fetch profiles based on name search
export function fetchProfile(term) {
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

//http://localhost:8080/candbio?candId=15723
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

//http://localhost:8080/candCourageScore?candId=....
export function fetchCourageScore(cid) {
  const route = 'CourgeScore?candId=';
  const url = `${URL}${route}${cid}`;
  const request = axios.get(url);

  return {
    type: FETCH_COURAGE_SCORE,
    payload: request
  }
}
