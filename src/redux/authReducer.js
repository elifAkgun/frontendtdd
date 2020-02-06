import { act } from "react-dom/test-utils";

const initialState = {
    id: 0,
    username: '',
    displayname: '',
    image: '',
    password: '',
    isLoggedIn: false
};



export default function authReducer(state = initialState, action) {
    if (action.type === 'logout-success') {
        return { ...initialState }
    }

    if (action.type === 'login-success') {
        return {
            ...action.payload,
            isLoggedIn: true
        }
    } 
    return state;
}
