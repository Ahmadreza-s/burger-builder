import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import styles from './CheckoutSummary.module.css';

const checkoutSummary = props => {
    return (
        <div className={styles.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
                <Button clicked={props.checkoutCancelled}
                        type="Danger">
                    CANCEL
                </Button>
                <Button type="Success"
                        clicked={props.checkoutContinued}>
                    CONTINUE
                </Button>
            </div>
        </div>
    );
};

export default checkoutSummary;
