import React from 'react';
import { connect } from 'react-redux';

import { createGroupList, addQlikVariable, getApplicationVariables } from '../api';
import AddQVVarForm from 'AddQVVarForm';

class AddQVVarContainer extends React.Component {
	state = {
		currApplication: '',
		groupList: []
	};

//Handles the Save to Server of the new QV variable
	handleSaveToServer = (data) => {
		//data is expected to be an object with the needed fields to add a QV Var
		addQlikVariable(data)
			.then(resp => {
				this.setState({
					currApplication: 'Select an Application...',
					groupList: []
				});
			});
	}
//Handles a clear form
	handleOnClearForm = () => {
		this.setState({
			currApplication: 'Select an Application...',
			groupList: []
		});
	}
//Handles when an application is selected and/or changed
	handleOnApplicationChange = (newApplication) => {
		let currApplication = newApplication
		//Get the Variables for the selected application and create a grouplist from it
		//We slice off the first group because it will be the default 'All' group.
		getApplicationVariables(newApplication)
			.then(data => this.setState({
					groupList: createGroupList(data).slice(1),
					currApplication
				})
			);
	}
	render() {
		let renderAllFields = false;
		if (this.state.currApplication !== '' && this.state.currApplication !== 'Select an Application...') {
			renderAllFields = true;
		}
		return (
			<AddQVVarForm
				renderAllFields={renderAllFields}
				onSaveToSever={this.handleSaveToServer}
				onClearForm={this.handleOnClearForm}
				onApplicationChange={this.handleOnApplicationChange}
				dispatch={this.props.dispatch}
				applicationList={this.props.applicationList}
				currApplication={this.state.currApplication}
				groupList={this.state.groupList}
				initialValues={this.props.initialValues}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		applicationList: state.applications.applicationList,
		initialValues: {application: 'Select an Application...', locked: false}
	};
};

export default connect(mapStateToProps)(AddQVVarContainer);
