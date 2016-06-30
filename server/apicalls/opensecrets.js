var rp = require('request-promise');
var _ = require('underscore');
var Promise = require('bluebird');
var PromiseThrottle = require('promise-throttle');

var db = require('../database/database/db');
var api_Keys = require('../../api_keys');
var api_key = api_Keys.OPENSECRETS_API;
var opensecrets = module.exports;


opensecrets.checkStashReturn = function (cid) {

  return db.queryFunding(cid).then(function (data) {
    
    if (data.length < 1){
      return opensecrets.candSectorFunding(cid).then(function(results){
       return db.queryFunding(cid);
      })
    }
    else{
      return data;
    }
  })
}


opensecrets.fetch = function (request) {
  return rp(request)
    .then(function (res) {
      console.log("Successfully fetched candidate's top contributors by industry");
      return (res);
    })
    .then(function (jsres) {
     return jsres.response.candIndus['@attributes'];    
    })
    .catch(function (err) {
     console.log(err.message);
    })
};

// Takes a candidates opensecreds id
// Returns an object ==> { sector: totalFunding }
// Note: There are 18 sectors in total
opensecrets.candSectorFunding = function (cid) {
  // Object that will hold total funding for each industry
  var sectorFunding = {
    "Agribusiness": 0,
    "Communications/Electronics": 0,
    "Construction": 0,
    "Defense": 0,
    "Energy & Natural Resources": 0,
    "Finance, Insurance & Real Estate": 0,
    "Health": 0,
    "Lawyers & Lobbyists": 0,
    "Transportation": 0,
    "Misc Business": 0,
    "Labor": 0,
    "Ideological/Single-Issue": 0,
    "Other": 0,
    "Unknown": 0,
    "Party Cmtes": 0,
    "Joint Candidate Cmtes": 0,
    "Candidate": 0,
    "Non-contribution": 0
  };

  // industryCodes holds an array of objects (one for each industry) that look like:
  // { code: 'A01', sector: 'Agribusiness', industry: 'Crop Production & Basic Processing'}
  // Note: Each sector (e.g. 'Transportation') covers multiple industries (e.g. 'Automotive', 'Trucking', 'Railroads')
  var test ={};
  return Promise.map(industryCodes, function (industryObj) {
    // build request for sector-level funding data
    const sector = industryObj.sector;
    var uri = 'http://www.opensecrets.org/api/?method=CandIndByInd&cid=' + cid + '&cycle=2016&ind=' + industryObj.code + '&output=json';
    var industryFunding = {
      uri: uri,
      qs: {
        apikey: api_key || process.env.OPENSECRETS
      },
      headers: { 'User-Agent': 'request-promise' },
      json: true
    };

  return opensecrets.fetch(industryFunding)
    .then((obj) => {
      // if (obj === undefined) {
      //   console.log(industryObj.code);
      // }
      // console.log("sectorFunding object: ", obj);
      // console.log(cid,industryObj.code,industryObj.industry,sector,obj.total);
        return db.insertFundingRow({candidate_id:cid,sector_code:industryObj.code,industry:industryObj.industry,sector:sector,funding:obj.total});        
      })
      .catch(function(err){
        // console.log(cid,industryObj.code,industryObj.industry,sector,err.message);
        console.log("Error fetching industry funding. Message: ", err.message);
      })
    })
    .then(function(results){
     return results;
    })
};

