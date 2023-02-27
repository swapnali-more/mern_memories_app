import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: 2,
    },
  },
  paper: {
    padding: "20px",
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    border: '1px solid #240090',
    borderRadius: 5,
    position: 'relative',
    padding: '5px',
    '& input': {
      opacity: 0,
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      zIndex: 1
    },
    '& label': {
      color: '#240090',
      fontSize: 14
    }
  },
  buttonSubmit: {
    marginBottom: 10,
  },
}));