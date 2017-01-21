import React from 'react';
import { connect } from 'react-redux';

import QVAppList from './QVAppList';
import QVVarsDisplay from './QVVarsDisplay';
import api from '../api';

class MainDisplay extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="row">
				<div className="columns callout secondary small-2"
							style={{padding: "5px 0", marginLeft: "15px", marginBottom:"0px"}}>
					<h4 className="text-center">Application List</h4>
					<ul className="menu vertical">
						<QVAppList applicationList={this.props.applications.applicationList}/>
					</ul>
				</div>
				<div className="columns callout secondary" style={{marginLeft: "-1px", marginRight: "15px", marginBottom:"0px"}}>

					<QVVarsDisplay />
				</div>
			</div>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		applications: state.applications
	}
};
export default connect(mapStateToProps)(MainDisplay);
