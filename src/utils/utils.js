
export function parseResponseError(error, errorsArray = {}) {
	if (error.response) {
		switch (error.response.status) {
			case 400:
				return errorsArray['400'] || 'Wrong request'
			default:
				return 'Something went wrong. Please again later.'
		}
	}
	return 'Network error'
}
