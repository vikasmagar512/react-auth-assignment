import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loader from '../../components/Loader/Loader'
import {
	createErrorMessageSelector,
	createLoadingSelector
} from '../../store/utils/selectors'
import './user.scss'
import {
	fetchUserData,
} from './scenario-actions'

class User extends Component {
	state = {
		fetchFinished: false,
		showError: true,
	}

	async componentDidMount() {
		const { fetchUserData } = this.props
		await fetchUserData()
		this.setState({
			fetchFinished: true,
			showError: true
		})
	}

	renderLoader = () => {
		return (
			<div className={'loader-container'}>
				<Loader />
			</div>
		)
	}

	render() {
		const { fetchLoading } = this.props
		const {  fetchFinished } = this.state
		return (
			<div>
				{(fetchLoading || !fetchFinished) &&
					 this.renderLoader()
				}
			</div>
		)
	}
}

User.propTypes = {
	fetchLoading: PropTypes.bool.isRequired,
	error: PropTypes.string.isRequired,
	location: PropTypes.object.isRequired,
	fetchUserData: PropTypes.func.isRequired,
}

const fetchLoadingSelector = createLoadingSelector(['FETCHING_USERDATA'])
const errorSelector = createErrorMessageSelector(['FETCHING_USERDATA'])
const mapStateToProps = state => {
	return {
		fetchLoading: fetchLoadingSelector(state),
		person: state.user.person,	
		error: errorSelector(state)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchUserData: () => dispatch(fetchUserData()),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(User)
