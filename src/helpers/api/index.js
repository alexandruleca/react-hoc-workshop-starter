class WebApi {
    constructor() {
        this.baseUrl = 'https://reqres.in/api';
    }

    get(url) {
        return new Promise((resolve, reject) => {
            fetch(`${this.baseUrl}${url}`, {method: "GET"})
                .then(res => res.json())
                .then(json => resolve(json))
                .catch((err) => {reject(err)})
        });
    }
}

const api = new WebApi();

export default api;