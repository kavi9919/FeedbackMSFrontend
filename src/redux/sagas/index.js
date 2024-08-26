import { all } from "redux-saga/effects";
import registerSaga  from "./registerSaga";
import loginSaga from "./loginSaga";

export default function* rootSaga()
{
    yield all([
        registerSaga(),
        loginSaga()
    ]);
}