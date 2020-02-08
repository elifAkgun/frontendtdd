import axios from 'axios';
import * as apiCalls from './apiCalls';

describe('apiCalls', () => {

    describe('signup',()=>{

        it('calls /v1/api/users', ()=>{
            const mocksignupFunction= jest.fn();
            axios.post= mocksignupFunction;
            apiCalls.signup();

           const path = mocksignupFunction.mock.calls[0][0];
           expect(path).toBe('/v1/api/users')
        });

    });

    describe('login',()=>{

        it('calls /v1/api/login', ()=>{
            const mockLoginunction= jest.fn();
            axios.post= mockLoginunction;
            apiCalls.login({username: 'test-user', password:'my-passwoP3rd'});

           const path = mockLoginunction.mock.calls[0][0];
           expect(path).toBe('/v1/api/login')
        });

    });
});

