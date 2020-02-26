import React from 'react';
import logoPng from '../../assets/images/burger-logo.png';
import styles from './Logo.module.css';


const logo = props => {
    return (
        <div className={styles.Logo}>
            <img src={logoPng} alt='Burger Logo'/>
        </div>
    );
};


export default logo;
