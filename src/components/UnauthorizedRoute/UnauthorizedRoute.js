import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import PropTypes from 'prop-types'

import {
	isAuthenticatedSelector
} from '../../store/user/selectors'

const UnauthorizedRoute = ({ component: Component, ...rest }) => {
	const { isAuthenticated } = rest

	return (
		<Route
			{...rest}
			render={props => {
				if (isAuthenticated) {
					return <Redirect push to={'/'} />
				}
				return <Component {...props} />
			}}
		/>
	)
}

UnauthorizedRoute.propTypes = {
	component: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
	isAuthenticated: isAuthenticatedSelector(state),
})

export default compose(
	withRouter,
	connect(mapStateToProps)
)(UnauthorizedRoute)
