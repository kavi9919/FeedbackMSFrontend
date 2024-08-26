
import HttpService from "./httpService";
import { LOGIN_ENDPOINT, REGISTER_ENDPOINT } from '../constants';


class JobBankService extends HttpService{

    async login(data)
    {
        return await this.sendRequest({
            method: 'POST',
            url: LOGIN_ENDPOINT,
            responseType: 'json',
            data: data 
        }, false);
    }

    async register(data)
    {
        return await this.sendRequest({
            method: 'POST',
            url: REGISTER_ENDPOINT,
            responseType: 'json',
            data: data 
        }, false);
    }

}

const jobBankService = new JobBankService();
export default jobBankService;