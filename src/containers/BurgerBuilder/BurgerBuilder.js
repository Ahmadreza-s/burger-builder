import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import {connect} from "react-redux";
import * as actions from '../../store/actions/';
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from '../../axios-orders';

class BurgerBuilder extends Component {
    state = {
        ingredients: [],
        totalPrice : 4,
        purchasing : false
    };

    componentDidMount() {
        this.props.onInitIngredients();
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated)
            this.setState({purchasing: true});
        else
            this.props.history.push('/auth');
    };

    purchaseCancelHandler = () => this.setState({purchasing: false});

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        return this.props.history.push('/checkout');
    };

    render() {
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;
        if (this.props.ingredients) {
            const disabledInfo = {};
            for (const [type, count] of Object.entries(this.props.ingredients))
                disabledInfo[type] = count <= 0;

            const valueArray = Object.entries(this.props.ingredients).map(c => c[1]).flat();
            let sum = 0;
            for (let index = 0, length = valueArray.length; index < length; sum += valueArray[index++]) ;

            burger = (<>
                <Burger ingredients={this.props.ingredients}/>
                <BuildControls
                    price={this.props.totalPrice}
                    purchasable={sum > 0}
                    disabledInfo={disabledInfo}
                    ingredientAdded={this.props.onAddIngredient}
                    ingredientRemoved={this.props.onRemoveIngredient}
                    ordered={this.purchaseHandler}
                    isAuthenticated={this.props.isAuthenticated}
                />
            </>);
            orderSummary =
                <OrderSummary
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    ingredients={this.props.ingredients}
                    price={this.props.totalPrice}/>;
        }


        return (
            <React.Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <React.Fragment>
                    {burger}
                </React.Fragment>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients    : state.burgerBuilder.ingredients,
        totalPrice     : state.burgerBuilder.totalPrice,
        error          : state.burgerBuilder.error,
        isAuthenticated: !!state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient   : (key) => dispatch(actions.addIngredient(key)),
        onRemoveIngredient: (key) => dispatch(actions.removeIngredient(key)),
        onInitIngredients : () => dispatch(actions.initIngredients()),
        onInitPurchase    : () => dispatch(actions.purchaseInit())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));
