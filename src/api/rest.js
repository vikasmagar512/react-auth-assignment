import axios from 'axios'
import humps from 'humps'
import { LOCAL_ACCESS_TOKEN_KEY } from '../enums'
import configStore from '../store'
import { logoutUser } from '../store/auth/actions'
import { loading } from '../store/global/actions'

const { store } = configStore

export const auth = axios.create({
	baseURL: process.env.REACT_APP_API_URL
})

export const rest = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	transformResponse: [
		...axios.defaults.transformResponse,
		data => humps.camelizeKeys(data)
	]
})

rest.interceptors.request.use(
	config => {
		const token = localStorage.getItem(LOCAL_ACCESS_TOKEN_KEY)
		if (token === null) {
			store.dispatch(logoutUser())
			return config
		}
		if (['post', 'put', 'delete'].findIndex(k => k === config.method) !== -1) {
			store.dispatch(loading(true))
		}
		config.headers.Authorization = `${token}`

		return config
	},
	err => Promise.reject(err)
)

rest.interceptors.response.use(
	response => {
		if (
			['post', 'put', 'delete'].findIndex(k => k === response.config.method) !==
			-1
		) {
			store.dispatch(loading(false))
		}
		return response
	},
	error => {
		if (
			['post', 'put', 'delete'].findIndex(k => k === error.config.method) !== -1
		) {
			store.dispatch(loading(false))
		}
		if (error.status === 401) {
			localStorage.removeItem(LOCAL_ACCESS_TOKEN_KEY)
			store.dispatch(logoutUser())
		}
		return Promise.reject(error)
	}
)

export function login(credentials) {
	return auth.post(`/v2/people/authenticate`, credentials).then(response => response.data)
}

export function signUp(credentials) {
	return auth.post(`/v2/people/create`, credentials).then(response => response.data)
}

export function resetPassword(credentials) {
	return auth.post(`/v2/people/reset_password`, credentials).then(response => response.data)
}

export function logout() {
	return auth.post(`/v2/people/logout`, {}).then(response => response.data)
}

export const readUserData = () => rest.get(`v2/people/me`).then(response => response.data)
export const readPasswordCriteria = () => auth.get(`v2/people/password_requirements`).then(response => response.data)
