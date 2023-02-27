import React from 'react';
import { AppBar, Box, Button, Typography } from '@mui/material';
import MemoriesIcon from '../../images/memories.png';
import useStyles from './Styles';

const Header = ({ handleOpen }) => {
  const classes = useStyles();

  return (
    <AppBar position="relative" color="transparent" elevation={0} className={classes.appBar}>
      <Box display="flex" alignItems="center" justifyContent="center">
        <img className={classes.image} src={MemoriesIcon} alt="Memories" height="40" />
        <Typography variant="h4" align="center" sx={{ ml: 1, color: '#fff' }}>
          Memories
        </Typography>
      </Box>

      <Box display="flex" alignItems="center">
        <Button
          size="small"
          color="primary"
          variant="contained"
          sx={{ mr: 1, backgroundColor: '#240090', color: '#fff' }}
          onClick={handleOpen}
        >
          Create Memory
        </Button>

        <Button
          size="small"
          color="secondary"
          variant="contained"
          sx={{ backgroundColor: '#240090', color: '#fff' }}
        >
          Login
        </Button>
      </Box>
    </AppBar>
  );
};

export default Header;
