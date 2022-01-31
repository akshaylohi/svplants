import _ from "lodash";

import { GET_PLANT, GET_PLANTS, EDIT_PLANT, ADD_PLANT, DELETE_PLANT, WATER_PLANT, STOP_WATER_PLANT, CLEAR_PLANTS } from "../actions/types";


const INITIAL_STATE = {

};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADD_PLANT:
            return {...state, [action.payload.plantId]:action.payload}
		case EDIT_PLANT:
			return { ...state, [action.payload.plantId]: action.payload };
        case GET_PLANT:
            return { ...state, [action.payload.plantId]: action.payload };   
		case GET_PLANTS:
			return { ...state, ..._.mapKeys(action.payload, "plantId") };
		case DELETE_PLANT:
			return  _.omit(state, action.payload.plantId);
		case CLEAR_PLANTS:
			return INITIAL_STATE;
        case WATER_PLANT:
            return { ...state, [action.payload.plantId]: action.payload };
        case STOP_WATER_PLANT:
            return { ...state, [action.payload.plantId]: action.payload };
		default:
			return state;
	}
};