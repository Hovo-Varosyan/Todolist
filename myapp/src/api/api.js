import axios from "axios";

const server=axios.create({
    withCredentials:true,
    baseURL:'http://localhost:8080',
    method:'get'
})

export default server