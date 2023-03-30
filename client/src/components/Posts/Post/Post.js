import React, { useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { deletePost, likePost } from "../../../redux/actions/posts";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import useStyles from "./Styles";

const Post = ({ post, handleModal }) => {
  const classes = useStyles();
  // Get the handleModal function from the modal action creator
  const dispatch = useDispatch();

  // Get properties from the post object
  const {
    _id,
    title,
    name,
    message,
    selectedFile,
    tags,
    createdAt,
  } = post;

  // Define a function to handle the edit button click
  const editClickHandle = () => {
    handleModal(_id, true)
  }

  // Get the user data from the local storage
  const user = JSON.parse(localStorage.getItem('profile'))

  // Define a function component for displaying the number of likes
  const Likes = () => {
    // Check if there are any likes for the post
    if (post.likes.length > 0) {
      // Check if the current user has already liked the post
      return post.likes.find((like) => like === (user?.result?._id))
        ? (
          <>
            <ThumbUpAltIcon fontSize="small" /> {post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }
          </>
        ) : (
          <>
            <ThumbUpOffAltIcon fontSize="small" /> {post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
          </>
        );
    }
    return <><ThumbUpOffAltIcon fontSize="small" />&nbsp;Like</>;
  };

  return (
    <>
      <Card
        sx={{ backgroundColor: "#240090", position: "relative" }}
      >
        <CardMedia
          className={classes.media}
          image={
            selectedFile ||
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          title={title}
        />
        <Box className={classes.creatorDetail}>
          <Typography variant="h6">
            {name && typeof name === 'string' && name.charAt(0).toUpperCase() + name.slice(1)}
          </Typography>
          <Typography variant="body1">
            {moment.utc(createdAt).fromNow()}
          </Typography>
        </Box>
        {user?.result?._id === post?.creator &&
          <Box className={classes.editIcon}>
            <IconButton aria-label="edit" onClick={editClickHandle}>
              <EditIcon fontSize="small" style={{ color: "white" }} />
            </IconButton>
          </Box>
        }
        <Box sx={{ p: 3 }}>
          <Typography variant="body2" sx={{ color: "#fff" }} component="h2">
            {tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography variant="h5" sx={{ color: "#fff" }} component="h2">
            {title.charAt(0).toUpperCase() + title.slice(1)}
          </Typography>
          <CardContent sx={{ p: 0, mt: 1 }}>
            <Typography variant="body2" sx={{ color: "#fff" }} component="p">
              {message}
            </Typography>
          </CardContent>
          <CardActions sx={{ p: 0, mt: 2, justifyContent: "space-between" }}>
            <Button
              size="small"
              color="primary" className={classes.likes}
              sx={{ textTransform: "capitalize", color: "#fff" }}
              disabled={!user?.result}
              onClick={() => dispatch(likePost(_id))}
            >
              <Likes />
            </Button>
            {user?.result?._id === post?.creator &&
              <Button
                size="small"
                color="primary"
                sx={{ textTransform: "capitalize", color: "#fff" }}
                onClick={() => dispatch(deletePost(_id))}
              >
                <DeleteIcon fontSize="small" sx={{ mr: 1 }} /> Delete
              </Button>
            }
          </CardActions>
        </Box>
      </Card>
    </>
  );
};

export default Post;
