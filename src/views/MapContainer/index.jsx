import React, { Component } from 'react'
import './index.scss'
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";
import PropTypes from 'prop-types'

class MapContainer extends React.Component {

	renderContent() {
		const {google, center, data, zoom} =this.props	
		return (
			<div>
				<div style={{ width: '100%' }}>
					<Map
						google={google}
						className={"map"}
						zoom={zoom}
						initialCenter={center}>
						{data.map(item => (
							<Marker
								key={item.id}
								title={item.name}
								name={item.name}
								onClick={this.props.markerClicked}
								position={{ lat: item.lat, lng: item.lng }}
							/>
						))}
						<InfoWindow
							visible={!!this.props.selectedItem}
							position={{
								lat: this.props.selectedItem.lat,
								lng: this.props.selectedItem.lng
							}}>
							<div className={'info'}>
								<p className={'title'}>{this.props.selectedItem.title}</p>
							</div>
						</InfoWindow>
					</Map>
				</div>
			</div>
		)
	}

	render() {
		return (
			<div className="wrapper ecosystems-wrapper">
				{this.renderContent()}
			</div>
		)
	}
}
MapContainer.propTypes = {
	google: PropTypes.object,
	zoom: PropTypes.number,
	center: PropTypes.object
}
MapContainer.defaultProps = {
	zoom: 13,
	// San Francisco, by default
	center: {
		lat: 37.774929,
		lng: -122.419416
	}
}
export default GoogleApiWrapper({
	apiKey: ('AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo')
})(MapContainer)

