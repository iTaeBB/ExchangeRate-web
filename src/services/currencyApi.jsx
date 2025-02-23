import axios from 'axios';

const API_BASE_URL = '';

function createCurrencyHttpClient() {
    const instance = axios.create({
        baseURL: API_BASE_URL,
    });

    instance.interceptors.request.use((axiosConfig) => {
        return axiosConfig;
    });

    instance.interceptors.response.use(
        (res) => {
            return res;
        },
        (err) => {
            const { response } = err;

            if (response?.data?.error) {
                const { code, message, details } = response.data.error;

                return Promise.reject({
                    message: message || "",
                    status: response.status,
                    code: code || "",
                    details: details || [],
                });
            }

            return Promise.reject(err);
        }
    );

    return instance;
}
class currencyApi {
    constructor() {
        if (!this.client) {
            this.client = createCurrencyHttpClient();
        }
    }

    async getExchangeRate(base, target) {
        try {
            const response = await this.client.get(`${API_BASE_URL}api/exchange/${base}/${target}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching exchange rate:', error);
            throw error;
        }
    };

    async getCurrencyCodes() {
        try {
            const response = await this.client.get(`${API_BASE_URL}api/currency-codes`);
            return response.data;
        } catch (error) {
            console.error('Error fetching currency codes:', error);
            throw error;
        }
    };
}

const currencyApiInstance = new currencyApi();

export default currencyApiInstance;