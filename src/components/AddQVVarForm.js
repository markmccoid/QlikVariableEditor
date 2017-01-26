import React from 'react';
import { Field, reduxForm } from 'redux-form';

const APP_DROPDOWN_DEFAULT = 'Select an Application...';
const GROUP_DROPDOWN_DEFAULT = 'Select an Group...';

//Validation function that redux forms will use to validate input
const validate = values => {
	const errors = {}
	if (!values.name) {
		errors.name = 'Required';
	}
	if (!values.description) {
		errors.description = 'Required';
	}
	if (!values.expression) {
		errors.expression = 'Required';
	}
	if (values.group === GROUP_DROPDOWN_DEFAULT) {
		errors.group = 'Select a Group';
	}
	return errors;
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
			<select {...props.input}
				onChange={(e) => {
					props.myOnChange(e);
					props.input.onChange(e);
				}}
				value={props.currApplication}
				>
				{props.data.map(item => <option key={item} value={item}>{item}</option>)}
			</select>
		</div>
	);
};

class AddQVVarForm extends React.Component {

	render() {
	  const { handleSubmit, invalid, submitting, renderAllFields } = this.props;
		const noSpaces = value => value.replace(/ /g,'');
		let formNextFields = '';
		if (renderAllFields) {
			formNextFields =
				<div>
					<div className="column small-3">
							<Field name="group" component={renderDropDown} type="select" placeholder="Group" data={[GROUP_DROPDOWN_DEFAULT, ...this.props.groupList]} />
					</div>
					<div className="column small-6">
						<Field name="name" component={renderField} type="text" placeholder="Name(no spaces)" normalize={noSpaces}/>
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
					<button className="button small" onClick={() => {
							this.props.onClearForm();
							this.props.destroy({form: "qvAddVar"});
						}}>Clear</button>
					</div>
				</div>;
		}

		return (
			<div className="row">
				<div className="columns callout secondary" style={{margin:"0 15px"}}>
					<h4>Add Qlikview Variable</h4>
						<form onSubmit={handleSubmit(data => {
									this.props.destroy({form: "qvAddVar"});
									this.props.onSaveToSever(data);
								})
							}>
							<div className="column small-3">
									<Field name="application"
										component={renderDropDownWOnChange} type="select"
										placeholder="Application"
										myOnChange={(e) => this.props.onApplicationChange(e.target.value)}
										data={[APP_DROPDOWN_DEFAULT, ...this.props.applicationList]}
										currApplication={this.props.currApplication}
									/>
							</div>
							{formNextFields}
						</form>
				</div>
			</div>
		);
	}
}

AddQVVarForm.propTypes = {
	renderAllFields: React.PropTypes.bool,
	onSaveToSever: React.PropTypes.func,
	onClearForm: React.PropTypes.func,
	onApplicationChange: React.PropTypes.func,
	applicationList: React.PropTypes.array,
	currApplication: React.PropTypes.string,
	groupList: React.PropTypes.array
}

AddQVVarForm = reduxForm({
		form: 'qvAddVar',
		validate
	})(AddQVVarForm);

export default AddQVVarForm;
