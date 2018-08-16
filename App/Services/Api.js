// a library to wrap and simplify api calls
import apisauce from 'apisauce'

const create = (baseURL = 'http://icoworld.projects.oktend.com:3000') => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    },
    timeout: 10000
  })

  const init = async(login, password) => { 
    api.setHeaders({Authorization: ''});

    const response = await api.post('/', { 
      email: login, 
      password: password 
    });

    if (response.ok) {
      api.setHeaders({
        'Authorization': `Bearer ${response.data.jwt}`
      });
    } else {
      throw new Error('forgot to start mongo & strapi? ' + response.problem);
    }
  };

  return {
    init
  }
}

export default create();
const api = new Api();