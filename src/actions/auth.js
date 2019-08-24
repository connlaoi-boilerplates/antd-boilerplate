import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT_SUCCESS
} from "../constants/actionTypes";

import { message } from "antd";
import axios from "axios";

import { randomGreeting } from "../helpers/random";

import Config from "../constants/config";

// Check token and load user
export const loadUser = params => (dispatch, getState) => {
  // user is loading
  dispatch({ type: LOGIN_LOADING });

  // fetch user
  axios({
    method: "post",
    url: `${Config.API_PREFIX}/auth/login`,
    headers: {},
    data: {
      email: params.email,
      password: params.password
    }
  })
    .then(res => {
      if (res.data.success === true) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { data: res.data.data, message: res.data.message }
        });
        message.success(randomGreeting(`${res.data.data.firstName}`));
      } else {
        dispatch({ type: LOGIN_FAIL, error: res.data.message });
        message.error(res.data.message);
      }
    })
    .catch(err => {
      dispatch({ type: LOGIN_FAIL, error: err });
      message.error(JSON.stringify(err.message));
    });
};

// Logout
export const logoutUser = params => (dispatch, getState) => {
  // user is logging out
  dispatch({ type: LOGOUT_SUCCESS });
};
