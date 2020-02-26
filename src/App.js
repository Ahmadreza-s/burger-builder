import React, {Suspense, Component} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from './store/actions/';

import Spinner from './components/UI/Spinner/Spinner';
import Layout from './components/Layout/Layout';
const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
const BurgerBuilder = React.lazy(() => import('./containers/BurgerBuilder/BurgerBuilder'));
const Orders = React.lazy(() => import('./containers/Orders/Orders'));
const Auth = React.lazy(() => import('./containers/Auth/Auth'));
const Logout = React.lazy(() => import('./containers/Auth/Logout/Logout'));

class App extends Component {

    componentDidMount() {
        this.props.onCheckAuth();
    }

    render() {
        let routes = (<Switch>
            <Route path="/auth" render={() => (
                <Suspense fallback={<Spinner/>}>
                    <Auth/>
                </Suspense>
            )}/>
            <Route path="/" exact render={() => (
                <Suspense fallback={<Spinner/>}>
                    <BurgerBuilder/>
                </Suspense>
            )}/>
            <Redirect to="/"/>
        </Switch>);
        if (this.props.isAuthenticated) {
            routes = (<Switch>
                <Route path="/checkout" render={() => (
                    <Suspense fallback={<Spinner/>}>
                        <Checkout/>
                    </Suspense>
                )}/>
                <Route path="/orders" render={() => (
                    <Suspense fallback={<Spinner/>}>
                        <Orders/>
                    </Suspense>
                )}/>
                <Route path="/auth" render={() => (
                    <Suspense fallback={<Spinner/>}>
                        <Auth/>
                    </Suspense>
                )}/>
                <Route path="/logout" render={() => (
                    <Suspense fallback={<Spinner/>}>
                        <Logout/>
                    </Suspense>
                )}/>
                <Route path="/" exact render={() => (
                    <Suspense fallback={<Spinner/>}>
                        <BurgerBuilder/>
                    </Suspense>
                )}/>
            </Switch>);
        }
        return (
            <Layout>
                {routes}
            </Layout>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
    onCheckAuth: () => dispatch(actions.authCheckState())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
