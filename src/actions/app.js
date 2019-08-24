import {
  TOGGLE_THEME,
  TOGGLE_COLLAPSED,
  TOGGLE_LAYOUT
} from "../constants/actionTypes";

export const toggleTheme = () => dispatch => {
  dispatch({ type: TOGGLE_THEME });
};

export const toggleCollapsed = () => dispatch => {
  dispatch({ type: TOGGLE_COLLAPSED });
};

export const toggleLayout = () => dispatch => {
  dispatch({ type: TOGGLE_LAYOUT });
};
