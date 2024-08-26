export const SEND_REGISTER_REQUEST = 'SEND_REGISTER_REQUEST';
export const WAITING_FOR_VERIFY = 'WAITING_FOR_VERIFY';
export const VERIFY_TIMEOUT = 'VERIFY_TIMEOUT';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

export const sendRegisterRequest = (payload) => ({
    type: SEND_REGISTER_REQUEST,
    payload
})