import axios from 'axios';
import api from '../api';

//Initialization Actions
//export const INITIALIZE_STORE = 'INITIALIZE_STORE';

//Loading Application List
export const LOAD_APPLICATION_LIST = 'LOAD_APPLICATION_LIST';

//QV Variable Actions
export const LOAD_APPLICATION_VARS = 'LOAD_APPLICATION_VARS';
export const UPDATE_APPLICATION_VAR = 'UPDATE_APPLICATION_VAR';
export const DELETE_APPLICATION_VAR = 'DELETE_APPLICATION_VAR';

//AppState Actions
export const UPDATE_GROUP_VALUE = 'UPDATE_GROUP_VALUE';
export const UPDATE_SELECTED_VAR = 'UPDATE_SELECTED_VAR'
export const UPDATE_EDIT_STATE = 'UPDATE_EDIT_STATE';
export const UPDATE_SEARCH_TEXT = 'UPDATE_SEARCH_TEXT';

//-----------------------------------------------
export const loadApplicationList = (appList) => {
	return {
		type: LOAD_APPLICATION_LIST,
		payload: appList
	}
};

export const startLoadApplicationList = () => {
	return dispatch => {
		//Get list of Applications in the QVVariables.json file on server
		var request = api.getApplicationNames();
			request.then(data => {
				dispatch(loadApplicationList(data));
			});
	};
};
//-----------------------------------------------
//--QV Variable Actions ------------
//-----------------------------------------------
export const loadApplicationVariables = (qvVariables, appName) => {
	return {
			type: LOAD_APPLICATION_VARS,
			qvVariables,
			appName
		};
};

export const startLoadApplicationVars = (appName) => {

	return dispatch => {
		var request = api.getApplicationVariables(appName);
		return request.then(qvVariables => {
			dispatch(loadApplicationVariables(qvVariables, appName));
		});
	};
};

//--Update Application varaible --- Updates a single variable in the currently
//--loaded "application" variable list
export const updateApplicationVar = qvVarObj => {
	return {
		type: UPDATE_APPLICATION_VAR,
		payload: qvVarObj
	};
};

export const startUpdateApplicationVar = qvVarObj => {
	return dispatch => {
		return api.updateQlikVariable(qvVarObj)
			.then(response => {
				dispatch(updateApplicationVar(qvVarObj));
			});
	};
};
//----END Update Application Var ----

//--Delete Application varaible -- Deletes a single variable in the currently
//--loaded "application" variable list
export const deleteApplicationVar = qvVarId => {
	return {
		type: DELETE_APPLICATION_VAR,
		payload: qvVarId
	};
};

export const startDeleteApplicationVar = qvVarId => {
	return dispatch => {
		return api.deleteQlikVariable(qvVarId)
			.then(response => {
				dispatch(deleteApplicationVar(qvVarId));
			});
	};
};
//----END Delete Application Var ----

//AppState Action
export const updateSelectedGroup = selectedGroup => {
	return {
		type: UPDATE_GROUP_VALUE,
		selectedGroup
	};
};

export const updateSelectedVariable = qvVarId => {
	return {
		type: UPDATE_SELECTED_VAR,
		payload: qvVarId
	};
};

export const updateEditState = qvVarId => {
	return {
		type: UPDATE_EDIT_STATE,
		payload: qvVarId
	};
};

export const updateSearchText = text => {
	return {
		type: UPDATE_SEARCH_TEXT,
		payload: text
	};
};
