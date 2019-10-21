import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { LOGIN_EMAIL, LOGIN_PASSWORD, PASSWORD_EYE_ICON } from '../../assets/Icons'
import {
	createErrorMessageSelector,
	createLoadingSelector,
	needsLoginMessageSelector
} from '../../store/utils/selectors'
import {
	resetPassword,
} from './scenario-actions'
import './login-form.scss'
import { login, removeAuthError } from './scenario-actions'
import { cleanLoginMessage } from '../../store/auth/actions'
import { clearError as clearLogoutError } from '../../store/user/actions'
import ErrorPanel from '../../components/ErrorPanel/ErrorPanel'
import { errorSelector as logoutErrorSelector } from '../../store/user/selectors'
import { Button } from 'react-bootstrap'
import history from '../../history'

require('formdata-polyfill')

class LoginForm extends Component {
	state = {
		inputType:'password',
		authError: 'Please log in!',
		interval: 0
	}

	componentDidMount() {
		this.props.removeAuthError()
		const interval = setInterval(() => {
			this.clearError()
		}, 5000)
		this.setState({ interval })
	}

	static getDerivedStateFromProps({ logoutError }) {
		if (logoutError) {
			return {
				authError: logoutError
			}
		}
		return null
	}

	componentDidUpdate(prevProps) {
		if (!this.props.logoutError && prevProps.logoutError !== this.props.logoutError) {
			clearInterval(this.state.interval)
		}
	}

	componentWillUnmount() {
		clearInterval(this.state.interval)
	}
	togglePassword=(e)=>{
		e.preventDefault();
		e.stopPropagation();
		this.setState({
			inputType: this.state.inputType === 'input' ? 'password' : 'input'
		})  
	}
	

	clearError = () => {
		clearInterval(this.state.interval)
		this.props.clearLogoutError()
	}
	
	openSignUp=()=>{
		history.push('/auth/sign-up/email')
	}
	handleSubmit = e => {
		e.preventDefault()
		const data = new FormData(e.target)
		const { from } = this.props.location.state || { from: { pathname: '/' } }

		const email = data.get('email')
		const password = data.get('password')
		this.props.login({ email, password }, from)
	}
	forgotPassword=()=>{
		const { from } = this.props.location.state || { from: { pathname: '/' } }
		const email = document.getElementsByName('email')[0].value 
		if(email ===''){
			alert('please enter valid email')
			return
		}
		this.props.resetPassword({email},from)	  
	}

	removeErrorMessage = () => {
		const { logoutError, clearLogoutError } = this.props
		logoutError ? clearLogoutError() : this.setState({ authError: '' })
	}

	render() {
		const { authError } = this.state
		const { cleanLoginMessage, needsLoginMessage, logoutError } = this.props
		return (
			<div className={'login-form-page--content'}>
				<div className={'login-form'}>
					<div className="title">
						<p>Welcome!</p>
						<p>Please Login to continue.</p>
					</div>
					{this.props.error && (
						<div className={'alert alert-danger'}>{this.props.error}</div>
					)}
					{logoutError && (
						<div className={'alert alert-warning'}>
							{this.props.logoutError}
						</div>
					)}
					<form onSubmit={this.handleSubmit} autoComplete={'off'}>
						{needsLoginMessage && (
							<ErrorPanel
								message={authError}
								buttonClickHandler={this.removeErrorMessage}
							/>
						)}
						<div className={'input-container'}>
							<div className={'icon-container'}>
								<img
									src={LOGIN_EMAIL}
									className={'input-icon'}
									alt={'input-icon'}
								/>
							</div>
							<input
								onFocus={cleanLoginMessage && this.removeErrorMessage}
								name={'email'}
								placeholder={'Email'}
								required={true}
								autoComplete={'off'}
							/>
						</div>
						<div className={'input-container'}>
							<div className={'icon-container'}>
								<img
									src={LOGIN_PASSWORD}
									className={'input-icon'}
									alt={'input-icon'}
								/>
							</div>
							<input
								name={'password'}
								type={this.state.inputType}
								placeholder={'Password'}
								required={true}
								onFocus={cleanLoginMessage && this.removeErrorMessage}
							/>
							<div className={'icon-container'}>
								<img
									src={PASSWORD_EYE_ICON}
									className={'input-icon eye'}
									alt={'eye-icon'}
									onClick={this.togglePassword}
								/>
							</div>
						</div>
						<div className={'button-container'}>
							<Button type="submit" className={'button login-button'}>{'Login'}</Button>
							<Button className={'button signUp-button'} onClick={this.openSignUp}>{'Sign Up'}</Button>
						</div>
						<span className={'sign sign-link'} onClick={this.forgotPassword}>{"Forgot password ?"}</span>
					</form>
				</div>
			</div>
		)
	}
}

LoginForm.propTypes = {
	login: PropTypes.func.isRequired,
	removeAuthError: PropTypes.func.isRequired,
	error: PropTypes.string.isRequired,
	isLoading: PropTypes.bool.isRequired,
	location: PropTypes.object.isRequired,
	clearLogoutError: PropTypes.func.isRequired,
	logoutError: PropTypes.string.isRequired,
	needsLoginMessage: PropTypes.bool.isRequired,
	cleanLoginMessage: PropTypes.func.isRequired
}

LoginForm.defaultProps = {
	error: '',
	isLoading: false
}

const loadingSelector = createLoadingSelector(['LOGIN'])
const errorSelector = createErrorMessageSelector(['LOGIN'])

const mapStateToProps = state => {
	return {
		isLoading: loadingSelector(state),
		error: errorSelector(state),
		logoutError: logoutErrorSelector(state),
		needsLoginMessage: needsLoginMessageSelector(state)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		login: (credentials, redirect) => dispatch(login(credentials, redirect)),
		resetPassword: (credentials, redirect) => dispatch(resetPassword(credentials, redirect)),
		clearLogoutError: () => dispatch(clearLogoutError()),
		cleanLoginMessage: () => dispatch(cleanLoginMessage),
		removeAuthError: () => dispatch(removeAuthError())
	}
}

const ConnectedLogin = connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginForm)
export default withRouter(ConnectedLogin)
