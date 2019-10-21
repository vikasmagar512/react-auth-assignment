
import {
	setEmail,
} from '../../store/user/actions'
import history from '../../history'
import * as REST from '../../api/rest'
import {
signUpStarted , signUpSuccess, signUpFailed
} from '../../store/auth/actions'

export function signUp(credentials, redirect) {
	return async dispatch => {
		try {
			dispatch(signUpStarted())
			const {display_name,email,password} = credentials
			const result = await REST.signUp({
				display_name,email,password
			})
			dispatch(setEmail(credentials.email))
			dispatch(
				signUpSuccess({
					accessToken: result.authentication_token,
				})
			)
			history.push('/user', {
				from: redirect,
				afterLogin: true
			})
		} catch (err) {
			dispatch(signUpFailed({ message: err.response.data.message }))
		}
	}
}

export const removeAuthError = () => dispatch => {
	dispatch(signUpFailed({ message: '' }))
}
