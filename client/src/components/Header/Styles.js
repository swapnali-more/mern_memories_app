import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
    appBar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    image: {
        marginLeft: '15px',
    },
    logoLink: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none'
    },
    userName: {
        color: 'white'
    }
}))