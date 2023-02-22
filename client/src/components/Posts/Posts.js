import React from 'react';
import { useSelector } from 'react-redux';
import Post from './Post/Post';
import useStyles from './Styles';
import { CircularProgress, Grid } from '@mui/material';

const Posts = ({ setCurrentId }) => {
  // get the loading status and posts from the state
  const { loading, posts: postList } = useSelector((state) => state.posts);

  // apply the styles
  const classes = useStyles();

  // show the loading spinner while fetching data
  if (loading) {
    return <CircularProgress />;
  }

  // render the posts
  return (
    <Grid className={classes.container} container alignItems="stretch" spacing={3}>
      {/* loop through each post and create a Post component */}
      {postList?.map((post) => (
        <Grid key={post?._id} item xs={12} sm={6} md={6}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
