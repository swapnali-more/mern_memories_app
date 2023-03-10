import * as api from "../../api/index";
import { postActionTypes } from "../../constants/actionTypes";

const ERROR_MESSAGE = 'Something went wrong. Please try again.';

/**
 * Fetches all posts from the API.
 * Dispatches FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS or FETCH_POSTS_FAILURE actions.
 */
export const fetchPosts = () => async (dispatch) => {
  try {
    dispatch({ 
      type: postActionTypes.FETCH_POSTS_REQUEST 
    });
    const { data } = await api.fetchPosts();
    dispatch({ 
      type: postActionTypes.FETCH_POSTS_SUCCESS, 
      payload: data 
    });
  } catch (error) {
    dispatch({ 
      type: postActionTypes.FETCH_POSTS_FAILURE, 
      payload: error.message 
    });
  }
};

/**
 * Creates a new post.
 * Dispatches FETCH_POSTS_REQUEST, CREATE_POST_SUCCESS or CREATE_POST_FAILURE actions.
 * @param {Object} post - The post to be created.
 */
export const createPost = (post) => async (dispatch) => {
  try {
    dispatch({ 
      type: postActionTypes.FETCH_POSTS_REQUEST 
    });
    const { data } = await api.createPost(post);
    dispatch({ 
      type: postActionTypes.CREATE_POST_SUCCESS, 
      payload: data 
    });
  } catch (error) {
    dispatch({ 
      type: postActionTypes.CREATE_POST_FAILURE, 
      payload: ERROR_MESSAGE 
    });
  }
};

/**
 * Updates an existing post.
 * Dispatches UPDATE_POST_SUCCESS or UPDATE_POST_FAILURE actions.
 * @param {string} id - The ID of the post to update.
 * @param {Object} post - The updated post data.
 */
export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ 
      type: postActionTypes.UPDATE_POST_SUCCESS, 
      payload: data 
    });
  } catch (error) {
    dispatch({ 
      type: postActionTypes.UPDATE_POST_FAILURE, 
      payload: ERROR_MESSAGE 
    });
  }
};

/**
 * Deletes an existing post.
 * Dispatches DELETE_POST_SUCCESS or DELETE_POST_FAILURE actions.
 * @param {string} id - The ID of the post to delete.
 */
export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ 
      type: postActionTypes.DELETE_POST_SUCCESS, 
      payload: id 
    });
  } catch (error) {
    dispatch({ 
      type: postActionTypes.DELETE_POST_FAILURE, 
      payload: ERROR_MESSAGE 
    });
  }
};

/**
 * Likes an existing post.
 * Dispatches UPDATE_POST_SUCCESS or UPDATE_POST_FAILURE actions.
 * @param {string} id - The ID of the post to like.
 */
export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ 
      type: postActionTypes.UPDATE_POST_SUCCESS, 
      payload: data 
    });
  } catch (error) {
    dispatch({ 
      type: postActionTypes.UPDATE_POST_FAILURE, 
      payload: ERROR_MESSAGE 
    });
  }
};
