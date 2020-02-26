import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        ingredientName: name,
        type          : actionTypes.ADD_INGREDIENTS
    };
};

export const removeIngredient = (name) => {
    return {
        ingredientName: name,
        type          : actionTypes.REMOVE_INGREDIENT
    };
};

const setIngredients = ingredients => {
    return {
        ingredients,
        type: actionTypes.SET_INGREDIENTS
    };
};
const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
};

export const initIngredients = () => {
    return dispatch => {
        axios.get('ingredients.json').then(({data}) => {
            dispatch(setIngredients(data));
        }).catch(e => {
            dispatch(fetchIngredientsFailed());
        });
    };
};
