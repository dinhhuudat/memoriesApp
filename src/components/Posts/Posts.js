import React, { useState, useEffect } from "react";
import Post from "../Posts/Post/post";
import useStyles from "../../styles";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../../features/posts/postsSlice";
import {Grid, CircularProgress } from "@mui/material";
import imgSRC from'C:\\Users\\work\\Desktop\\Front-end-Web\\images\\tkg.png'

function Posts(props) {
  const postsVal = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, []);
  //postsVal.posts

  const postList = postsVal.posts.map((dataPost, index) => (
    <Grid item key={index} lg={6} sm={12}>  
      <Post  post={dataPost} />
    </Grid>
  ));

  const classes = useStyles();
  return (
    <div> 
      <h1>Posts</h1>
      {postList ? 
      (
        <Grid className={classes.container} container alignItems="stretch" spacing={2}> 
          {postList}
        </Grid>
      ):(
        <>
          <CircularProgress color="secondary" />
          <CircularProgress color="success" />
          <CircularProgress color="inherit" />
        </>
      )  }
    </div>
  );
}

export default Posts;
