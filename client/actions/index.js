import axios from 'axios';

const API_KEY = '31779c7d2d96d53b00c738b77b0d32a1';
const CID_URL = 'http://www.opensecrets.org/api/?method=candSummary&';

// http://www.opensecrets.org/api/?method=candSummary&cid=N00007360&cycle=2012&apikey=__apikey__
const TEMPID = 'N00033085';

export const FETCH_PROFILE = 'FETCH_PROFILE';

// fetch profile given candidate ID:
export function fetchProfile(){
  const url = `${CID_URL}&cid=${TEMPID}&apikey=${API_KEY}&output=json`;
  // const request = axios.get(url);

  console.log('index.js - fetchProfile action fired: ');

  // request.then(function(data){
  //   console.log('api data: ', data);
  // })


  const imgUrl = 'https://s3.amazonaws.com/assets.opensecrets.org/politicians/img/N00033085.jpg';
  
  const hardCodedResponse = {
    "response": {
      "summary": {
        "@attributes": {
          "cand_name": "Cruz, Ted",
          "photo": 'https://s3.amazonaws.com/assets.opensecrets.org/politicians/img/N00033085.jpg',
          "cid": "N00033085",
          "cycle": "2016",
          "state": "TX",
          "party": "R",
          "chamber": "Pres",
          "first_elected": "2012",
          "next_election": "2016",
          "total": "89322157",
          "spent": "79919142",
          "cash_on_hand": "9403015",
          "debt": "0",
          "origin": "Center for Responsive Politics",
          "source": "http://www.opensecrets.org/politicians/summary.php?cid=N00033085&cycle=2016",
          "last_updated": "04/30/2016"
        }
      }
    }
  }

  console.log('Heres the hard coded response:', hardCodedResponse)

  return {
    type: FETCH_PROFILE,
    payload: hardCodedResponse
  };
}