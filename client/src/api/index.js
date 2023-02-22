import axios from "axios";

const url = "http://localhost:4000/posts";

// Fetch all posts
export const fetchPosts = () => {
  return axios.get(url);
}

// Create a new post
export const createPost = (newPost) => {
  return axios.post(url, newPost);
}

// Update an existing post
export const updatePost = (id, updatedPost) => {
  return axios.patch(`${url}/${id}`, updatedPost);
}

// Delete a post by id
export const deletePost = (id) => {
  return axios.delete(`${url}/${id}`);
}

// Increment the like count of a post by id
export const likePost = (id) => {
  return axios.patch(`${url}/${id}/likePost`);
}
