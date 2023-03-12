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
    console.log(data)
    dispatch({ 
      type: postActionTypes.NEW_USER_SUCCESS, 
      payload: data 
    });
  } catch (error) {
    console.log(error)
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
    console.log(data, "login")
    dispatch({ 
      type: postActionTypes.LOGIN_USER_SUCCESS, 
      payload: data 
    });
  } catch (error) {
    console.log(error, "login")
    dispatch({ 
      type: postActionTypes.LOGIN_USER_FAILURE, 
      payload: error.message 
    });
  }
};
