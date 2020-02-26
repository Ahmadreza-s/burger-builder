import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/';

class Logout extends Component {

    componentDidMount() {
        this.props.onLogout();
    }

    render() {
        return (
            <div>
                <Redirect to='/'/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    onLogout: () => dispatch(actions.logout())
});

export default connect(null, mapDispatchToProps)(Logout);
