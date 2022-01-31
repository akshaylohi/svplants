import { combineReducers } from "redux";
import plants from "./plants.reducer";

const appReducers = combineReducers({
	plants
});

const rootReducer = (state, action) => {
	return appReducers(state, action);
};

export default rootReducer;
