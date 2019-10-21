import React, { Component } from 'react'
import { compose } from 'recompose'
import { withFormik } from 'formik'
import { bool, func, object, shape, string } from 'prop-types'
import { connect } from 'react-redux'
import Spinner from 'react-spinner-material'
import { EmailInfoValidationSchema } from '../../../validationSchemas'
import { LOGIN_EMAIL, LOGIN_PASSWORD, PERSON, PASSWORD_EYE_ICON } from '../../../assets/Icons'
import ErrorPanel from '../../../components/ErrorPanel/ErrorPanel'
import { Button } from 'react-bootstrap'
import history from '../../../history'
import { signUp, removeAuthError } from '../scenario-actions'
import { readPasswordCriteria } from '../../User/scenario-actions'
import {
	createErrorMessageSelector,
	createLoadingSelector,
} from '../../../store/utils/selectors'
import '../sign-up-form.scss'
import {
	Overlay,
	Popover,
} from 'react-bootstrap'

class EmailSubForm extends Component {
	state = {
		showError: true,
		inputTypeP:'password',
		inputTypeC:'password',
		unitedErrors: [],
		popTarget: null,
		show: false
	}
	componentDidUpdate(prevProps) {
		if (prevProps.serverError !== this.props.serverError) {
			this.setState({
				showError: true
			})
		}
	}
	openLogin=()=>{
		history.push('/auth/login')
	}
	openPopUp = event => {
		this.setState({
			popTarget: event.target,
			show: !this.state.show
		})
	}
	

	onSubmit = event => {
		event.preventDefault()
		let { unitedErrors } = this.state
		const { isValid, signUp, serverError, errors, touched } = this.props
		let { values } = this.props
		if (isValid !== true) {
			unitedErrors = [serverError]
			for (let k in errors) {
				if (touched[k]) {
					unitedErrors.push(errors[k])
				}
			}
			this.setState({
				showError: true,
				unitedErrors
			})
			return
		} else{
			signUp(values)
		}
	}
	togglePassword=(e)=>{
		e.preventDefault();
		e.stopPropagation();
		this.setState({
			inputType: this.state.inputType === 'input' ? 'password' : 'input'
		})  
	}
	togglePasswordConfirmP=(e)=>{
		e.preventDefault();
		e.stopPropagation();
		this.setState({
			inputTypeC: this.state.inputTypeC === 'input' ? 'password' : 'input'
		})  
	}
	  
	handleInputChange = event => {
		const { handleChange, clearError, serverError } = this.props
		if (serverError) clearError()
		const { showError } = this.state
		showError && this.closeErrorPanel()
		handleChange(event)
	}

	closeErrorPanel = () => {
		const { clearError, serverError } = this.props
		if (serverError) clearError()
		this.setState({
			showError: false,
			unitedErrors: []
		})
	}

