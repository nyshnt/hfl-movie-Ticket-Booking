import axios from 'axios';

const instance = axios.create({
    baseURL: "http://localhost:4000/api/",
});

instance.defaults.headers.common["Content-Type"] = "application/json";

instance.interceptors.request.use(
    request => {
        // request.headers.common['authkey'] = "p3to7Vf2R76pvesGajKnFL4frYwhtc";
        return request;
    },
    error => {
        return Promise.reject(error);
    }
);


instance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);


export default instance;