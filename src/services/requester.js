export const request = async (url, method, data, accessToken) => {

    const options = {};

    if (method !== 'GET') {
        options.method = method

        if (data) {
            options.headers = {
                'content-type': 'application/json',
            }
            options.body = JSON.stringify(data);
        }

        if (accessToken) {
            options.headers = {
                ...options.headers,
                'X-Authorization': accessToken,
                
            };
        }
    }


    const response = await fetch(url, options);

    if (response.status === 204) {
        return {};
    }

    const result = await response.json()

    if (!response.ok) {
        return { status: response.status, message: result.message };
    }

    return result;
};