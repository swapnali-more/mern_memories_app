import React, { useState } from 'react';
import { AppBar, Avatar, Box, Button, Toolbar, Typography } from '@mui/material';
import MemoriesIcon from '../../images/memories.png';
import useStyles from './Styles';
import { Link } from 'react-router-dom';

const Header = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  // Open the modal when the user clicks the "Create Memory" button
  const handleOpen = () => setOpen(true);

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
          onClick={handleOpen}
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
          sx={{ mr: 1, backgroundColor: '#240090', color: '#fff' }}
        >
          Register
        </Button>

        <Button
          size="small"
          color="secondary"
          variant="contained"
          sx={{ backgroundColor: '#240090', color: '#fff' }}
        >
          Login
        </Button>
        </>
        {/* } */}
      </Box>
    </AppBar>
  );
};

export default Header;
