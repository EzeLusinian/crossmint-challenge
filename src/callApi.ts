const endpointBase = 'https://challenge.crossmint.io/api';

interface ResponseProps {
    data: any
    error: boolean
}

export const callApi = async (
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    endpoint: string,
    dataApi?: any
) => {

    let response: ResponseProps = {
        data: null,
        error: false
    };

    try {

        await fetch(endpointBase + endpoint, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataApi)
        }).then(async (responseApi) => {

            const data = await responseApi.json();
            const status = responseApi.status;

            console.log({ row: dataApi?.row, column: dataApi?.column, status, data })

            if (status === 429) {
                // if i receive a status 429, I wait 5 seconds to retry.
                await new Promise((resolve) => setTimeout(resolve, 5000));
                return callApi(method, endpoint, dataApi);
            }

            response.data = data;
            response.error = status !== 200;

        }).catch((error) => {

            console.log(error);

            response.data = error;
            response.error = true;

        });

    }

    catch (error) {

        response.data = { msg: 'An error occurred while communicating with the API.' };
        response.error = true;

    }

    return response;

};