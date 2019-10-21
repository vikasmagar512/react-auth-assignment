// import * as REST from '../api/rest'
import { clearData, logoutUser } from './auth/actions'

import { setError } from './user/actions'

export function logout() {
	return async dispatch => {
		// try {
		// 	await REST.logout()
		// } finally {
			dispatch(logoutUser())
			dispatch(setError('You have been logged out'))
			dispatch(clearData())
		// }
	}
}