import React from 'react';
import { Tooltip } from 'antd';

const QVVarItem = (props) => {
	// if (props.selectedVariableId === props.qvVar.id) {
	// 	return (
	// 		<div className="column small-12 variable-display">
	// 			<div className="column small-4">
	// 				<label>Name:</label>
	// 				<div className="field-item"> {props.qvVar.name || '-'} </div>
	// 			</div>
	// 			<div className="column small-8">
	// 				<label>Description:</label>
	// 				<div className="field-item"> {props.qvVar.description || '-'} </div>
	// 			</div>
	// 			<div className="column small-12">
	// 				<label>Expression:</label>
	// 				<div className="field-item"> {props.qvVar.expression || '-'} </div>
	// 			</div>
	// 			<div className="column small-8">
	// 				<label>Notes:</label>
	// 				<div className="field-item"> {props.qvVar.notes || '-'} </div>
	// 			</div>
	// 			<div className="column small-4">
	// 				<label>Locked:</label>
	// 				<div className={props.qvVar.locked ? "field-item locked" : "field-item"}>
	// 					{props.qvVar.locked ? <span>True <Icon type="lock" style={{float: "right"}}/></span> : "False"} </div>
	// 			</div>
	// 			<div className="column small-12">
	// 				<button className="button small" style={{marginRight:"5px"}}>Edit</button>
	// 				<button className="button small" onClick={() => props.onSelectVar(null)}>Close</button>
	// 			</div>
	// 		</div>
	// 	);
	// }
	return (
			<div className="column small-4">
				<Tooltip title={props.qvVar.description}>
					<a onClick={() => props.onSelectVar(props.qvVar.id)}>
						<div className="field-item"> {props.qvVar.name} </div>
					</a>
				</Tooltip>
			</div>
	);
};

QVVarItem.propTypes = {
	onSelectVar: React.PropTypes.func, //redux function to update selectedVariableId in store
	selectedVariableId: React.PropTypes.string,
	qvVar: React.PropTypes.shape({
		id: React.PropTypes.string,
		application: React.PropTypes.string,
		name: React.PropTypes.string,
		description: React.PropTypes.string,
		expression: React.PropTypes.oneOfType([
								    React.PropTypes.string,
								    React.PropTypes.number
									]),
		notes: React.PropTypes.string,
		group: React.PropTypes.string,
		locked: React.PropTypes.boolean
	})
}


export default QVVarItem;

// const QVVarItem = (props) => {
// 	return (
// 		<div className="row" style={{border:"1px solid red", marginBottom:"5px"}}>
// 			<div className="column small-4">
// 				<div className="field-item"> {props.qvVar.name} </div>
// 			</div>
// 			<div className="column small-8">
// 				<div className="field-item"> {props.qvVar.description} </div>
// 			</div>
// 		</div>
// 	);
// };
