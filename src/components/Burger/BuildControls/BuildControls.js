import React from 'react';
import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];
const buildControls = ({
                           price,
                           purchasable,
                           disabledInfo,
                           ingredientAdded,
                           ingredientRemoved,
                           ordered,
                           isAuthenticated
                       }) => {
    return (
        <div className={styles.BuildControls}>
            <p>
                <strong>Current Price : {price.toFixed(2)}</strong>
            </p>
            {
                controls.map(
                    ctrl =>
                        <BuildControl
                            label={ctrl.label}
                            key={ctrl.label}
                            disabled={disabledInfo[ctrl.type]}
                            added={() => ingredientAdded(ctrl.type)}
                            removed={() => ingredientRemoved(ctrl.type)}
                        />
                )
            }
            <button disabled={!purchasable}
                    className={styles.OrderButton}
                    onClick={ordered}>
                {isAuthenticated ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
            </button>
        </div>
    );
};


export default buildControls;
