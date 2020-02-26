import React, {Component} from 'react';
import Input from "../../components/UI/Input/Input";
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import styles from './Auth.module.css';
import * as actions from '../../store/actions/';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {checkValidity} from "../../shared/utility";

class Auth extends Component {
    initializeForm = (placeholder, elementType = 'input', type = 'text', value = '', validation) => {
        return {
            elementType: elementType,
            elementConfig: {
                type: type,
                placeholder: placeholder
            },
            value: value,
            validation: validation,
            valid: false,
            touched: false,
            autocomplete: 'off'
        };
    };

    state = {
        controls: {
            email: this.initializeForm('Email', 'input', 'email', '', {
                errorMsg: `Please enter a valid Email`,
                required: true,
                isEmail: true
            }),
            password: this.initializeForm('Password', 'input', 'password', '', {
                errorMsg: `Please enter a valid Password`,
                required: true,
                minLength: 6
            })

        },
        isSignUp: true
    };


    btnIsDisabled() {
        let isValid = true;
        Object.entries(this.state.controls).forEach(([, value]) => {
            if ('valid' in value && !value.valid)
                isValid = false;
        });
        return isValid;
    }

    inputChangeHandler = (id, event) => {
        const updatedForm = {...this.state.controls};
        const updatedFormElement = {...updatedForm[id]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(event.target.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedForm[id] = updatedFormElement;
        this.setState({controls: updatedForm});
    };

    loginHandler = (e) => {
        e.preventDefault();
        const {email, password} = this.state.controls;
        this.props.onLogin(email.value, password.value, this.state.isSignUp);
    };

    switchAuthModeHandler = e => {
        e.preventDefault();
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            };
        });
    };

    render() {
        let hasIngredients = false;
        if (this.props.ingredients) {
            Object.entries(this.props.ingredients).map(([, value]) => {
                if (value > 0)
                    hasIngredients = true;
                return value;
            });
        }
        let sumbitBtn = <Spinner/>;
        if (!this.props.loading)
            sumbitBtn = <Button type="Success"
                                disabled={!this.btnIsDisabled()}>Submit</Button>;

        let errorMessage = null;
        if (this.props.error)
            errorMessage = <p style={{color: 'red'}}>{this.props.error.message}</p>;
        return (
            <>
                {
                    !this.props.isAuthenticated ?
                        <div className={styles.Auth}>
                            {errorMessage}
                            <h3>{this.state.isSignUp ? 'Sign Up' : 'Sign In'}</h3>
                            <form onSubmit={this.loginHandler}>
                                {
                                    Object.entries(this.state.controls).map(([name, config]) =>
                                        <Input changed={(e) => this.inputChangeHandler(name, e)}
                                               onBlur={(e) => this.inputChangeHandler(name, e)}
                                               key={name}
                                               {...config}/>)
                                }
                                {sumbitBtn}
                            </form>
                            <Button disabled={this.props.loading}
                                    type="Danger"
                                    clicked={this.switchAuthModeHandler}>
                                {this.state.isSignUp ? 'SWITCH TO SIGN IN MODE' : 'SWITCH TO SIGN UP MODE'}
                            </Button>
                        </div>
                        :
                        hasIngredients
                            ?
                            <Redirect to='/checkout'/>
                            :
                            <Redirect to='/'/>
                }
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: !!state.auth.token,
        ingredients: state.burgerBuilder.ingredients
    };
};

const mapDispatchToProps = dispatch => ({
    onLogin: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
