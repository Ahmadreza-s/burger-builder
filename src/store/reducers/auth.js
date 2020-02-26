import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token  : null,
    userId : null,
    error  : null,
    loading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.AUTH_START:
        return {
            ...state,
            loading: true,
            token  : null,
            userId : null,
            error  : null
        };

    case actionTypes.AUTH_SUCCESS:
        return {
            ...state,
            loading: false,
            token  : action.idToken,
            userId : action.userId
        };

    case actionTypes.AUTH_FAIL:
        return {
            ...state,
            loading: false,
            error  : action.error
        };
    case actionTypes.AUTH_LOGOUT:
        return {
            ...state,
            token : null,
            userId: null
        };

    default:
        return state;
    }
};

export default reducer;
