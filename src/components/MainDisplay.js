import React from 'react';
import { connect } from 'react-redux';

import QVAppList from './QVAppList';
import api from '../api';

class MainDisplay extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			qvVariables: []
		}
	}

	componentDidMount() {
		let request = api.getQlikVariables();
		request.then(varFile => {
			this.setState({qvVariables: varFile});
		});
	}

	render() {

		console.log(this.state.qvVariables);
		return (
			<div className="row">
				<div className="columns callout secondary small-4" style={{paddingRight: "0", marginLeft: "15px", marginBottom:"0px"}}>
					<p>Left Panel</p>
					<QVAppList applicationList={this.props.applicationList}/>
				</div>
				<div className="columns callout secondary" style={{marginLeft: "-1px", marginRight: "15px", marginBottom:"0px"}}>
					<p>Right Panel</p>
					<button className="button" onClick={() => api.addQlikVariable(newVarObj)}>Add Var</button>
					<br />
					<button className="button" onClick={() => api.updateQlikVariable(updVarObj)}>Update Var</button>
					<br />
					<button className="button" onClick={() => api.deleteQlikVariable('4611e6d7-4a94-4f68-a034-5e707aaaccab')}>Delete Var</button>
				</div>
			</div>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		applicationList: state.applicationList
	}
};
export default connect(mapStateToProps)(MainDisplay);
