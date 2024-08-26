import {saveLoginSession} from '../../utils/apiUtils'
import {LOGIN_SUCCESS, LOGIN_FAILED} from '../actions';


const loginReducer = (state = {data: {}}, action) => {
    switch(action.type)
    {
        case LOGIN_SUCCESS:
            //  console.log(action.data.data.token);
            // console.log({...state, ...action.data, action: action.type});
            // console.log({...state, ...action.data})
            saveLoginSession(action.data.data.token);
            return {...state, ...action.data, action: action.type};
        case LOGIN_FAILED:
            //console.log({...state, ...action})
            return {...state, ...action.error, action: action.type};
        default:
            return state;
    }
}

export default loginReducer;