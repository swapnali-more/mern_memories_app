import * as api from "../../api/index";
import { postActionTypes } from "../../constants/actionTypes";

const ERROR_MESSAGE = 'Something went wrong. Please try again.';

/**
 * Creates a new user.
 * Dispatches NEW_USER_SUCCESS or NEW_USER_FAILURE actions.
 * @param {Object} user - The user to be created.
 */
export const createUser = (user) => async (dispatch) => {
  try {
    const { data } = await api.createUser(user);
    dispatch({ 
      type: postActionTypes.NEW_USER_SUCCESS, 
      payload: data 
    });
  } catch (error) {
    dispatch({ 
      type: postActionTypes.NEW_USER_FAILURE, 
      payload: ERROR_MESSAGE 
    });
  }
};

/**
 * Logs in a user.
 * Dispatches LOGIN_USER_SUCCESS or LOGIN_USER_FAILURE actions.
 * @param {Object} user - The user to be logged in.
 */
export const loginUser = (user) => async (dispatch) => {
  try {
    const { data } = await api.loginUser(user); 
    dispatch({ 
      type: postActionTypes.LOGIN_USER_SUCCESS, 
      payload: data 
    });
  } catch (error) {
    dispatch({ 
      type: postActionTypes.LOGIN_USER_FAILURE, 
      payload: error.message 
    });
  }
};

/**
 * Logout in a user.
 * Dispatches LOGOUT_USER_SUCCESS or LOGOUT_USER_FAILURE actions.
 */
export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({ 
      type: postActionTypes.LOGOUT_USER_SUCCESS, 
      payload: null
    });
  } catch (error) {
    dispatch({ 
      type: postActionTypes.LOGOUT_USER_FAILURE, 
      payload: error.message 
    });
  }
};
