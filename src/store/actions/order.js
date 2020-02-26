import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type   : actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData
    };
};

const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error
    };
};

const purchaseBurgerStart = () => ({
    type: actionTypes.PURCHASE_BURGER_START
});
export const purchaseBurger = (orderData) => {
    return (dispatch, getState) => {
        dispatch(purchaseBurgerStart());
        const token = getState().auth.token || '';
        axios.post(`orders.json?auth=${token}`, orderData).then(c => {
            dispatch(purchaseBurgerSuccess(c.data.name, orderData));
        }).catch(e => {
            dispatch(purchaseBurgerFail(e));
        });
    };
};

export const purchaseInit = () => ({
    type: actionTypes.PURCHASE_INIT
});

const fetchOrdersSuccess = (orders) => ({
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders
});

const fetchOrdersFail = (error) => {
    return ({
        type: actionTypes.FETCH_ORDERS_FAIL,
        error
    });
};

const fetchOrdersStart = () => ({
    type: actionTypes.FETCH_ORDERS_START
});

export const fetchOrders = () => {
    return (dispatch, getState) => {
        dispatch(fetchOrdersStart());
        const token = getState().auth.token || '';
        const userId = getState().auth.userId || '';
        axios.get(`/orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`).then(({data}) => {
            const fetchedOrders = [];
            if (data)
                Object.entries(data).map(([key, order]) => {
                    fetchedOrders.push({
                        ...order,
                        id: key
                    });
                    return fetchedOrders;
                });
            dispatch(fetchOrdersSuccess(fetchedOrders));
        }).catch(err => dispatch(fetchOrdersFail(err)));
    };
};
