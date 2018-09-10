import { scApi, handleProfile } from "./steem-connect";
import { client } from "./steemd";

const TRANSFER_CALLBACK_URL = "";

/**
 * Steem-Connect API
 */

export const getUserProfile = () => {
  console.log('access token')
  console.log(scApi.options.accessToken)
  return scApi.me();
}

export const getLoginUrl = () => scApi.getLoginURL();

export const vote = ({ voter, author, permlink, weight }) =>
  scApi.vote(voter, author, permlink, weight);

export const transfer = ({ currency = "STEEM", to, amount, memo = "" }) =>
  scApi.sign("transfer", { to, amount, memo }, TRANSFER_CALLBACK_URL);

export const logout = () => {
  scApi.revokeToken()
  localStorage.removeItem('access_token')
};

export const reblog = ({ account, author, permlink }) =>
  scApi.reblog(account, author, permlink);

export const unfollow = ({ follower, following }) =>
  scApi.unfollow(follower, following);

export const ignore = ({ follower, following }) =>
  scApi.ignore(follower, following);

export const claimRewardBalance = ({
  account,
  rewardSteem,
  rewardSbd,
  rewardVests
}) => scApi.claimRewardBalance(account, rewardSteem, rewardSbd, rewardVests);

export const updateUserMetadata = metadata =>
  scApi.updateUserMetadata(metadata);

export const isAccessGranted = () => scApi.options.accessToken;

/**
 * SteemD API
 */
export const getDiscussions = ({ filter, query }) =>
  client.database.getDiscussions(filter, query);

export const getDiscussionDetails = ({ author, permlink }) =>
  client.database.call("get_content", [author, permlink]);

export const getVotersList = ({ author, permlink }) =>
  client.database.call('get_active_votes', [author, permlink]);

export const getDiscussionComments = ({ author, permlink }) =>
  client.database.call('get_content_replies', [author, permlink]);