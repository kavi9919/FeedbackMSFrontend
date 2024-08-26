export const isLogging = () => {
    const token = window.localStorage.getItem('jbtk');
    return token ? true : false;
}

export const saveLoginSession = (sessionData) =>{
    const token = window.localStorage.getItem('jbtk');
    if(!token)
       window.localStorage.setItem('jbtk', sessionData);
}

export const removeLoginSession = () => {
    const token = window.localStorage.getItem('jbtk');
    if(token)
       window.localStorage.removeItem('jbtk');
}