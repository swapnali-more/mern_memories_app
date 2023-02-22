export const postActionTypes = {
    //Represents the action of requesting posts from an API or server.
    FETCH_POSTS_REQUEST: 'FETCH_POSTS_REQUEST',
    //Represents the action of successfully receiving posts data.
    FETCH_POSTS_SUCCESS: 'FETCH_POSTS_SUCCESS',
    //Represents the action of failing to receive posts data.
    FETCH_POSTS_FAILURE: 'FETCH_POSTS_FAILURE',
    //Represents the action of successfully creating a new post.
    CREATE_POST_SUCCESS: 'CREATE_POST_SUCCESS',
    //Represents the action of failing to create a new post.
    CREATE_POST_FAILURE: 'CREATE_POST_FAILURE',
    //Represents the action of successfully updating an existing post.
    UPDATE_POST_SUCCESS: 'UPDATE_POST_SUCCESS',
    //Represents the action of failing to update an existing post.
    UPDATE_POST_FAILURE: 'UPDATE_POST_FAILURE',
    //Represents the action of successfully deleting an existing post.
    DELETE_POST_SUCCESS: 'DELETE_POST_SUCCESS',
    //Represents the action of failing to delete an existing post.
    DELETE_POST_FAILURE: 'DELETE_POST_FAILURE',
    //Represents the action of an error occurring in the application.
    ERROR: 'ERROR',
};