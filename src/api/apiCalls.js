import axios from 'axios';

export const signUp = (user) => { 
    return axios.post('/v1/api/users', user);
}; 

export const login = (user) => { 
   return axios.post('/v1/api/login', {},{auth: user});  
}; 

