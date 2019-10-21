import React, { Component } from 'react';
import { Route, Router, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './App.css';
import 'react-toastify/dist/ReactToastify.css'
import { connect } from 'react-redux';
import history from './history'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import User from './layouts/User/User'
import Login from './layouts/Login/Login'
import { readPasswordCriteria } from './views/User/scenario-actions'

class App extends Component {
	componentDidMount(){
		this.props.readPasswordCriteria()
	}

	render() {
		return (
			<div className="App">
				<React.Fragment>
					<Router history={history}>
						<Switch>
							<ProtectedRoute path={'/'} exact component={User} />
							<ProtectedRoute path={'/user'} component={User} />
							<Route path={'/auth'} component={Login} />
							<Route path="/notFound" render={() => (<div> Not Found</div>)} />
							<Route path="*" render={() => (<div>Page Not Found</div>)} />
						</Switch>
					</Router>
					<ToastContainer />
				</React.Fragment>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	...state
})

const mapDispatchToProps = dispatch => ({
	readPasswordCriteria: () => dispatch(readPasswordCriteria()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);