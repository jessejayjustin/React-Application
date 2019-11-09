import { FETCH_CHARITIES_SUCCESS, UPDATE_TOTAL_DONATIONS, UPDATE_MESSAGE, ERROR_MESSAGE } from "../action-types";

const initialState = {
   donations: 0,
   charities: [],
   message: '',
   error: null
};

function appReducer(state = initialState, action) {
	switch (action.type) {
		
		case FETCH_CHARITIES_SUCCESS:
		return Object.assign({}, state, {
		  charities: state.charities.concat(action.payload)
		});

		case UPDATE_TOTAL_DONATIONS:
		return Object.assign({}, state, {
		  donations: state.donations + action.payload
		});

		case UPDATE_MESSAGE:
		return Object.assign({}, state, {
		  message: action.payload
		});

		case ERROR_MESSAGE:
		return Object.assign({}, state, {
		  error: action.payload
		});

		default: return state;
    }
}

export default appReducer;