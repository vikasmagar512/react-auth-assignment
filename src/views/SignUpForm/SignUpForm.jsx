import { object, func } from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, withRouter, Redirect } from 'react-router-dom'
import EmailInfoSubForm from './EmailInfoSubForm/EmailInfoSubForm'

import UnauthorizedRoute from '../../components/UnauthorizedRoute/UnauthorizedRoute'
import EmailEntered from './EmailEntered/EmailEntered'
import { removeAuthError } from './scenario-actions'

import './sign-up-form.scss'

class SignUpForm extends Component {
	basePath = '/auth/sign-up'

	componentDidMount() {
		this.props.removeAuthError()
	}

	render() {
		return (	
			<div className={'signup-form-page--content'}>
				<div className={'sign-up-form'}>
					<Switch>
						<UnauthorizedRoute
							exact
							path={`${this.basePath}/email-reset`}
							component={EmailEntered}
						/>								
						<UnauthorizedRoute path={this.basePath} component={EmailInfoSubForm} />
						<Redirect to={`${this.basePath}`} />
					</Switch>
				</div>
			</div>
		)
	}
}

SignUpForm.propTypes = {
	location: object.isRequired,
	removeAuthError: func.isRequired,
}


const mapDispatchToProps = dispatch => {
	return {
		removeAuthError: () => dispatch(removeAuthError())
	}
}

export default connect(
	null,
	mapDispatchToProps
)(withRouter(SignUpForm))
