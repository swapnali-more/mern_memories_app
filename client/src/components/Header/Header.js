import React, { useCallback, useEffect, useState } from 'react';
import { AppBar, Box, Button, Typography } from '@mui/material';
import MemoriesIcon from '../../images/memories.png';
import useStyles from './Styles';
import { Link, useLocation } from 'react-router-dom';
import MemoryForm from '../Form/MemoryForm';
import CommonModal from '../Modal/CommonModal';
import AuthForm from '../Form/AuthForm';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/actions/auth';
import { toast } from 'react-toastify';
import decode from 'jwt-decode';

const Header = () => {
  // Importing necessary hooks and functions
  const classes = useStyles();
  const [memoryFormOpen, setMemoryFormOpen] = useState(false);
  const [authFromOpen, setAuthFormOpen] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const dispatch = useDispatch();
  const location = useLocation();

  // Function to handle opening the "Create Memory" modal
  const handleMemoryFormOpen = () => setMemoryFormOpen(true);

  // Function to handle opening the "Login" modal
  const handleAuthFormOpen = () => setAuthFormOpen(true);

  // Function to handle setting the "Create Memory" modal state
  const handleModalMemory = useCallback((memoryFormOpen) => {
    setMemoryFormOpen(memoryFormOpen)
  }, [])

  // Function to handle setting the "Login" modal state
  const handleModalAuth = useCallback((authFromOpen) => {
    setAuthFormOpen(authFromOpen)
  }, [])

  // Function to handle user logout
  const logout = useCallback(() => {
    dispatch(logoutUser())
      .then(() => {
        // Success message and actions upon successful logout
        toast.success("Logged out successfully!", {
          autoClose: 2000,
          onClose: () => {
            localStorage.clear();
            setUser(null);
            window.location.reload();
          },
        });
      })
      .catch((error) => {
        // Handle error message upon logout failure
        toast.error(error);
      });
  });

  // useEffect hook to handle token expiration and setting user state
  useEffect(() => {
    const token = user?.token;
    // Check if token exists and is expired
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    // Set user state from localStorage
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location, logout, user?.token]);

  return (
    <AppBar position="relative" color="transparent" elevation={0} className={classes.appBar}>
      <Link to="/" className={classes.logoLink}>
        <img className={classes.image} src={MemoriesIcon} alt="Memories" height="40" />
        <Typography variant="h4" align="center" sx={{ ml: 1, color: '#fff' }}>
          Memories
        </Typography>
      </Link>

      <Box display="flex" alignItems="center">
        {user ?
          <>

            <Box display="flex">
              {/* <Avatar className={classes.purple} alt={user.name} src={user.imageUrl}>{user.name.charAt(0)}</Avatar> */}
              <Typography className={classes.userName} variant="h6" mr={1.5}>{user?.result?.name.charAt(0).toUpperCase() + user?.result?.name.slice(1)}</Typography>
              <Button
                size="small"
                color="primary"
                variant="contained"
                sx={{ mr: 1.5, backgroundColor: '#240090', color: '#fff' }}
                onClick={handleMemoryFormOpen}
              >
                Create Memory
              </Button>
              <Button variant="contained" size="small" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
            </Box>
          </>
          :
          <Button
            size="small"
            color="secondary"
            variant="contained"
            sx={{ backgroundColor: '#240090', color: '#fff' }}
            onClick={handleAuthFormOpen}
          >
            Login
          </Button>
        }
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
          handleModal={handleModalAuth}
        />
      </CommonModal>
    </AppBar>
  );
};

export default Header;
