import React, { Component } from 'react'
import { Navbar } from 'react-bootstrap'
import { Route, Switch } from 'react-router-dom'
import HeaderLinks from '../../components/Header/HeaderLinks'
import UsersPage from '../../views/User/User'
import './user.scss'

class User extends Component {
	constructor(props) {
		super(props)
		this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this)
		this.state = {
			sidebarExists: false
		}
	}

	componentDidMount() {
		document.documentElement.classList.remove('nav-open')
	}

	mobileSidebarToggle(e) {
		if (this.state.sidebarExists === false) {
			this.setState({
				sidebarExists: true
			})
		}
		e.preventDefault()
		document.documentElement.classList.toggle('nav-open')
		const node = document.createElement('div')
		node.id = 'bodyClick'
		node.onclick = function() {
			this.parentElement.removeChild(this)
			document.documentElement.classList.toggle('nav-open')
		}
		document.body.appendChild(node)
	}

	renderNavbar() {
		return (
			<div className={'user__navbar'}>
				<div className={'main-panel '}>
					<Navbar className={'main-panel-content'}>
						<Navbar.Brand>
							<div className={'active'}>User Dashboard</div>
						</Navbar.Brand>
						<Navbar.Collapse  className="justify-content-end">
							<HeaderLinks/>
						</Navbar.Collapse>
					</Navbar>
				</div>
			</div>
		)
	}

	renderContent() {
		return (
			<div>
				<div style={{ width: '100%' }}>
					<Switch>
						<Route path={'/'} component={UsersPage} />
					</Switch>
				</div>
			</div>
		)
	}

	render() {
		return (
			<div className="wrapper user-wrapper">
				{this.renderNavbar()}
				{this.renderContent()}
			</div>
		)
	}
}

export default User
