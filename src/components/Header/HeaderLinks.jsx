import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
	Nav,
	Overlay,
	Popover,
	Button
} from 'react-bootstrap'
import moment from 'moment'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
	NAVBAR_USER,
} from '../../assets/Icons'
import { logout } from '../../store/common-scenario-actions'
import { resetPassword } from '../../views/LoginForm/scenario-actions'
import './header-links.scss'


class HeaderLinks extends Component {
	state = {
		popTarget: null,
		show: false
	}
	openPopUp = event => {
		this.setState({
			popTarget: event.target,
			show: !this.state.show
		})
	}
	
	logout = () => {
		this.setState({ show: false },()=>{
			this.props.logout()
		})
	}
	resetPassword = () => {
		const { from } = this.props.location.state || { from: { pathname: '/' } }
		this.setState({ show: false },()=>{
			this.props.resetPassword({email:this.props.person.email},from)
		})
	}
  
	render() {
		const {
			location: { pathname },
			person
		} = this.props
		const age = moment(person.createdAt).startOf('day').fromNow();
		const last_updated = moment(person.updatedAt).startOf('day').fromNow();
		return (
			<div>
				<Nav>
						<div className={'flex-row nav-profile'} onClick={this.openPopUp}>
							<div className="ikon-with-badge">
								<img
								src={NAVBAR_USER}
								alt={'navbar-user'}
								className={'navbar-user'}
							/>
								<div className="ikon-with-badge--badge" />
							</div>
							<i className={'pe-7s-angle-down'} />
							<Overlay
								show={this.state.show}
								target={this.state.popTarget}
								placement="bottom"
								over
							>
								<Popover id={'popover-commit'}>
									<div className={'userWrapper section'}>
										<div className={'container'}>
											<div className={'info'}>
												<h4 className={'header'}>Display Name</h4>
												<span>{person.displayName}</span>	
											</div>
										</div>
										<div className={'container'}>
											<div className={'flex-row'}>
												<h5>Account Age</h5>
												<span>{age}</span>
											</div>
											<div className={'securitySection'}>
												<h4>Security</h4>																				
												<div className={'flex-row'}>
													<h5>Last Update</h5>
													<span>{last_updated}</span>
												</div>
											</div>
										</div>
										<div className={'container commit-actions'}>
											<div className={'row center'}>
												<Button variant="light" onClick={this.resetPassword}>Reset Password</Button>
											</div>
											<div className={'row center'}>
												<Button variant="light" onClick={this.logout}>Logout</Button>
											</div>
											
										</div>
									</div>
									
								</Popover>
							</Overlay>
						</div>
				</Nav>
			</div>
		)
	}
}

HeaderLinks.defaultProps = {
}

HeaderLinks.propTypes = {
	match: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	person: PropTypes.object.isRequired,
	logout: PropTypes.func.isRequired,
	resetPassword: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
	return {
	person: state.user.person
}}

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(logout()),
	resetPassword: (credentials, redirect) => dispatch(resetPassword(credentials, redirect)),
})

const ConnectedHeaderLinks = connect(
	mapStateToProps,
	mapDispatchToProps
)(HeaderLinks)

export default withRouter(ConnectedHeaderLinks)
