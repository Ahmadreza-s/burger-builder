import React from 'react';
import styles from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = ({menuClick, isAuthenticated}) => {
    return (
        <header className={styles.Toolbar}>
            <div className={styles.DrawerToggle} onClick={menuClick}>
                <div/>
                <div/>
                <div/>
            </div>
            <div className={styles.Logo}>
                <Logo/>
            </div>
            <nav className={styles.DesktopOnly}>
                <NavigationItems isAuthenticated={isAuthenticated}/>
            </nav>
        </header>
    );
};


export default toolbar;
