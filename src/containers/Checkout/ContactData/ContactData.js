import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.module.css';

import axios from '../../../axios-orders';
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/';
import {checkValidity} from "../../../shared/utility";

class ContactData extends Component {

    orderHandler = (e) => {
        e.preventDefault();
        let formData = {};
        Object.entries(this.state.orderForm).forEach(([name, {value}]) => formData[name] = value);
        const data = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData,
            userId: this.props.userId
        };
        this.props.onOrderBurger(data);

    };

    inputChangeHandler = (id, event) => {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedFormElement = {...updatedOrderForm[id]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(event.target.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[id] = updatedFormElement;
        this.setState({orderForm: updatedOrderForm});
    };

    btnIsDisabled() {
        let isValid = true;
        Object.entries(this.state.orderForm).forEach(([, value]) => {
            if ('valid' in value && !value.valid)
                isValid = false;
        });
        return isValid;
    }

    render() {
        return (
            <React.Fragment>
                <div className={styles.ContactData}>
                    <h4>Enter your Contact Data</h4>
                    <form onSubmit={this.orderHandler}>
                        {
                            Object.entries(this.state.orderForm).map(([name, config]) =>
                                <Input changed={(e) => this.inputChangeHandler(name, e)}
                                       onBlur={(e) => this.inputChangeHandler(name, e)}
                                       key={name}
                                       {...config}/>)
                        }
                        {
                            this.props.loading ? <Spinner/> :
                                <Button type="Success"
                                        disabled={!this.btnIsDisabled()}>ORDER</Button>
                        }

                    </form>
                </div>
            </React.Fragment>
        );
    }

    initializeForm = (placeholder, elementType = 'input', type = 'text', value = '') => {
        return {
            elementType: elementType,
            elementConfig: {
                type: type,
                placeholder: placeholder
            },
            value: value,
            validation: {
                required: true,
                errorMsg: `Please enter a valid ${placeholder}`
            },
            valid: false,
            touched: false
        };
    };

    state = {
        orderForm: {
            name: this.initializeForm('Name'),
            street: this.initializeForm('Street'),
            zipCode: {
                ...this.initializeForm('ZIP Code'),
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                }
            },
            country: this.initializeForm('Country'),
            email: this.initializeForm('E-mail', 'input', 'email'),
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'cheapest',
                validation: {}
            }
        }
    };

}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        userId: state.auth.userId
    };

};
const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
