import { postActionTypes } from "../../constants/actionTypes";

const initialState = {
  auth: [],
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    // When a new user is successfully created, update the localStorage and add the new user to the state
    case postActionTypes.NEW_USER_SUCCESS:
      localStorage.setItem('profile', JSON.stringify(payload));
      return {
        ...state,
        loading: false,
        user: [...state.user, payload]
      };

    // When creating a new user fails, update the state with the error message
    case postActionTypes.NEW_USER_FAILURE:
      return { ...state, loading: false, error: payload };

    // When a user logs in successfully, update the localStorage and update the state with the user's information
    case postActionTypes.LOGIN_USER_SUCCESS:
      localStorage.setItem('profile', JSON.stringify(payload));
      return {
        ...state,
        loading: false,
        user: payload
      };

    // When logging in fails, update the state with the error message
    case postActionTypes.LOGIN_USER_FAILURE:
      return { ...state, loading: false, error: payload };

    // When a user logs out successfully, remove the user information from the state
    case postActionTypes.LOGOUT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: null
      };

    // When logging out fails, update the state with the error message
    case postActionTypes.LOGOUT_USER_FAILURE:
      return { ...state, loading: false, error: payload };

    // For any other action type, return the current state
    default:
      return state;
  }
}

export default authReducer;
