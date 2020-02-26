import React from 'react';
import styles from './Order.module.css';

const order = props => {
    const ingredients = Object.entries(props.ingredients).map(([key, value], i) =>
        <span key={key}
              style={{
                  textTransform: 'capitalize',
                  display: 'inline-block',
                  margin: '0 8px',
                  border: '1px solid #ccc',
                  padding: '5px',
                  borderRadius: '5px'
              }}>{key} : {value}</span>);
    return (
        <div className={styles.Order}>
            <p>Ingredients: {ingredients}</p>
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    );
};


export default order;
