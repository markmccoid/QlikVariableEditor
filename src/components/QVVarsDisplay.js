import React from 'react';
import { connect } from 'react-redux';

import QVVarItem from './QVVarItem';
import QVGroupSelect from './QVGroupSelect';
import QVGroupDisplay from './QVGroupDisplay';
import QVVarItemDetail from './QVVarItemDetail';
import QVVarItemEdit from './QVVarItemEdit';

//Import actions
import { updateSelectedGroup,
					updateSelectedVariable,
					updateEditState,
					startUpdateApplicationVar,
					startDeleteApplicationVar,
					updateSearchText } from '../actions/actions';

//QV Variable manipulation functions
import qvVarHandling from '../api/qvVarHandling';

class QVVarsDisplay extends React.Component {

	onGroupChanged = (selectedGroup) => {
		this.props.dispatch(updateSelectedGroup(selectedGroup));
	}

	renderGroupSelect() {
		let qvVars = [...this.props.qvVariables];
		let groupList = qvVarHandling.createGroupList(qvVars);
		return (
			<QVGroupSelect
				groupList={groupList}
				selectedGroup={this.props.appState.selectedGroup}
				selectedApplication={this.props.applications.selectedApplication}
				onGroupChanged={this.onGroupChanged}
			/>
		)
	}
	renderQVVariables() {
		let { appState, qvVariables } = this.props;
		//Get an array of var objects based on the Group selected (could be all variables)
		let filterVars = qvVarHandling.filterVars(qvVariables, appState.searchText, appState.selectedGroup || 'All');
		//Get an array of distinct groups in the full qvVars array (for specific applciation that was selected)
		let groupList = qvVarHandling.createGroupList([...this.props.qvVariables]);
		//Get a list of groups matching what is in filterVars (i.e. if someone selected a group, we only want to have the group in our groupList)
		let finalGroupList = groupList.filter(group =>
			filterVars.filter(qvVar => group === qvVar.group).length > 0
		);
		//Loop through the groupList and display a header for each group that has
		//vars in the filterVars array and display the vars.
		return finalGroupList.map(group => {
			let groupTitle = <div key={group} className="column small-12 group-title">{group}</div>;
			let groupVars = filterVars.filter(qvVar => qvVar.group === group)
				.map(qvVar => {
					//If the qvVar is the selectedVariableId from redux store
					//then check if we are editing
					let initValues = {
						name: qvVar.name,
						description: qvVar.description,
						expression: qvVar.expression,
						notes: qvVar.notes,
						locked: qvVar.locked,
						group: qvVar.group
					};
						if (appState.selectedVariableId === qvVar.id) {
							if (appState.editing) {
								//If editing return the QVVarItemEdit Component
								return (
									<QVVarItemEdit
										qvVar={qvVar}
										key={qvVar.id}
										initialValues={initValues}
										groupList={groupList}
										onCancelEdit={() => this.props.dispatch(updateEditState(null))}
										onSaveEdit={saveObj => {
												this.props.dispatch(startUpdateApplicationVar(saveObj))
													.then(res => this.props.dispatch(updateEditState(null)));
											}
										}
									/>
								);
							} else {
								//If not editing return the QVVarItemDetail Component
								return (
									<QVVarItemDetail
										qvVar={qvVar}
										key={qvVar.id}
										onEditVar={id => this.props.dispatch(updateEditState(id))}
										onSelectVar={id => this.props.dispatch(updateSelectedVariable(id))}
										onDeleteVar={id => this.props.dispatch(startDeleteApplicationVar(id))}
									/>
								);
							}
						}
						return (<QVVarItem
											qvVar={qvVar}
											key={qvVar.id}
											selectedVariableId={appState.selectedVariableId}
											onSelectVar={id => this.props.dispatch(updateSelectedVariable(id))}
										/>);
					});
					//QVGroupDisplay is a simple contianer that shows the children (group titles and QVVarItems)
					return <QVGroupDisplay key={group}>
							{ [groupTitle, ...groupVars] }
						</QVGroupDisplay>;
		});
	}
	render() {
		if (!this.props.applications.selectedApplication) {
			return <div></div>
		}
		return (
			<div>
				<div className="row align-center">
					<h3 className="text-center">Variable Groups for {this.props.applications.selectedApplication}</h3>
				</div>
				<div className="row">
					<div className="column small-6">
						{this.renderGroupSelect()}
					</div>

					<div className="column small-5">
						<input
								type="text"
								placeholder="Search"
								value={this.props.appState.searchText}
								onChange={(e) => this.props.dispatch(updateSearchText(e.target.value))}
						/>
					</div>
					<div className="column small-1 align-middle">
						<button type="button" className="button"
							onClick={() => this.props.dispatch(updateSearchText(''))}
						>
							Clear
						</button>
					</div>

				</div>

				{this.renderQVVariables()}

			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		applications: state.applications,
		qvVariables: state.qvVariables,
		appState: state.appState
	}
};

export default connect(mapStateToProps)(QVVarsDisplay);
