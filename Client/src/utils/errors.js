class ErrorHandler {
    /**
     * Handles errors and returns a user-friendly message.
     * @param {Error|AxiosError} error - The error object.
     * @returns {string} - A user-friendly error message.
     */
    static handleError(error) {
        if (this.isAxiosError(error)) {
            return this.handleAxiosError(error);
        } else if (error instanceof Error) {
            return this.handleNormalError(error);
        } else {
            return 'An unknown error occurred.';
        }
    }

    /**
     * Checks if the error is an Axios error.
     * @param {Error|AxiosError} error - The error object.
     * @returns {boolean} - True if the error is an Axios error, false otherwise.
     */
    static isAxiosError(error) {
        return error.isAxiosError;
    }

    /**
     * Handles Axios errors and returns a user-friendly message.
     * @param {AxiosError} error - The Axios error object.
     * @returns {string} - A user-friendly error message.
     */
    static handleAxiosError(error) {
        if (error?.code === 'ERR_NETWORK') {
            return 'Please check your internet connection.';
        } else if (error?.response) {
            const data = error.response.data;

            if (Array.isArray(data?.errors) && data.errors.length > 0) {
                return data.errors.join('; ');
            }

            if (typeof data?.message === 'string') {
                return data.message;
            }

            return 'Something went wrong on the server.';
        } else if (error?.request) {
            return 'No response from the server. Please try again later.';
        } else {
            return error.message || 'An unexpected error occurred.';
        }
    }

    /**
     * Handles normal (non-Axios) errors and returns a user-friendly message.
     * @param {Error} error - The error object.
     * @returns {string} - A user-friendly error message.
     */
    static handleNormalError(error) {
        return error.message || 'An error occurred.';
    }
}

export default ErrorHandler;
