import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, destroy } from 'redux-form';

import { startLoadApplicationVars } from '../actions/actions';
import qvVarHandling from '../api/qvVarHandling';
import api from '../api';

//Validation function that redux forms will use to validate input
const validate = values => {
	const errors = {}
	if (!values.name) {
		errors.name = 'Required'
	}
	if (!values.description) {
		errors.description = 'Required'
	}
	if (!values.expression) {
		errors.expression = 'Required'
	}
	return errors
};

//---------------------------------------------------
//--Redux-forms custom field functions
//---------------------------------------------------
	const renderField = (props) => {
		return (
			<div>
				<label style={{height:"28px"}}>{props.placeholder}:
					{props.meta.touched && props.meta.error ? <span className="field-error">{props.meta.error}</span> : null}
				</label>
					<input {...props.input} type={props.type}/>
			</div>
		)
	};
	const renderTextArea = (props) => {
		return (
			<div>
				<label style={{height:"28px"}}>{props.placeholder}:
					{props.meta.touched && props.meta.error ? <span className="field-error">{props.meta.error}</span> : null}
				</label>
					<textarea {...props.input} type={props.type} />
			</div>
		)
	};
	const renderDropDown = (props) => {
		return (
			<div>
				<label style={{height:"28px"}}>{props.placeholder}:</label>
				<select {...props.input}>
					{props.data.map(item => <option key={item} value={item}>{item}</option>)}
				</select>
			</div>
		);
	};
	const renderDropDownWOnChange = (props) => {
		return (
			<div>
				<label style={{height:"28px"}}>{props.placeholder}:</label>
				<select {...props.input} onChange={(e) => {
						props.myOnChange(e);
						props.input.onChange(e);
					}}>
					{props.data.map(item => <option key={item} value={item}>{item}</option>)}
				</select>
			</div>
		);
	};

class AddQVVar extends React.Component {
	state = {
		currApplication: '',
		groupList: []
	};

	saveToServer(data) {
		console.log(data);
		api.addQlikVariable(data)
			.then(resp => {
				this.setState({
					currApplication: '',
					groupList: []
				});
				destroy({form: "qvAddVar"});
			});
	}
	onClearForm(e) {
		console.log('clear form');
	}
	render() {
	  const { handleSubmit, invalid, submitting, qvAddVar } = this.props;

		let formNextFields = '';
		if (this.state.currApplication !== '' && this.state.currApplication !== 'Select an Application...') {
			formNextFields =
				<div>
					<div className="column small-3">
							<Field name="group" component={renderDropDown} type="select" placeholder="Group" data={this.state.groupList} />
					</div>
					<div className="column small-6">
						<Field name="name" component={renderField} type="text" placeholder="Name" />
					</div>
					<div className="column small-12">
						<Field name="description" component={renderField} type="text" placeholder="Description"/>
					</div>
					<div className="column small-12">
						<Field name="expression" component={renderTextArea} type="text" placeholder="Expression"/>
					</div>
					<div className="column small-8">
						<Field name="notes" component={renderTextArea} type="text" placeholder="Notes"/>
					</div>
					<div className="column small-4">
						<Field name="locked" component={renderField} type="checkbox" placeholder="Locked"/>
					</div>
					<div className="column small-12">
						<button
								type="submit"
								className="button small"
								style={{marginRight:"5px"}}
								disabled={invalid || submitting}
						>Save</button>
					<button className="button small" onClick={(e) => this.onClearForm(e)}>Clear</button>
					</div>
				</div>;
		}

		return (
			<div className="row">
				<div className="columns callout secondary" style={{margin:"0 15px"}}>
					<h4>Add Qlikview Variable</h4>
						<form onSubmit={handleSubmit(data => this.saveToServer(data))}>
							<div className="column small-3">
									<Field name="application"
										component={renderDropDownWOnChange} type="select"
										placeholder="Application"
										myOnChange={(e) => {
												console.log(e.target.value);
												this.setState({currApplication: e.target.value});
												api.getApplicationVariables(e.target.value)
													.then(data => this.setState({groupList: qvVarHandling.createGroupList(data).slice(1)}));
											}}
										data={['Select an Application...', ...this.props.applicationList]} />
							</div>
							{formNextFields}
						</form>
				</div>
			</div>
		);
	};
}

AddQVVar = reduxForm({
		form: 'qvAddVar',
		validate
	})(AddQVVar);

const mapStateToProps = (state) => {
	return {
		applicationList: state.applications.applicationList,
		qvAddVar: state.form.qvAddVar,
		initialValues: {application: 'Select an Application...', locked: false}
	};
};

export default connect(mapStateToProps)(AddQVVar);
