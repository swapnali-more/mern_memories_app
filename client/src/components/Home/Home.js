import { useCallback, useEffect, useState } from 'react';
import { Grid, Grow } from '@mui/material';
import Posts from '../Posts/Posts';
import { useDispatch } from 'react-redux';
import { fetchPosts } from "../../redux/actions/posts";
import CommonModal from '../Modal/CommonModal';
import MemoryForm from '../Form/MemoryForm';

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch(); // Destructure dispatch

  // Fetch posts from server on mount and update
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleModal = useCallback((currentId, open) => {
    setCurrentId(currentId)
    setOpen(open)
  }, [])

  return (
    <>
      {/* Display the posts */}
      <Grow in>
        <Grid container spacing={2} mt={3}>
          <Posts setCurrentId={setCurrentId} handleModal={handleModal} />
        </Grid>
      </Grow>

      {/* Display the memory modal */}
      <CommonModal handleModal={handleModal}
        currentId={currentId} open={open}>
        <MemoryForm
          currentId={currentId}
          handleModal={handleModal}
        />
      </CommonModal>
    </>
  )
}

export default Home