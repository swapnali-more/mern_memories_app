import React from 'react';
import { useSelector } from 'react-redux';
import Post from './Post/Post';
import { CircularProgress, Grid } from '@mui/material';

const Posts = ({ handleModal }) => {
  const { loading, posts: postList } = useSelector((state) => state.posts);
  if (loading) {
    return <CircularProgress />;
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
