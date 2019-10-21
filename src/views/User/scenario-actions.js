import * as REST from '../../api/rest'
import {
	fetchingUserDataStarted,
	fetchingUserDataSuccess,
	fetchingUserDataFailure,
	fetchingPasswordCriteriaSuccess
} from '../../store/user/actions'
import { toast } from 'react-toastify'

export function fetchUserData() {
	return async dispatch => {
		try {
			dispatch(fetchingUserDataStarted())
			const results = await REST.readUserData()
			dispatch(fetchingUserDataSuccess(results))
		} catch (err) {
			dispatch(fetchingUserDataFailure(err))
			toast.error(err.response.data.message)
		}
	}
}
 
export function readPasswordCriteria() {
	return async dispatch => {
		try {
			const results = await REST.readPasswordCriteria()
			dispatch(fetchingPasswordCriteriaSuccess(results))
		} catch (err) {
			toast.error(err.response.data.message)
		}
	}
}
 