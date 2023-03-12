import { postActionTypes } from "../../constants/actionTypes";

// define the initial state for the reducer
const initialState = {
  posts: [],
  loading: false,
  error: null,
};

// helper function to update the post array in the state
const updatePostArray = (posts, updatedPost) => {
  return posts.map((post) =>
    post._id === updatedPost._id ? { ...post, ...updatedPost } : post
  );
};

// define the postsReducer function that will be used by Redux to manage the state
const postsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  
  // use a switch statement to handle the different types of actions
  switch (type) {
    case postActionTypes.FETCH_POSTS_REQUEST:
      // return a new state object with loading set to true
      return { ...state, loading: true };
    case postActionTypes.FETCH_POSTS_SUCCESS:
      // return a new state object with loading set to false and posts set to the payload
      return { ...state, loading: false, posts: payload };
    case postActionTypes.FETCH_POSTS_FAILURE:
      // return a new state object with loading set to false and error set to the payload
      return { ...state, loading: false, error: payload };
    case postActionTypes.CREATE_POST_SUCCESS:
      // return a new state object with loading set to false and the new post added to the posts array
      return {
        ...state,
        loading: false,
        posts: [...state.posts, payload],
      };
    case postActionTypes.CREATE_POST_FAILURE:
      // return a new state object with loading set to false and error set to the payload
      return { ...state, loading: false, error: payload };
    case postActionTypes.UPDATE_POST_SUCCESS:
      // use the updatePostArray helper function to update the posts array in the state
      const updatedPosts = updatePostArray(state.posts, payload);
      // return a new state object with loading set to false and posts set to the updatedPosts array
      return { ...state, loading: false, posts: updatedPosts };
    case postActionTypes.UPDATE_POST_FAILURE:
      // return a new state object with loading set to false and error set to the payload
      return { ...state, loading: false, error: payload };
    case postActionTypes.DELETE_POST_SUCCESS:
      // return a new state object with loading set to false and the deleted post removed from the posts array
      const deletedPosts = state.posts.filter(post => post._id !== payload);
      return { ...state, loading: false, posts: deletedPosts };
    case postActionTypes.DELETE_POST_FAILURE:
      // return a new state object with loading set to false and error set to the payload
      return { ...state, loading: false, error: payload };
    default:
      // if the action type is not recognized, return the current state
      return state;
  }
};

export default postsReducer;


