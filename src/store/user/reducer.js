import { assign } from 'lodash'
import { handleActions } from 'redux-actions'

import {
	SET_EMAIL,	
	SET_ERROR,
	CLEAR_ERROR,
	SET_TOKEN,
	FETCHING_USERDATA_SUCCESS,
	FETCHING_PCRITERIA_SUCCESS
} from './actionTypes'

const initialState = {
	email: '',
	isLoading: false,
	error: '',
	person:{
		createdAt:'',
		displayName:'',
		key:'',
		role:{
			key:'',
			rank:0
		},
		updatedAt:''
	},
	criteria :{}
}

export const userReducer = handleActions(
	{
		[SET_EMAIL]: (state, { payload: email }) => assign({}, state, { email }),
		[SET_ERROR]: (state, { payload }) => assign({}, state, { error: payload }),
		[CLEAR_ERROR]: state => assign({}, state, { error: '' }),
		[SET_TOKEN]: (state, { payload }) => assign({}, state, { token: payload }),
		[FETCHING_USERDATA_SUCCESS]: (state, {payload} ) =>
			assign({}, state, {person:{...payload} }),
		[FETCHING_PCRITERIA_SUCCESS]: (state, {payload} ) =>
			assign({}, state, {criteria:{...payload} }),
		},
	initialState
)
