import React, { useState } from "react";
import useStyles from "./style";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";
import Zoom from "@mui/material/Zoom";
import { useDispatch, useSelector } from "react-redux";
import {
  setFlagEdit,
  patchPosts,
  deletePosts,
  patchPostsLike,
} from "../../../features/posts/postsSlice";

function Post({ post }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLoginFlag = useSelector(
    (state) => state.posts.loginDetail.loginStatus
  );

  const handelEdit = () => {
    dispatch(setFlagEdit({ editFlag: true, ...post }));
  };

  const handelLike = () => {
    // post.likeCount+=1
    dispatch(patchPostsLike(post));
  };

  const handelDelete = () => {
    dispatch(deletePosts(post));
  };

  return (
    <Zoom in={true}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={post.selectedFile.base64}
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.creator}</Typography>
          <Typography variant="body">
            {moment(post.createAt).fromNow()}
          </Typography>
        </div>
        {isLoginFlag == true && (
          <div className={classes.overlay2}>
            <Button
              sx={{ color: "white" }}
              size="small"
              onClick={() => {
                handelEdit();
              }}
            >
              <MoreHorizIcon fontSize="large" />
            </Button>
          </div>
        )}
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <CardContent>
          <Typography className={classes.title} variant="h5" gutterBottom>
            {post.title}
          </Typography>
          <Typography className={classes.message} variant="body2" gutterBottom>
            {post.message}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              handelLike();
            }}
            disabled={!isLoginFlag}
          >
            <ThumbUpAltIcon fontSize="small" />
            {post.likeCount}
          </Button>
          {isLoginFlag == true && (
            <Button
              size="small"
              color="primary"
              onClick={() => {
                handelDelete();
              }}
              
            >
              <DeleteIcon fontSize="small" /> Delete
            </Button>
          )}
        </CardActions>
      </Card>
    </Zoom>
  );
}

export default Post;
