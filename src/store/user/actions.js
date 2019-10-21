import { createAction } from 'redux-actions'
import {
	SET_USER,
	SET_EMAIL,
	SET_ERROR,
	CLEAR_ERROR,
	SET_TOKEN,
	FETCHING_USERDATA_REQUESTED,
	FETCHING_USERDATA_SUCCESS,
	FETCHING_USERDATA_FAILURE,
	FETCHING_PCRITERIA_SUCCESS
} from './actionTypes'

export const setUser = createAction(SET_USER)
export const setEmail = createAction(SET_EMAIL)
export const setError = createAction(SET_ERROR)
export const clearError = createAction(CLEAR_ERROR)
export const setToken = createAction(SET_TOKEN)

export function fetchingUserDataStarted() {
	return {
		type: FETCHING_USERDATA_REQUESTED
	}
}

export function fetchingUserDataSuccess(results) {
	return {
		type: FETCHING_USERDATA_SUCCESS,
		payload: results
	}
}
export function fetchingPasswordCriteriaSuccess(results) {
	return {
		type: FETCHING_PCRITERIA_SUCCESS,
		payload: results
	}
}

export function fetchingUserDataFailure(err) {
	return {
		type: FETCHING_USERDATA_FAILURE,
		payload: {
			message: err
		}
	}
}