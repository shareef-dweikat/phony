import axios from "axios";

const KEY_UNDEFIND_ERROR = {
    "success": false,
    "error": {
        "code": 101,
        "info": "No API Key was specified or an invalid API Key was specified."
    }
}
const KEY_SYMBOLS_ERROR = {
    "success": false,
    "error": {
        "code": 101,
        "info": "No symbols was specified or an invalid."
    }
}

export const currentRates = (cbase, symbols) => {
    return new Promise(async (resolve, reject) => {
        
        if (process.env.REACT_APP_RAPID_API_KEY === undefined) {
            reject(KEY_UNDEFIND_ERROR);
        }

        if (!Array.isArray(symbols)) {
            reject(KEY_SYMBOLS_ERROR);
        }

        const fixer = axios.create({
            baseURL: process.env.REACT_APP_RAPID_API_BASE_URL,
            params: {
                base: cbase,
                symbols: symbols.join(","),
            },
            headers: {
                'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
                'x-rapidapi-host': process.env.REACT_APP_RAPID_HOST,     
            }
        });

        try {
            const result = await fixer.get('latest');
            resolve(result.data.rates);
        } catch (error) {
            console.log(error);
            reject(error.response);
        }
    });
}