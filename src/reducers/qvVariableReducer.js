import * as C from '../actions/actions';

export const qvVariableReducer = (state = [], action) => {
	console.log('reducer', action.type);
	switch (action.type) {
		case C.LOAD_APPLICATION_VARS:
			return action.payload;
		default:
			return state;
	}
};
