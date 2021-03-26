import axios from 'axios';

 const url = "https://my-json-server.typicode.com/tractian/fake-api"

 const instance = axios.create({
     baseURL: url,
 });
 
 export default instance;
 