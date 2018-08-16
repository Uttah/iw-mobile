import apisauce from 'apisauce';

const create = (baseURL = 'http://icoworld.projects.oktend.com:3000/') => {
    const api = apisauce.create({
        baseURL,
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        },
        timeout: 10000
    });

    const init = async(identifier, password) => { 
        //api.setHeaders({Authorization: ''});

        const response = await api.post('/login', { 
            email: identifier, 
            password: password 
        });

        if (response.ok) {
            return response.data;
            // api.setHeaders({
            //     'Authorization': `Bearer ${response.data.jwt}`
            // });
        } else {
            throw new Error(response.problem);
        }
    };

    return {
        init
    };
};

export default create();