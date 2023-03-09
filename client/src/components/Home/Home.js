import { useEffect, useState } from 'react';
import { Container, Grid, Grow } from '@mui/material';
import Posts from '../Posts/Posts';
import MemoryModal from '../Modal/MemoryModal';
import { useDispatch } from 'react-redux';
import { fetchPosts } from "../../redux/actions/posts";

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch(); // Destructure dispatch

  // Fetch posts from server on mount and update
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  
  return (
    <>
    {/* Display the posts */}
    <Grow in>
        <Grid container spacing={2} mt={3}>
            <Posts setCurrentId={setCurrentId} />
        </Grid>
    </Grow>

    {/* Display the memory modal */}
    <MemoryModal
        open={open}
        setOpen={setOpen}
        currentId={currentId}
        setCurrentId={setCurrentId}
      />
    </>
  )
}

export default Home