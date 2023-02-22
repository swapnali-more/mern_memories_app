import React from 'react';
import { useDispatch } from 'react-redux';
import moment from "moment";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Typography } from '@mui/material';
import { deletePost, likePost } from '../../../redux/actions/posts';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import useStyles from "./Styles"

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { _id, title, creator, message, selectedFile, tags, createdAt, likeCount } = post;

  return (
    <Card className={classes.card}>
      {/* Post image */}
      <CardMedia className={classes.media} image={selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={title} />
      
      {/* Creator name and creation time */}
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Box className={classes.overlay}>
            <Typography variant="h6">{creator}</Typography>
            <Typography variant="body2">{moment.utc(createdAt).fromNow()}</Typography>
          </Box>
        </Grid>
        {/* Edit button */}
        <Grid item>
          <Box className={classes.overlay2}>
            <IconButton aria-label="edit" onClick={() => setCurrentId(_id)}>
              <EditIcon fontSize="small" style={{ color: "white" }} />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      
      {/* Tags, title and message */}
      <Grid container direction="column">
        <Grid item>
          <Box className={classes.details}>
            <Typography variant="body2" color="textSecondary" component="h2">{tags.map((tag) => `#${tag} `)}</Typography>
          </Box>
        </Grid>
        <Grid item>
          <Typography className={classes.title} gutterBottom variant="h5" component="h2">{title}</Typography>
        </Grid>
        <Grid item>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">{message}</Typography>
          </CardContent>
        </Grid>
      </Grid>
      
      {/* Like and delete buttons */}
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={() => dispatch(likePost(_id))}><ThumbUpAltIcon fontSize="small" /> Like {likeCount} </Button>
        <Button size="small" color="primary" onClick={() => dispatch(deletePost(_id))}><DeleteIcon fontSize="small" /> Delete</Button>
      </CardActions>
    </Card>
  )
}

export default Post;