// Object holding OpenSecret's industry codes to the industry and sector
var industryCodes =[ { code: 'A01', industry: 'Crop Production & Basic Processing', sector: 'Agribusiness' },
  { code: 'A02', industry: 'Tobacco', sector: 'Agribusiness' },
  { code: 'A04', industry: 'Dairy', sector: 'Agribusiness' },
  { code: 'A05', industry: 'Poultry & Eggs', sector: 'Agribusiness' },
  { code: 'A06', industry: 'Livestock', sector: 'Agribusiness' },
  { code: 'A07', industry: 'Agricultural Services/Products', sector: 'Agribusiness' },
  { code: 'A09', industry: 'Food Processing & Sales', sector: 'Agribusiness' },
  { code: 'A10', industry: 'Forestry & Forest Products', sector: 'Agribusiness' },
  { code: 'A11', industry: 'Misc Agriculture', sector: 'Agribusiness' },
  { code: 'B00', industry: 'Misc Communications/Electronics', sector: 'Communications/Electronics' },
  { code: 'B01', industry: 'Printing & Publishing', sector: 'Communications/Electronics' },
  { code: 'B02', industry: 'TV/Movies/Music', sector: 'Communications/Electronics' },
  { code: 'B08', industry: 'Telephone Utilities', sector: 'Communications/Electronics' }];//,
  // { code: 'B09', industry: 'Telecom Services', sector: 'Communications/Electronics' },
  // { code: 'B12', industry: 'Electronics Mfg & Equip', sector: 'Communications/Electronics' },
  // { code: 'B13', industry: 'Internet', sector: 'Communications/Electronics' },
  // { code: 'C01', industry: 'General Contractors', sector: 'Construction' },
  // { code: 'C02', industry: 'Home Builders', sector: 'Construction' },
  // { code: 'C03', industry: 'Special Trade Contractors', sector: 'Construction' },
  // { code: 'C04', industry: 'Construction Services', sector: 'Construction' },
  // { code: 'C05', industry: 'Building Materials & Equipment', sector: 'Construction' },
  // { code: 'D01', industry: 'Defense Aerospace', sector: 'Defense' },
  // { code: 'D02', industry: 'Defense Electronics', sector: 'Defense' },
  // { code: 'D03', industry: 'Misc Defense', sector: 'Defense' },
  // { code: 'E01', industry: 'Oil & Gas', sector: 'Energy & Natural Resources' },
  // { code: 'E04', industry: 'Mining', sector: 'Energy & Natural Resources' },
  // { code: 'E07', industry: 'Misc Energy', sector: 'Energy & Natural Resources' },
  // { code: 'E08', industry: 'Electric Utilities', sector: 'Energy & Natural Resources' },
  // { code: 'E09', industry: 'Environmental Svcs/Equipment', sector: 'Energy & Natural Resources' },
  // { code: 'E10', industry: 'Waste Management', sector: 'Energy & Natural Resources' },
  // { code: 'E11', industry: 'Fisheries & Wildlife', sector: 'Energy & Natural Resources' },
  // { code: 'F03', industry: 'Commercial Banks', sector: 'Finance, Insurance & Real Estate' },
  // { code: 'F04', industry: 'Savings & Loans', sector: 'Finance, Insurance & Real Estate' },
  // { code: 'F05', industry: 'Credit Unions', sector: 'Finance, Insurance & Real Estate' },
  // { code: 'F06', industry: 'Finance/Credit Companies', sector: 'Finance, Insurance & Real Estate' },
  // { code: 'F07', industry: 'Securities & Investment', sector: 'Finance, Insurance & Real Estate' },
  // { code: 'F09', industry: 'Insurance', sector: 'Finance, Insurance & Real Estate' },
  // { code: 'F10', industry: 'Real Estate', sector: 'Finance, Insurance & Real Estate' },
  // { code: 'F11', industry: 'Accountants', sector: 'Finance, Insurance & Real Estate' },
  // { code: 'F13', industry: 'Misc Finance', sector: 'Finance, Insurance & Real Estate' },
  // { code: 'H01', industry: 'Health Professionals', sector: 'Health' },
  // { code: 'H02', industry: 'Hospitals/Nursing Homes', sector: 'Health' },
  // { code: 'H03', industry: 'Health Services/HMOs', sector: 'Health' },
  // { code: 'H04', industry: 'Pharmaceuticals/Health Products', sector: 'Health' },
  // { code: 'H05', industry: 'Misc Health', sector: 'Health' },
  // { code: 'K01', industry: 'Lawyers/Law Firms', sector: 'Lawyers & Lobbyists' },
  // { code: 'K02', industry: 'Lobbyists', sector: 'Lawyers & Lobbyists' },
  // { code: 'M01', industry: 'Air Transport', sector: 'Transportation' },
  // { code: 'M02', industry: 'Automotive', sector: 'Transportation' },
  // { code: 'M03', industry: 'Trucking', sector: 'Transportation' },
  // { code: 'M04', industry: 'Railroads', sector: 'Transportation' },
  // { code: 'M05', industry: 'Sea Transport', sector: 'Transportation' },
  // { code: 'M06', industry: 'Misc Transport', sector: 'Transportation' },
  // { code: 'N00', industry: 'Business Associations', sector: 'Misc Business' },
  // { code: 'N01', industry: 'Food & Beverage', sector: 'Misc Business' },
  // { code: 'N02', industry: 'Beer, Wine & Liquor', sector: 'Misc Business' },
  // { code: 'N03', industry: 'Retail Sales', sector: 'Misc Business' },
  // { code: 'N04', industry: 'Misc Services', sector: 'Misc Business' },
  // { code: 'N05', industry: 'Business Services', sector: 'Misc Business' },
  // { code: 'N06', industry: 'Recreation/Live Entertainment', sector: 'Misc Business' },
  // { code: 'N07', industry: 'Casinos/Gambling', sector: 'Misc Business' },
  // { code: 'N08', industry: 'Lodging/Tourism', sector: 'Misc Business' },
  // { code: 'N09', industry: 'Marijuana', sector: 'Misc Business' },
  // { code: 'N12', industry: 'Misc Business', sector: 'Misc Business' },
  // { code: 'N13', industry: 'Chemical & Related Manufacturing', sector: 'Misc Business' },
  // { code: 'N14', industry: 'Steel Production', sector: 'Misc Business' },
  // { code: 'N15', industry: 'Misc Manufacturing & Distributing', sector: 'Misc Business' },
  // { code: 'N16', industry: 'Textiles', sector: 'Misc Business' },
  // { code: 'P01', industry: 'Building Trade Unions', sector: 'Labor' },
  // { code: 'P02', industry: 'Industrial Unions', sector: 'Labor' },
  // { code: 'P03', industry: 'Transportation Unions', sector: 'Labor' },
  // { code: 'P04', industry: 'Public Sector Unions', sector: 'Labor' },
  // { code: 'P05', industry: 'Misc Unions', sector: 'Labor' },
  // { code: 'Q01', industry: 'Republican/Conservative', sector: 'Ideological/Single-Issue' },
  // { code: 'Q02', industry: 'Democratic/Liberal', sector: 'Ideological/Single-Issue' },
  // { code: 'Q03', industry: 'Leadership PACs', sector: 'Ideological/Single-Issue' },
  // { code: 'Q04', industry: 'Foreign & Defense Policy', sector: 'Ideological/Single-Issue' },
  // { code: 'Q05', industry: 'Pro-Israel', sector: 'Ideological/Single-Issue' },
  // { code: 'Q08', industry: 'Women\'s Issues', sector: 'Ideological/Single-Issue' },
  // { code: 'Q09', industry: 'Human Rights', sector: 'Ideological/Single-Issue' },
  // { code: 'Q10', industry: 'Misc Issues', sector: 'Ideological/Single-Issue' },
  // { code: 'Q11', industry: 'Environment', sector: 'Ideological/Single-Issue' },
  // { code: 'Q12', industry: 'Gun Control', sector: 'Ideological/Single-Issue' },
  // { code: 'Q13', industry: 'Gun Rights', sector: 'Ideological/Single-Issue' },
  // { code: 'Q14', industry: 'Abortion Policy/Anti-Abortion', sector: 'Ideological/Single-Issue' },
  // { code: 'Q15', industry: 'Abortion Policy/Pro-Abortion Rights', sector: 'Ideological/Single-Issue' },
  // { code: 'Q16', industry: 'Candidate Committees', sector: 'Ideological/Single-Issue' },
  // { code: 'W02', industry: 'Non-Profit Institutions', sector: 'Other' },
  // { code: 'W03', industry: 'Civil Servants/Public Officials', sector: 'Other' },
  // { code: 'W04', industry: 'Education', sector: 'Other' },
  // { code: 'W05', industry: 'Clergy & Religious Organizations', sector: 'Other' },
  // { code: 'W06', industry: 'Retired', sector: 'Other' },
  // { code: 'W07', industry: 'Other', sector: 'Other' },
  // { code: 'Y00', industry: 'Unknown', sector: 'Unknown' },
  // { code: 'Y01', industry: 'Homemakers/Non-income earners', sector: 'Unknown' },
  // { code: 'Y02', industry: 'No Employer Listed or Found', sector: 'Unknown' },
  // { code: 'Y03', industry: 'Generic Occupation/Category Unknown', sector: 'Unknown' },
  // { code: 'Y04', industry: 'Employer Listed/Category Unknown', sector: 'Unknown' },
  // { code: 'Z02', industry: 'Party Committees', sector: 'Party Cmtes' },
  // { code: 'Z04', industry: 'Joint Candidate Cmte', sector: 'Joint Candidate Cmtes' },
  // { code: 'Z07', industry: 'Candidate Self-finance', sector: 'Candidate' },
  // { code: 'Z08', industry: 'Party Committee Transfer', sector: 'Non-contribution' },
  // { code: 'Z09', industry: 'Non-contribution', sector: 'Non-contribution' } ];
