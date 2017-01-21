import * as C from '../actions/actions';

export const appStateReducer = (state = [], action) => {
	switch (action.type) {
		case C.UPDATE_GROUP_VALUE:
			return {
					selectedGroup: action.selectedGroup,
					selectedVariableId: null,
					editing: false,
					searchText: ''
			};
		case C.UPDATE_SELECTED_VAR:
			return {
				...state,
				selectedVariableId: action.payload
			};
		case C.UPDATE_EDIT_STATE:
			let editState = true;
			if (!action.payload) {
				editState = false;
			}
			return {
				...state,
				selectedVariableId: action.payload,
				editing: editState
			}
		//--when loading new application variables,
		//--clear out the selectedGroup, selectedVariableId & set editing flag to false
		case C.LOAD_APPLICATION_VARS:
			return {
				selectedGroup: '',
				selectedVariableId: null,
				editing: false,
				searchText: ''
			};

		case C.UPDATE_SEARCH_TEXT:
			return {
				...state,
				searchText: action.payload
			};
		default:
			return state;
	}
};
