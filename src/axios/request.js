import axios from 'axios';
const request=axios.create({
    baseURL:'/',
    timeout:2000
})
export default request;