import axios from "axios";


class HttpService{
    service = null;

    constructor()
    {
        this.service = axios.create();
        this.service.interceptors.response.use(this.handleSuccess, this.handleError);
    }

    sendRequest = async (config, isAuthRequire = true) => {
        if(isAuthRequire)
        {
            const token = window.sessionStorage.getItem('jbtk');
            if(token)
            {
                config.headers = {
                    Authorization: `Bearer ${token}`,
                }
            }
        }
        return this.service.request(config);
    }

    handleSuccess = (res) => {
        return res?.data;
    }

    handleError = (err) => {

        if(!err.response){
            return{
                data:{
                    success: false,
                    message: 'Network Failure'
                }
            }
        }
        else
        {
            return err.response;
        }
    }

}

export default HttpService;