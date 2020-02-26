import React from 'react';
import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = ({ingredients}) => {
    let transFormedIngredients = Object.keys(ingredients)
        .map(igKey =>
            [...Array(ingredients[igKey])]
                .map((_, i) => <BurgerIngredient key={igKey + i} type={igKey}/>))
        .flat();

    if (transFormedIngredients.length === 0)
        transFormedIngredients = <p>Please start adding Ingredients!</p>;
    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transFormedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;
