import React from 'react'
import { Alert } from 'react-bootstrap'
import { string, func } from 'prop-types'
import './error-panel.scss'

const ErrorPanel = ({ message, buttonClickHandler }) => (
	<Alert variant="danger"  onClose={buttonClickHandler} dismissible>
		<span>{message}</span>
	</Alert>
)

ErrorPanel.propTypes = {
	message: string.isRequired,
	buttonClickHandler: func.isRequired
}

export default ErrorPanel
