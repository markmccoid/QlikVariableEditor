import axios from 'axios';
import api from '../api';

//Initialization Actions
//export const INITIALIZE_STORE = 'INITIALIZE_STORE';

//QV Variable Actions
export const LOAD_APPLICATION_VARS = 'LOAD_APPLICATION_VARS';
export const LOAD_APPLICATION_LIST = 'LOAD_APPLICATION_LIST';

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
export const loadApplicationVariables = (qvVariables) => {
	return {
			type: LOAD_APPLICATION_VARS,
			payload: qvVariables
		};
};

export var startLoadApplicationVars = (appName) => {

	return dispatch => {
		var request = api.getApplicationVariables(appName);
		return request.then(qvVariables => {
			dispatch(loadApplicationVariables(qvVariables));
		});
	};
};
