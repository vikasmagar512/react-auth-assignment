import { CLEAR_DATA } from '../common-action-types'
import {
	LOGIN_FAILURE,
	LOGIN_REQUESTED,
	LOGIN_SUCCESS,
	LOGOUT_USER,
	RENEW_TOKEN,
	CLEAR_LOG_IN_MESSAGE,

	SIGNUP_REQUESTED,
	SIGNUP_SUCCESS,
	SIGNUP_FAILURE
} from './action-types'

export function loginStarted() {
	return {
		type: LOGIN_REQUESTED
	}
}

export function loginSuccess(token) {
	return {
		type: LOGIN_SUCCESS,
		payload: token
	}
}

export function loginFailed(err) {
	return {
		type: LOGIN_FAILURE,
		payload: err
	}
}

export function logoutUser() {
	return {
		type: LOGOUT_USER
	}
}

export function renewToken() {
	return {
		type: RENEW_TOKEN
	}
}

export function clearData() {
	return {
		type: CLEAR_DATA
	}
}

export function cleanLoginMessage() {
	return {
		type: CLEAR_LOG_IN_MESSAGE
	}
}
export function signUpStarted() {
	return {
		type: SIGNUP_REQUESTED
	}
}

export function signUpSuccess(token) {
	return {
		type: SIGNUP_SUCCESS,
		payload: token
	}
}

export function signUpFailed(err) {
	return {
		type: SIGNUP_FAILURE,
		payload: err
	}
}

