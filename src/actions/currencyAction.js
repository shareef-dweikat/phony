import ApiRequest from "./ApiRequest";

export const currentRates = (cbase, symbols) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await ApiRequest.post('get_currency');
            resolve(result.data);
        } catch (error) {
            console.log(error);
            reject(error.response);
        }
    });
}