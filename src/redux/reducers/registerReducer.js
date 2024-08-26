import { REGISTER_FAILED, REGISTER_SUCCESS, WAITING_FOR_VERIFY } from "../actions";


const registerReducer = (state = {data: {}}, action) => {
    switch(action.type)
    {
        case REGISTER_SUCCESS:
            return {...state, ...action.data, action: action.type};
        case REGISTER_FAILED:
            return {...state, ...action.error, action: action.type};
        default:
            return state;
    }
}

export default registerReducer;