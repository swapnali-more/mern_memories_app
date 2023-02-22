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
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
  },
}));