import React, { useCallback, useState } from 'react';
import { AppBar, Avatar, Box, Button, Toolbar, Typography } from '@mui/material';
import MemoriesIcon from '../../images/memories.png';
import useStyles from './Styles';
import { Link } from 'react-router-dom';
import MemoryForm from '../Form/MemoryForm';
import CommonModal from '../Modal/CommonModal';
import AuthForm from '../Form/AuthForm';

const Header = () => {
  const classes = useStyles();
  const [memoryFormOpen, setMemoryFormOpen] = useState(false);
  const [authFromOpen, setAuthFormOpen] = useState(false);

  // Open the modal when the user clicks the "Create Memory" button
  const handleMemoryFormOpen = () => setMemoryFormOpen(true);
  // Open the modal when the user clicks the "Login" button
  const handleAuthFormOpen = () => setAuthFormOpen(true);

  const handleModalMemory = useCallback(( memoryFormOpen) => {
    setMemoryFormOpen(memoryFormOpen)
  }, [])

  const handleModalAuth = useCallback(( authFromOpen) => {
    setAuthFormOpen(authFromOpen)
  }, [])

  return (
    <AppBar position="relative" color="transparent" elevation={0} className={classes.appBar}>
      <Link to="/" className={classes.logoLink}>
        <img className={classes.image} src={MemoriesIcon} alt="Memories" height="40" />
        <Typography variant="h4" align="center" sx={{ ml: 1, color: '#fff' }}>
          Memories
        </Typography>
      </Link>

      <Box display="flex" alignItems="center">
        <Toolbar></Toolbar>
        <Button
          size="small"
          color="primary"
          variant="contained"
          sx={{ mr: 1, backgroundColor: '#240090', color: '#fff' }}
          onClick={handleMemoryFormOpen}
        >
          Create Memory
        </Button>
        {/* {user ? 
        <Box>
        <Avatar className={classes.purple} alt={user.name} src={user.imageUrl}>{user.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user.name}</Typography>
            {/* <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button> 
        </Box>
         : */}
        <>

          <Button
            size="small"
            color="secondary"
            variant="contained"
            sx={{ backgroundColor: '#240090', color: '#fff' }}
            onClick={handleAuthFormOpen}
          >
            Login
          </Button>
        </>
        {/* } */}
      </Box>

      {/* Display the memory modal */}
      <CommonModal
        open={memoryFormOpen}
        handleModal={handleModalMemory}
      >
        <MemoryForm
        handleModal={handleModalMemory}
        />
      </CommonModal>
      <CommonModal
        open={authFromOpen}
        handleModal={handleModalAuth}
      >
        <AuthForm
        //handleModal={handleModal}
        />
      </CommonModal>
    </AppBar>
  );
};

export default Header;
