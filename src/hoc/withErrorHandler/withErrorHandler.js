import React from 'react';
import Modal from '../../components/UI/Modal/Modal';


const withErrorHandler = (WrapperComponent, axios) => {
    return class extends React.Component {

        state = {
            error: null
        };

        reqInterceptor = null;
        resInterceptor = null;

        constructor(props) {
            super(props);
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => this.setState({error: error}));
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        clearErrorHandler = () => {
            this.setState({error: null});
        };

        render() {
            return (
                <React.Fragment>
                    <Modal show={this.state.error}
                           modalClosed={this.clearErrorHandler}>
                        {
                            this.state.error &&
                            <p>
                                {this.state.error.message}
                            </p>
                        }

                    </Modal>
                    <WrapperComponent {...this.props}/>
                </React.Fragment>
            );
        }
    };
};


export default withErrorHandler;
