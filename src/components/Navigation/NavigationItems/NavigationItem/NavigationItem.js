import React from 'react';
import styles from './NavigationItem.module.css';
import {NavLink} from 'react-router-dom';

const navigationItem = ({link, exact, children, closeSideDrawer}) =>
    (
        <li className={styles.NavigationItem} onClick={closeSideDrawer}>
            <NavLink exact={exact} activeClassName={styles.active} to={link}>{children}</NavLink>
        </li>
    );

export default navigationItem;
