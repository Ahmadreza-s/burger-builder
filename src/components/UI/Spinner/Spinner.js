import React from 'react';

import styles from './spinner.module.css';

const spinner = () => {
    return (
        <div style={{
            display       : 'flex',
            justifyContent: 'center',
            alignItems    : 'center'
        }}>
            <div className={styles.LdsHourglass}/>
        </div>
    );
};

export default spinner;
