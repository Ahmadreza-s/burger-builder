import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders : null,
        loading: true
    };

    componentDidMount() {
        this.props.onFetchOrders();
    }

    render() {
        let orders = null;
        if (!this.props.loading && !this.props.orders.length)
            orders = <h2>There are no orders</h2>;
        else if (!this.props.loading && this.props.orders)
            orders = this.props.orders.map(order => <Order key={order.id} {...order}/>);
        else
            orders = <Spinner/>;
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    };
};
const mapStateToProps = state => {
    return {
        loading: state.order.loading,
        orders : state.order.orders
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
