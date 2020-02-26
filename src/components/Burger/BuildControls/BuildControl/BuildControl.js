import React from 'react';
import styles from './BuildControl.module.css';

const buildControl = ({label, disabled, added, removed}) => {
    return (
        <div className={styles.BuildControl}>
            <div className={styles.Label}>{label}</div>
            <button onClick={removed}
                    disabled={disabled}
                    className={styles.Less}>Less
            </button>
            <button onClick={added}
                    className={styles.More}>More
            </button>
        </div>
    );
};

export default buildControl;
