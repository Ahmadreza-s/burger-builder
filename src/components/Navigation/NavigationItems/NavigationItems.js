import React from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ({isAuthenticated, closeSideDrawer}) =>
    (
        <ul className={styles.NavigationItems}>
            <NavigationItem closeSideDrawer={closeSideDrawer} link='/' exact>
                Burger Builder
            </NavigationItem>

            {
                isAuthenticated &&
                <NavigationItem closeSideDrawer={closeSideDrawer} link='/orders'>
                    Orders
                </NavigationItem>
            }

            {
                !isAuthenticated ?
                    <NavigationItem closeSideDrawer={closeSideDrawer} link='/auth'>
                        Authenticate
                    </NavigationItem>
                    :
                    <NavigationItem link='/logout'>
                        Logout
                    </NavigationItem>
            }
        </ul>
    );

export default navigationItems;
