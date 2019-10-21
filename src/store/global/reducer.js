import {  HIDE_LOADER, SHOW_LOADER } from './action-types'
const initialState = {
	loadingState: false
}

export function globalReducer(state = initialState, { type }) {
	switch (type) {
		case SHOW_LOADER:
			return {
				...state,
				loadingState: true
			}
		case HIDE_LOADER:
			return {
				...state,
				loadingState: false
			}
		default:
			return state
	}
}
