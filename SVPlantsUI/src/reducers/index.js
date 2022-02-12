import { combineReducers } from "redux";
import plants from "./plants.reducer";
import utils from "./utils.reducer";

const appReducers = combineReducers({
	plants,
	utils
});

const rootReducer = (state, action) => {
	return appReducers(state, action);
};

export default rootReducer;
