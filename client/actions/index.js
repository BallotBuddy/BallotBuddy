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

  const doubleResponse = {
  "response": {
    "legislator": [
      {
        "@attributes": {
          "photo": 'https://s3.amazonaws.com/assets.opensecrets.org/politicians/img/N00033085.jpg',
          "cid": "N00026148",
          "firstlast": "Louis B Gohmert Jr",
          "lastname": "GOHMERT",
          "party": "R",
          "office": "TX01",
          "gender": "M",
          "first_elected": "2004",
          "exit_code": "0",
          "comments": "",
          "phone": "202-225-3035",
          "fax": "202-226-1230",
          "website": "http://gohmert.house.gov",
          "webform": "http://gohmert.house.gov/contact/",
          "congress_office": "2243 Rayburn House Office Building",
          "bioguide_id": "G000552",
          "votesmart_id": "50029",
          "feccandid": "H4TX04039",
          "twitter_id": "RepLouieGohmert",
          "youtube_url": "http://youtube.com/GohmertTX01",
          "facebook_id": "pages/foo/50375006903",
          "birthdate": "1953-08-18"
        }
      },
      {
        "@attributes": {
          "photo": 'https://s3.amazonaws.com/assets.opensecrets.org/politicians/img/N00033085.jpg',
          "cid": "N00026457",
          "firstlast": "Ted Poe",
          "lastname": "POE",
          "party": "R",
          "office": "TX02",
          "gender": "M",
          "first_elected": "2004",
          "exit_code": "0",
          "comments": "",
          "phone": "202-225-6565",
          "fax": "202-225-5547",
          "website": "http://poe.house.gov",
          "webform": "https://poe.house.gov/index.cfm/contact-form#form_D05B44B5-B782-4DC7-BED6-FF0C90951FFF",
          "congress_office": "2412 Rayburn House Office Building",
          "bioguide_id": "P000592",
          "votesmart_id": "49198",
          "feccandid": "H4TX02108",
          "twitter_id": "JudgeTedPoe",
          "youtube_url": "http://youtube.com/CongressmanTedPoe",
          "facebook_id": "pages/foo/106631626049851",
          "birthdate": "1948-09-10"
        }
      }
      ]
    }
   }

  console.log('Heres the hard coded response:', hardCodedResponse);
  console.log('Heres the hard coded response:', doubleResponse);


  return {
    type: FETCH_PROFILE,
    payload: doubleResponse
  };
}