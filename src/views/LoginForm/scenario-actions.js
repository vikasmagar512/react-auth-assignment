import * as REST from '../../api/rest'
import history from '../../history'
import {
	loginFailed,
	loginStarted,
	loginSuccess,
	logoutUser,	
} from '../../store/auth/actions'
import {setEmail} from '../../store/user/actions'
import { parseResponseError } from '../../utils/utils'
import { toast } from 'react-toastify'

export function login(credentials, redirect) {
	return async dispatch => {
		try {
			dispatch(loginStarted())
			const result = await REST.login({
				email: credentials.email,
				password: credentials.password
			})
			dispatch(setEmail(credentials.email))
			dispatch(
				loginSuccess({
					accessToken: result.authentication_token,
				})
			)
			history.push('/user', {
				from: redirect,
				afterLogin: true
			})
		} catch (err) {
			const errorMessage = parseResponseError(err, {
				400: 'Your email or password is incorrect!'
			})
			dispatch(loginFailed({ message: errorMessage }))
		}
	}
}

export function resetPassword(credentials, redirect) {
	return async dispatch => {
		try {
			const result = await REST.resetPassword({
				email: credentials.email,
			})
			dispatch(setEmail(credentials.email))
			dispatch(logoutUser())
			history.replace('/auth/sign-up/email-reset')
		} catch (err) {
			toast.error(err.response.data.message)
		}
	}
}

export const removeAuthError = () => dispatch => {
	dispatch(loginFailed({ message: '' }))
}
