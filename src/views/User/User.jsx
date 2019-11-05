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
import MapContainer from './../MapContainer'
import places from "./places.json";

const CityList = props =><div>
	<ul className="list-group">
	{
		props.items.map((item,i)=><li key={i} className={`list-group-item ${props.selectedItem && props.selectedItem.name === item.name ? 'selected' :''}`} onClick={e => props.onClick(e, item)}>
			{item.title}
		</li>)
	}
	</ul>
</div>

class User extends React.Component {
	state = {
		fetchFinished: false,
		showError: true,
		search:'',
		data:places,
		selectedItem: { lat: 0, lng: 0 }
	}

	showInfo=(e, selectedItem) =>{
		this.setState({ selectedItem: selectedItem });
	}

	markerClicked=(props, marker, e)=>{
		let selectedItem = this.state.data.find(d=>d.name===props.name)
		this.setState({selectedItem})
	}
	handleChange=(event)=>{
		const search = event.target.value
		this.setState({
			search,
			data: places.filter(stadium => stadium.name.toLowerCase().includes( search.toLowerCase()))
		});
	 };
	 

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
				{(fetchLoading || !fetchFinished) ?
					 this.renderLoader()
					 : 
					 (<div className={'wrapper'}> 
						<div className={'map'}>
							<MapContainer
								center={{ lat: -24.9923319, lng: 135.2252427 }}
								zoom={4}
								data={this.state.data}
								selectedItem={this.state.selectedItem}
								markerClicked ={this.markerClicked}
							/>
						</div>
						<div className={'cityList'}>
							<div className="filter-list">
								<form>
									<fieldset className="form-group">
										<input type="text" className="form-control form-control-lg" placeholder="Search..."
										value={this.state.search}
										onChange={this.handleChange}/>
									</fieldset>
								</form>
								<CityList items={this.state.data} selectedItem={this.state.selectedItem} onClick={this.showInfo} />
							</div>
						</div>
					</div>)
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