	render() {
		const { values, criteria, setFieldTouched, isLoading, serverError } = this.props
		const { unitedErrors} = this.state
		return (
			<div>
				<div className="title">
					<p>Please tell us a little about you!</p>
				</div> 
					
			<form onSubmit={this.onSubmit} className="form-container">
				
				{serverError ? (
					<ErrorPanel
						message={serverError}
						buttonClickHandler={this.closeErrorPanel}
						key={serverError}
					/>
				) : (
					unitedErrors.map(error => {
						return error ? (
							<ErrorPanel
								message={error}
								buttonClickHandler={this.closeErrorPanel}
								key={error}
							/>
						) : null
					})
				)}
				<div className={'input-container'}>
					<div className={'icon-container'}>
						<img src={PERSON} className={'person-icon'} alt={'person-icon'} />
					</div>
					<input
						value={values.display_name}
						name={'display_name'}
						placeholder={'Display Name'}
						required={true}
						onChange={this.handleInputChange}
						onBlur={() => setFieldTouched('display_name')}
					/>
				</div>
				<div className={'input-container'}>
					<div className={'icon-container'}>
						<img
							src={LOGIN_EMAIL}
							className={'input-icon'}
							alt={'input-icon'}
						/>
					</div>
					<input
						value={values.email}
						name={'email'}
						placeholder={'Email'}
						required={true}
						onFocus={this.resetError}
						onChange={this.handleInputChange}
						onBlur={() => setFieldTouched('email')}
						autoComplete={'off'}
					/>
				</div>
			
				<div className={'input-container'}>
					<div className={'icon-container'}>
						<img
							src={LOGIN_PASSWORD}
							className={'person-icon'}
							alt={'person-icon'}
						/>
					</div>
					<input
						type={this.state.inputTypeC}
						value={values.password}
						name={'password'}
						placeholder={'Password'}
						required={true}
						onChange={this.handleInputChange}
						onBlur={() => setFieldTouched('password')}
					/>
					<div className={'icon-container'}>
						<img
							src={PASSWORD_EYE_ICON}
							className={'person-icon'}
							alt={'person-icon'}
							onClick={this.togglePasswordConfirmP}
						/>
					</div>
						
				</div>
				<p className={'sign sign-link'} onClick={this.openPopUp}>{"Password Criteria"}</p>
				<Overlay
					show={this.state.show}
					target={this.state.popTarget}
					placement="right"
					over
				>
					<Popover id={'popover-password'}>
						<div className={'userWrapper section'}>
							<div className={'container'}>
								<div className={'info'}>
									<h5 className={'header'}>Password should match below criteria</h5>
									<ul className='list'>
										<React.Fragment >
											{Object.keys(criteria).map((c,i)=>(
												<li key={i}>{c} : {`${criteria[c]}`}</li>
											))}
										</React.Fragment>
									</ul>
								</div>
							</div>
						</div>
					</Popover>
				</Overlay>

					
				<div className={'input-container'}>
					<div className={'icon-container'}>
						<img
							src={LOGIN_PASSWORD}
							className={'person-icon'}
							alt={'person-icon'}
						/>
					</div>
					<input
						type={this.state.inputType}
						value={values.passwordConfirmation}
						name={'passwordConfirmation'}
						placeholder={'Confirm Your Password'}
						required={true}
						onChange={this.handleInputChange}
						onBlur={() => setFieldTouched('passwordConfirmation')}
					/>
					<div className={'icon-container'}>
						<img
							src={PASSWORD_EYE_ICON}
							className={'person-icon'}
							alt={'person-icon'}
							onClick={this.togglePassword}
						/>
					</div>
				</div>
				{isLoading ? (
					<Spinner spinnerColor="#4986c5" className="spinner" />
				) : (
					<div className={'button-container'}>
						<Button type="submit" className={'button signUp-button'}>{'Sign Up'}</Button>
						<Button className={'button login-button'} onClick={this.openLogin}>{'Login'}</Button>
					</div>
				)}
			</form>
			</div>

		)
	}
}

EmailSubForm.propTypes = {
	values: shape({
		display_name: string
	}).isRequired,
	errors: shape({
		display_name: string,
	}),
	isValid: bool.isRequired,
	setFieldTouched: func.isRequired,
	handleChange: func.isRequired,
	isLoading: bool.isRequired,
	serverError: string.isRequired,
	clearError: func.isRequired,
	touched: object.isRequired
}

EmailSubForm.defaultProps = {
	isLoading: false,
	serverError: '',
	criteria:{}
}

const loadingSelector = createLoadingSelector(['SIGNUP'])
const errorSelector = createErrorMessageSelector(['SIGNUP'])

const mapStateToProps = state => {
	console.log('state.user.criteria', state.user.criteria)
	return {
		isLoading: loadingSelector(state),
		serverError: errorSelector(state),
		criteria:state.user.criteria
	}
}

const mapDispatchToProps = dispatch => {
	return {
		signUp: (credentials, redirect) => dispatch(signUp(credentials, redirect)),
		readPasswordCriteria: () => dispatch(readPasswordCriteria()),
		clearError: () => dispatch(removeAuthError()),
	}
}

export default compose(
	connect(
		mapStateToProps,
		mapDispatchToProps
	),
	withFormik({
		mapPropsToValues: () => ({
			display_name: '',
			email: '',
			password: '',
			passwordConfirmation: '',
			criteria:{}
		}),
		validationSchema: EmailInfoValidationSchema
	})
)(EmailSubForm)
