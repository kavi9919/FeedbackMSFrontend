
import { put, takeEvery } from 'redux-saga/effects';
import { LOGIN_FAILED, LOGIN_SUCCESS, SEND_LOGIN_REQUEST } from '../actions';
import {jobBankService} from '../../services';

function* login(data)
{
    try{
        const result = yield jobBankService.login(data);
        return result;
    }
    catch(err){
        return err;
    }
}

function* GetLoginInfo(action)
{
    try{
        const data = yield login(action.payload);
   
        if(data.status && !isNaN(data.status))
           throw data.data;
       
        yield put({type: LOGIN_SUCCESS, data});
    }
    catch(err){
        const error = {...err};
        yield put({type: LOGIN_FAILED, error});
    }
    
}

function* loginSaga()
{
    yield takeEvery(SEND_LOGIN_REQUEST, GetLoginInfo);
}

export default loginSaga;