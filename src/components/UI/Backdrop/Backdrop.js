import React from 'react';
import styles from './backdrop.module.css';

const backdrop = ({show, clicked}) =>
    show ? <div className={styles.Backdrop}
                onClick={clicked}
    /> : null;


export default backdrop;
