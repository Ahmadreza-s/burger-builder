import React, {Component} from 'react';
import styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

class Layout extends Component {

    state = {
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    };
    sideDrawerOpenedHandler = () => {
        this.setState({showSideDrawer: true});
    };

    render() {
        return (
            <>
                <Toolbar isAuthenticated={this.props.isAuthenticated}
                         menuClick={this.sideDrawerOpenedHandler}/>

                <SideDrawer isAuthenticated={this.props.isAuthenticated}
                            visible={this.state.showSideDrawer}
                            backdropClick={this.sideDrawerClosedHandler}/>

                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: !!state.auth.token //true or false
    };
};

export default connect(mapStateToProps)(Layout);
