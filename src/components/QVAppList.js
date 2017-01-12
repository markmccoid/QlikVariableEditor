import React from 'react';
import api from '../api';
import { connect, dispatch } from 'react-redux';

import { startLoadApplicationVars } from '../actions/actions';


class QVAppList extends React.Component {
	state = {
		appList: [],
		appSelected: ''
	}

	// componentDidMount() {
	// 	//Get list of Applications in the QVVariables.json file on server
	// 	api.getApplicationNames()
	// 		.then(data => this.setState({appList: data}));
	// }
	render() {
		return (
			<div>
				{this.props.applicationList.map(app => {
					return (
						<div>
							<a key={app} onClick={() => this.props.startLoadApplicationVars(app)}>{app} </a>
						</div>
					);
			})}
			</div>
		);
	}
}


export default connect(null, { startLoadApplicationVars })(QVAppList);
