import React from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = ({ingredients, purchaseCanceled, purchaseContinued, price}) => {

    return (
        <React.Fragment>
            <h3>Your Order</h3>
            <p>
                A delicious burger with the following ingredients :
            </p>
            <ul>
                {
                    Object.entries(ingredients).map(([key, value], i) =>
                        <li key={key + i}><span style={{textTransform: 'capitalize'}}>{key}</span> : {value}</li>
                    )
                }
            </ul>
            <strong>{`Current Price : ${price.toFixed(2)}$`}</strong>
            <p>Continue to Checkout?</p>
            <hr/>
            <Button type="Danger" clicked={purchaseCanceled}>Cancel</Button>
            <Button type="Success" clicked={purchaseContinued}>Continue</Button>
        </React.Fragment>
    );
};


export default orderSummary;
