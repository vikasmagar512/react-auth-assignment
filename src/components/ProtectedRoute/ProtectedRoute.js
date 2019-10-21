import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import {
	isAuthenticatedSelector
} from '../../store/user/selectors'

const ProtectedRoute = ({ component: Component, ...rest }) => {
	const { isAuthenticated } = rest
	return (
		<Route
			{...rest}
			render={props => {
				if (isAuthenticated) {
					return <Component {...props} />
				}
				return (
					<Redirect
						push
						to={{
							pathname: '/auth/login',
							state: { from: props.location, warning: true }
						}}
					/>
				)
			}}
		/>
	)
}

ProtectedRoute.propTypes = {
	component: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
	return {
		isAuthenticated: isAuthenticatedSelector(state),
	}
}

const ConnectedProtectedRoute = connect(
	mapStateToProps,
	null
)(ProtectedRoute)

export default ConnectedProtectedRoute
