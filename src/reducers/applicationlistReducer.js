import * as C from '../actions/actions';

export const applicationListReducer = (state = [], action) => {
	console.log('reducer', action.type);
	switch (action.type) {
		case C.LOAD_APPLICATION_LIST:
			return action.payload;
		default:
			return state;
	}
};
