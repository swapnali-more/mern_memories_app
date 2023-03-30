import { makeStyles } from '@mui/styles';

export default makeStyles({
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  creatorDetail: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  editIcon: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
  },
  likes: {
    '&.Mui-disabled': {
      color: 'white !important'
    }
  }
});