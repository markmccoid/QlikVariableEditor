import React from 'react';
import * as api from '../api';
import { connect, dispatch } from 'react-redux';

import { startLoadApplicationVars } from '../actions/actions';


class QVAppList extends React.Component {

	render() {
		return (
			<div>
				{this.props.applicationList.map(app => {
					return (
							<li key={app} style={{display: 'inline-block', width:'100%'}}>
								<a onClick={() => this.props.startLoadApplicationVars(app)}>{app} </a>
							</li>
					);
				})}
			</div>
		);
	}
}


export default connect(null, { startLoadApplicationVars })(QVAppList);
