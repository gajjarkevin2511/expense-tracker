import axios from 'axios';

class APICaller {
    constructor(headers = {}) {
        /**
         * @param {Object} headers - Optional headers to include in every request
         */
        this.baseUrl = 'http://localhost:3001'; // Replace with your API base URL
        this.headers = {
            ...headers,
        };
        this.isRefreshing = false;
        this.failedRequestsQueue = [];

        this.axiosInstance = axios.create({
            baseURL: this.baseUrl,
            headers: this.headers,
            withCredentials: true,
        });
    }

    async get(endpoint, params = {}) {
        /**
         * @param {string} endpoint - The API endpoint to call (e.g., "/users")
         * @param {Object} params - Optional query parameters
         * @returns {Promise<Object>} - Response data or an error object
         */
        try {
            const response = await this.axiosInstance.get(endpoint, { params });
            return response;
        } catch (error) {
            throw error;
        }
    }

    async post(endpoint, data, customHeaders = {}) {
        /**
         * @param {string} endpoint - The API endpoint to call (e.g., "/users")
         * @param {Object} data - Data to send in the request body
         * @returns {Promise<Object>} - Response data or an error object
         */
        try {
            const response = await this.axiosInstance.post(endpoint, data, {
                headers: { ...this.headers, ...customHeaders },
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

    async put(endpoint, data, customHeaders = {}) {
        /**
         * @param {string} endpoint - The API endpoint to call (e.g., "/users/1")
         * @param {Object} data - Data to send in the request body
         * @returns {Promise<Object>} - Response data or an error object
         */
        try {
            const response = await this.axiosInstance.put(endpoint, data, {
                headers: { ...this.headers, ...customHeaders },
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

    async delete(endpoint) {
        /**
         * @param {string} endpoint - The API endpoint to call (e.g., "/users/1")
         * @returns {Promise<Object>} - Response data or an error object
         */
        try {
            const response = await this.axiosInstance.delete(endpoint);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export const api = new APICaller();
