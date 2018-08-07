import sc2 from 'sc2-sdk'

const prod = false

const CALLBACK_URL = prod ? '' : 'http://localhost:8080/#/login'

export const scApi = sc2.Initialize({
    app: 'sfmdapp',
    callbackURL: CALLBACK_URL,
    accessToken: 'access_token',
    scope: ['vote', 'comment'],
});

export function simplifyReputation(raw) {
    const isNegative = (raw < 0);
    let reputation = Math.log10(Math.abs(raw));

    reputation = Math.max(reputation - 9, 0);
    reputation *= isNegative ? -9 : 9;
    reputation += 25;

    return Math.floor(reputation);
}