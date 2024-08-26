import { put, takeEvery } from "redux-saga/effects";
import { REGISTER_FAILED, REGISTER_SUCCESS, SEND_REGISTER_REQUEST } from "../actions";
import { jobBankService } from "../../services";


function* register(data)
{
    try{
        const result = yield jobBankService.register(data);
        return(result);
    }
    catch(err){
        return err;
    }
}

//need to continue from here
function* GetRegisterInfo(action)
{
    try{
        const data = yield register(action.payload)

        if(data.status && !isNaN(data.status))
           throw data.data;

        yield put({type: REGISTER_SUCCESS, data});
    }
    catch(err){
        const error = {...err};
        yield put({type: REGISTER_FAILED, error});
    }
}





function* registerSaga()
{
    yield takeEvery(SEND_REGISTER_REQUEST, GetRegisterInfo);
}

export default registerSaga;