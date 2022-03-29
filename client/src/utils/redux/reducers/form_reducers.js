import { SHOW_FORM } from "../actions/action";

var initState = {
  show_form: false,
};

const reducers = (state = initState, action) => {
  switch (action.type) {
    case SHOW_FORM: {
      return {
        ...state,
        show_form: action.show_form,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducers;
