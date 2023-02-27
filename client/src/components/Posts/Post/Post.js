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
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import useStyles from "./Styles";
import MemoryModal from "../../Modal/MemoryModal";

const Post = ({ post, setCurrentId}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const editClickHandle = () => {
    setOpen(true);
    setCurrentId(_id);
  }

  const {
    _id,
    title,
    creator,
    message,
    selectedFile,
    tags,
    createdAt,
    likeCount,
  } = post;

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
          {creator.charAt(0).toUpperCase() + creator.slice(1)}
        </Typography>
        <Typography variant="body2">
          {moment.utc(createdAt).fromNow()}
        </Typography>
      </Box>
      <Box className={classes.editIcon}>
        <IconButton aria-label="edit" onClick={editClickHandle}>
          <EditIcon fontSize="small" style={{ color: "white" }} />
        </IconButton>
      </Box>
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
            color="primary"
            sx={{ textTransform: "capitalize", color: "#fff" }}
            onClick={() => dispatch(likePost(_id))}
          >
            <ThumbUpAltIcon fontSize="small" sx={{mr: 1}} /> Like {likeCount}{" "}
          </Button>
          <Button
            size="small"
            color="primary"
            sx={{ textTransform: "capitalize", color: "#fff" }}
            onClick={() => dispatch(deletePost(_id))}
          >
            <DeleteIcon fontSize="small" sx={{mr: 1}} /> Delete
          </Button>
        </CardActions>
      </Box>
    </Card>

    <MemoryModal open={open} setOpen={setOpen} currentId={_id} setCurrentId={setCurrentId}/>
    </>
  );
};

export default Post;
