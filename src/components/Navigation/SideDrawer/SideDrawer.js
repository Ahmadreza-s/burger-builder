import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = ({visible, backdropClick, isAuthenticated}) => {
    const attachedClasses = [styles.SideDrawer];
    attachedClasses.push(visible ? styles.Open : styles.Close);
    return (
        <React.Fragment>
            <Backdrop show={visible} clicked={backdropClick}/>
            <div className={attachedClasses.join(' ')}>
                <div className={styles.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems closeSideDrawer={backdropClick} isAuthenticated={isAuthenticated}/>
                </nav>
            </div>
        </React.Fragment>
    );
};


export default sideDrawer;
