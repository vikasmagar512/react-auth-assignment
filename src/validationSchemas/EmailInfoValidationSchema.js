import { object, string, ref } from 'yup'

const EmailInfoValidationSchema = object({
	display_name: string('Display Name')
		.min(3, 'Display Name should contain at least 1 character.')
		.max(100, 'Display Name should contain max 100 characters.')
		.required('Display Name is required.'),
	password: string('Password')
		.required('Passwrod is required.'),
	passwordConfirmation: string()
		.oneOf([ref('password')], 'Passwords do not match.')
		.required('Password confirmation is required.'),
	email: string('Email').email()
		.required('Email Name is required.')
})

export default EmailInfoValidationSchema
