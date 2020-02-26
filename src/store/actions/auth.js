import * as actionTypes from './actionTypes';
import axios from 'axios';

const authStart = () => ({
    type: actionTypes.AUTH_START
});
const authSuccess = (token, userId) => {
    return {
        type   : actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId : userId
    };
};
const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const success = c => {
            localStorage.setItem('token', c.data.idToken);
            localStorage.setItem('userId', c.data.localId);
            const expirationDate = new Date(new Date().getTime() + c.data.expiresIn * 1000);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(c.data.idToken, c.data.localId));
            dispatch(checkAuthTimeout(c.data.expiresIn));
        };
        const fail = e => dispatch(authFail(e.response.data.error));
        if (!isSignUp)
            axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyD8zHmX2zCjQght95JeuGtxKQCbsQC0SvM',
                {
                    email,
                    password,
                    returnSecureToken: true
                })
                .then(success)
                .catch(fail);
        else
            axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyD8zHmX2zCjQght95JeuGtxKQCbsQC0SvM',
                {
                    email,
                    password,
                    returnSecureToken: true
                })
                .then(success)
                .catch(fail);
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        }
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            const userId = localStorage.getItem('userId');
            if (expirationDate <= new Date())
                dispatch(logout());
            else {
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};
