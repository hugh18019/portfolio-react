import { combineReducers } from "redux";
import reducers from "./reducers";
import message_reducers from "./message_reducers";
import form_reducers from "./form_reducers";

const rootReducer = combineReducers({
  main: reducers,
  // message_reducers: message_reducers,
  form_reducers: form_reducers,
});

export default rootReducer;
