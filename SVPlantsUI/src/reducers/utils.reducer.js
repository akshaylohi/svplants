import _ from "lodash";

import { SET_PLANTS_HEALTH } from "../actions/types";


const INITIAL_STATE = {
    plantsHealth: {}
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SET_PLANTS_HEALTH:
            return {plantsHealth: action.payload};
	    default:
			return state;
	}
};