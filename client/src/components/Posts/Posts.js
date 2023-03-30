import React from 'react';
import { useSelector } from 'react-redux';
import Post from './Post/Post';
import { Grid } from '@mui/material';
import Loader from '../Loader/Loader';

const Posts = ({ handleModal }) => {
  const { loading, posts: postList } = useSelector((state) => state.posts);
  if (loading) {
    return <Loader />
  }

  // render the posts
  return (
    <>
      {postList?.map((post) => (
        <Grid key={post?._id} item xs={12} sm={6} md={3}>
          <Post post={post} handleModal={handleModal}/>
        </Grid>
      ))}
    </>
  );
};

export default Posts;
