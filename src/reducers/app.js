import {
  TOGGLE_COLLAPSED,
  TOGGLE_THEME,
  TOGGLE_LAYOUT
} from "../constants/actionTypes";

const initialState = { theme: true, collapsed: true, layout: true };

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return {
        ...state,
        theme: !state.theme
      };
    case TOGGLE_COLLAPSED:
      return {
        ...state,
        collapsed: !state.collapsed
      };
    case TOGGLE_LAYOUT:
      return {
        ...state,
        layout: !state.layout
      };
    default:
      return state;
  }
};

export default appReducer;
