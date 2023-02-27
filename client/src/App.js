import { useEffect, useState } from 'react';
import { Box, Container, Grid, Grow } from '@mui/material';
import Posts from './components/Posts/Posts';
import MemoryModal from './components/Modal/MemoryModal';
import useStyles from "./Styles"
import { useDispatch } from 'react-redux';
import { fetchPosts } from "./redux/actions/posts";
import Header from './components/Header/Header';

function App() {
  const [currentId, setCurrentId] = useState(null);
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch(); // Destructure dispatch

  // Open the modal when the user clicks the "Create Memory" button
  const handleOpen = () => setOpen(true);

  // Fetch posts from server on mount and update
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <Box className={classes.main}>
      {/* Display the app header */}
      <Header handleOpen={handleOpen} />

      {/* Display the posts */}
      <Grow in>
        <Container maxWidth="xl">
          <Grid container spacing={2} mt={3}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
        </Container>
      </Grow>

      {/* Display the memory modal */}
      <MemoryModal
        open={open}
        setOpen={setOpen}
        currentId={currentId}
        setCurrentId={setCurrentId}
      />
    </Box>
  );
}

export default App;  
