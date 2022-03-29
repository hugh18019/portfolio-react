import {
  UPDATE_MESSAGES,
  UPDATE_MESSAGE,
  UPDATE_CURRENT_MESSAGE,
} from "../actions/action.js";

var initState = {
  messages: [],
  current_message: {},
};

const message_reducers = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_MESSAGES: {
      return {
        ...state,
        messages: action.messages,
      };
    }
    case UPDATE_MESSAGE: {
      return {
        ...state,
        messages: [...state.messages, action.message],
      };
    }
    case UPDATE_CURRENT_MESSAGE: {
      return {
        ...state,
        current_message: action.current_message,
      };
    }
    default: {
      return state;
    }
  }
};

export default message_reducers;
