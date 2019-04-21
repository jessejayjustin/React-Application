import { FETCH_CHARITIES, UPDATE_TOTAL_DONATE, UPDATE_MESSAGE } from "../action-types";

const initialState = {
   donate: 0,
   charities: [],
   message: ''
};

function appReducer(state = initialState, action) {
	switch (action.type) {
		
		case FETCH_CHARITIES:
		  return Object.assign({}, state, {
		    charities: state.charities.concat(action.payload)
		  });

		case UPDATE_TOTAL_DONATE:
		  return Object.assign({}, state, {
		    donate: state.donate + action.payload
		  });

		case UPDATE_MESSAGE:
		  return Object.assign({}, state, {
		    message: action.payload
		  });
       
		default: return state;
    }
}

export default appReducer;