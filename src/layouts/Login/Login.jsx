import PropTypes from 'prop-types'
import React, { Component } from 'react'
import connect from 'react-redux/es/connect/connect'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import UnauthorizedRoute from '../../components/UnauthorizedRoute/UnauthorizedRoute'
import {
	createErrorMessageSelector,
	createLoadingSelector
} from '../../store/utils/selectors'
import LoginForm from '../../views/LoginForm/LoginForm'
import SignUpForm from '../../views/SignUpForm/SignUpForm'
import './login.scss'
class Login extends Component {

	render() {
		return (
			<div className="login-page">
				<Switch>
					<Route exact path={'/auth/login'} render={LoginForm} />
					<UnauthorizedRoute
						path={'/auth/sign-up'}
						component={SignUpForm}
					/>
					<Redirect to={'/auth/login'} />
				</Switch>
			</div>
		)
	}
}

Login.propTypes = {
	isLoading: PropTypes.bool.isRequired
}

const loadingSelector = createLoadingSelector(['LOGIN'])
const errorSelector = createErrorMessageSelector(['LOGIN'])

const mapStateToProps = state => {
	return {
		isLoading: loadingSelector(state),
		error: errorSelector(state)
	}
}

const ConnectedLogin = connect(
	mapStateToProps,
	null
)(Login)

export default withRouter(ConnectedLogin)
