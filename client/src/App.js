import { useEffect, useState } from 'react';
import { AppBar, Box, Container, Grid, Grow, Typography } from '@mui/material';
import memories from "./images/memories.png"
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import useStyles from "./Styles"
import { useDispatch } from 'react-redux';
import { fetchPosts } from "./redux/actions/posts"

export function App() {
  const [currentId, setCurrentId] = useState(null); // state to manage current id of a post to be edited or deleted
  const classes = useStyles(); // use styles for the app
  const dispatch = useDispatch(); // to dispatch an action to the store

  // fetching the posts from the server on mount and update
  useEffect(() => {
    dispatch(fetchPosts()); // dispatch the fetchPosts action
  }, [dispatch]); // only run effect if dispatch changes

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' color="inherit">
        <Typography variant="h2" align='center' className={classes.heading}>Memories</Typography>
        <img className={classes.image} src={memories} alt="Memories" height="60" />
      </AppBar>

      <Grow in>
        <Container>
          <Grid container justifyContent="space-between" alignItems="stretch" spacing={2}>
            <Grid item xs={12} sm={7}>
              {/* component to render the posts */}
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={5}>
              {/* component to render the form */}
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Box>
  );
}

export default App;
