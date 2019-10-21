import {
	LOCAL_ACCESS_TOKEN_KEY,
} from '../../enums'
import {
	LOGIN_FAILURE,
	LOGIN_SUCCESS,
	LOGOUT_USER,
	CLEAR_LOG_IN_MESSAGE,
	SIGNUP_SUCCESS,
	SIGNUP_FAILURE
} from './action-types'

const tokenFromStorage = localStorage.getItem(LOCAL_ACCESS_TOKEN_KEY)

let initialState

if (tokenFromStorage) {
	initialState = {
		isAuthenticated:true,
	}
} else {
	initialState = {
		isAuthenticated: false,
		needsLogInMessage: false
	}
} 

export function authReducer(state = initialState, { type, payload }) {

	switch (type) {
		case LOGIN_FAILURE:
			localStorage.removeItem(LOCAL_ACCESS_TOKEN_KEY)
			return {
				...state,
				isAuthenticated: false,
			}
		case LOGIN_SUCCESS:
			localStorage.setItem(LOCAL_ACCESS_TOKEN_KEY, payload.accessToken)
			return {
				...state,
				isAuthenticated: true,
			}
		case LOGOUT_USER:
			localStorage.removeItem(LOCAL_ACCESS_TOKEN_KEY)
			return {
				...state,
				isAuthenticated: false,
				needsLogInMessage: false
			}

		case CLEAR_LOG_IN_MESSAGE:
			return {
				...state,
				needsLogInMessage: false
			}
		case SIGNUP_FAILURE:
			localStorage.removeItem(LOCAL_ACCESS_TOKEN_KEY)
			return {
				...state,
				isAuthenticated: false,
			}
		case SIGNUP_SUCCESS:
			localStorage.setItem(LOCAL_ACCESS_TOKEN_KEY, payload.accessToken)
			return {
				...state,
				isAuthenticated: true,
			}
		default:
			return state
	}
}
