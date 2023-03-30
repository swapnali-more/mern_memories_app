import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  modal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 300,
    maxWidth: 500,
    padding: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  closeBtn: {
    position: "absolute",
    top: '10px',
    right: '10px',
  },
}));