const sc2 = require('steemconnect');
import { getDynamicGlobalProperties } from './steemd';

const prod = false

const CALLBACK_URL = prod ? '' : 'http://localhost:8080/#/login'

let access_token = localStorage.getItem('access_token')

let profile = {}

/**
 * Initializes the steem-connect API
 */
export const scApi = sc2.Initialize({
    app: 'sfmdapp',
    callbackURL: CALLBACK_URL,
    accessToken: '',
    scope: ['vote', 'comment'],
});

if (access_token) {
  scApi.setAccessToken(access_token)
}

export const scLoginUrl = scApi.getLoginURL();

/**
 * Simplifies STEEM reputation for human reading
 * @param  {integer} raw raw number for reputation
 * @return {float}       human comprehensible reputation
 */
export function simplifyReputation(raw) {
  const isNegative = (raw < 0);
  let reputation = Math.log10(Math.abs(raw));

  reputation = Math.max(reputation - 9, 0);
  reputation *= isNegative ? -9 : 9;
  reputation += 25;

  return Math.floor(reputation);
}

function parseVests(raw) {
  let result;

  if (raw.indexOf(" VESTS") > -1) {
    return parseFloat(raw.replace(" VESTS", ""));
  }
  else if (raw.indexOf(" STEEM") > -1) {
    return parseFloat(raw.replace(" STEEM", ""));
  }
}

export function calculateSteemPower(vesting_shares, received_vesting_shares) {
  vesting_shares = parseVests(vesting_shares);
  received_vesting_shares = parseVests(received_vesting_shares);

  return getDynamicGlobalProperties()
    .then(res => {
      let { total_vesting_fund_steem, total_vesting_shares } = res;

      total_vesting_fund_steem = parseVests(total_vesting_fund_steem);
      total_vesting_shares = parseVests(total_vesting_shares);

      let steemPower = (total_vesting_fund_steem * (vesting_shares / total_vesting_shares));
      let delegatedSteemPower = (total_vesting_fund_steem * (received_vesting_shares / total_vesting_shares));

      return {
        steem_power: steemPower.toFixed(3),
        delegated_steem_power: delegatedSteemPower.toFixed(3)
      }
    })
    .catch(err => console.log(err))
}

/**
 * Returns the user profile data into one single object pluggable to the app's state
 * @param  {object} res response from steem-connect
 * @return {object}     vuex state ready profile information
 */
export function handleProfile (res) {
  let account = res.data;

  if (account.guest) {
    const { name, picture } = account;

    return new Promise((resolve, reject) => {
      resolve({
        realName: name,
        profile_image: picture
      });
    });
  };

  const {
    balance,
    id,
    sbd_balance,
    reputation,
    voting_power,
    vesting_shares,
    received_vesting_shares,
    name: username
  } = account;

  const {
    profile: {
      about = '',
      cover_image = '',
      location = '',
      name: realName,
      profile_image = 'https://cdn.steemitimages.com/DQmWXAukqwnJTbXPST3D39KUgK6oQhxkYQmW3ozrHfZt3jC/apple-icon-144x144.png'
    }
  } = JSON.parse(account.json_metadata);

  return calculateSteemPower(vesting_shares, received_vesting_shares).then(sp => {
    return {
      name,
      balance,
      id,
      sbd_balance,
      ...sp,
      reputation: simplifyReputation(reputation),
      voting_power,
      about,
      cover_image,
      location,
      realName,
      username,
      profile_image
    }
  });
}