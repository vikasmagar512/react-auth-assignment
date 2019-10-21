import { HIDE_LOADER, SHOW_LOADER } from './action-types'

export function loading(bool) {
	return {
		type: bool ? SHOW_LOADER : HIDE_LOADER
	}
}
