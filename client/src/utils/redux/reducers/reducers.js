import {
  UPDATE_MESSAGES,
  UPDATE_MESSAGE,
  UPDATE_CURRENT_MESSAGE,
  UPDATE_CURRENT_USER,
  UPDATE_LOGGED_IN,
  CLEAR_STATE,
} from "../actions/action.js";

var initState = {
  messages: [],
  currentUser: {},
  loggedIn: false,
  current_message: {},
};

const reducers = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_MESSAGES: {
      return {
        ...state,
        messages: action.messages,
      };
    }
    case UPDATE_CURRENT_MESSAGE: {
      return {
        ...state,
        current_message: action.current_message,
      };
    }
    case UPDATE_MESSAGE: {
      return {
        ...state,
        messages: [...state.messages, action.message],
      };
    }
    case UPDATE_CURRENT_USER: {
      return {
        ...state,
        currentUser: action.currentUser,
      };
    }
    case UPDATE_LOGGED_IN: {
      return {
        ...state,
        loggedIn: action.loggedIn,
      };
    }
    case CLEAR_STATE: {
      return initState;
    }
    default: {
      return state;
    }
  }
};

export default reducers;
