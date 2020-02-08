import axios from 'axios';

export const signup = (user) => { 
    return axios.post('/v1/api/users', user);
}; 

export const login = (user) => { 
   return axios.post('/v1/api/login', {},{auth: user});  
}; 

