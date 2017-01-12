import { createStore, combineReducers, applyMiddleware, compose, reduxMiddleware } from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';

import { qvVariableReducer } from '../reducers/qvVariableReducer';
import { applicationListReducer } from '../reducers/applicationListReducer';

//Import reducers..
//import { newShowsInfoReducer } from '../reducers/newShowsInfoReducer';


//!!!!--Take out in production -- Using for testing to make sure not mutating state in reducers
import freeze from 'redux-freeze';

//Setup the initil redux state
const INITIAL_STATE = {
			applicationList: [],
			qvVariables: []
		};
//--------------------------------------------
//-Create Store - This is called from app.js
//--------------------------------------------
export var configure = (initialState = INITIAL_STATE) => {
//define which pieces of state are handled by which reducer
	var reducer = combineReducers({
			applicationList: applicationListReducer,
			qvVariables: qvVariableReducer
	});
//Create the store that will be returned.
	var store = createStore(reducer, initialState, compose(applyMiddleware(promise, thunk, freeze),
			window.devToolsExtension ? window.devToolsExtension() : f => f));

	return store;
}

//From Redux documentation -- Thinking I could use this to apply the Promise middleware.
// import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
// import thunk from 'redux-thunk'
// import DevTools from './containers/DevTools'
// import reducer from '../reducers/index'

// const store = createStore(
//   reducer,
//   compose(
//     applyMiddleware(thunk),
//     DevTools.instrument()
//   )
// )

