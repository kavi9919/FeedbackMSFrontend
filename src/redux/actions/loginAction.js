export const SEND_LOGIN_REQUEST = 'SEND_LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const sendLoginRequest = (payload) => ({
    type: SEND_LOGIN_REQUEST,
    payload
})