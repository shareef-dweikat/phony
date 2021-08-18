import ApiRequest from "./ApiRequest";
import sha256 from 'crypto-js/sha256';

export const currentRates = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const storageHash = sha256(`currency`).toString();
            const currencies = JSON.parse(sessionStorage.getItem(storageHash));
            if (currencies) {
                resolve(currencies);
            } else {
                const result = await ApiRequest.post('get_currency');
                sessionStorage.setItem(storageHash, JSON.stringify(result.data));
                resolve(result.data);
            }
        } catch (error) {
            console.log(error);
            reject(error.response);
        }
    });
}