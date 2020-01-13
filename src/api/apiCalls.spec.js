import axios from 'axios';
import * as apiCalls from './apiCalls';

describe('apiCalls', () => {

    describe('signup',()=>{

        it('calls /v1/api/users', ()=>{
            const mockSignupFunction= jest.fn();
            axios.post= mockSignupFunction;
            apiCalls.signUp();

           const path = mockSignupFunction.mock.calls[0][0];
           expect(path).toBe('/v1/api/users')
        });

    });

});

