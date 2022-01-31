import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./components/App";
import reducers from "./reducers";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const stateStore = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
);


toast.configure({
  position: "top-right",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  style: { fontSize: "1.3em" },
});



ReactDOM.render(
  <Provider store={stateStore}>
      <App />
	</Provider>,
	document.querySelector("#root")
);
