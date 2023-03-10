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
  error: {
      fontWeight: 400,
      fontSize: '0.75rem',
      lineHeight: 1.66,
      letterSpacing: '0.03333em',
      textAlign: 'left',
      marginTop: '4px',
      marginRight: '14px',
      marginBottom: 0,
      marginLeft: '14px',
      color: '#d32f2f',
      fontFamily: '"Roboto", sans-serif'
  }
}));