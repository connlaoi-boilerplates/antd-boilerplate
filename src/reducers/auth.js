import {
  LOGIN_FAIL,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  LOGOUT_SUCCESS
} from "../constants/actionTypes";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoginLoading: false,
  isLoginSuccess: false,
  isRegisterLoading: false,
  isRegisterSuccess: false,
  user: null,
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_LOADING:
      return {
        ...state,
        isLoginLoading: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoginLoading: false,
        isLoginSuccess: true,
        isAuthenticated: true,
        token: action.payload.data.token,
        user: {
          id: action.payload.data.id,
          email: action.payload.data.email,
          firstName: action.payload.data.firstName,
          lastName: action.payload.data.lastName,
          accountType: action.payload.data.accountType
        }
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoginLoading: false,
        error: action.error
      };
    case REGISTER_LOADING:
      return {
        ...state,
        isRegisterLoading: true
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isRegisterLoading: false,
        isAuthenticated: true
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isRegisterLoading: false,
        error: action.error
      };
    case LOGOUT_SUCCESS:
      return {
        ...initialState,
        token: null
      };
    default:
      return state;
  }
};

export default authReducer;
