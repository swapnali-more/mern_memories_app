import axios from "axios";

const API = axios.create({baseURL: 'http://localhost:4000'})

API.interceptors.request.use((req) => {
  if(localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
  }

  return req;
})

// Fetch all posts
export const fetchPosts = () => {
  return API.get('/posts');
}

// Create a new post
export const createPost = (newPost) => {
  return API.post('/posts', newPost);
}

// Update an existing post
export const updatePost = (id, updatedPost) => {
  return API.patch(`/posts/${id}`, updatedPost);
}

// Delete a post by id
export const deletePost = (id) => {
  return API.delete(`/posts/${id}`);
}

// Increment the like count of a post by id
export const likePost = (id) => {
  return API.patch(`/posts/${id}/likePost`);
}

export const createUser = (newUser) => {
  return API.post('/users/create-user', newUser)
}

export const loginUser = (user) => {
  return API.post('/users/login', user)
}
