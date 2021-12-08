import React, { useState } from "react";
import { Container, Typography, Grow, Grid } from "@mui/material";
import { imageMemory } from "./images/images";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import useStyles from "./styles"; 
import AppBar from './components/appbarMain/AppBarMain'
import {useSelector} from 'react-redux'

function App() {
  const classes = useStyles();
  const loginStatus =useSelector((state)=>state.posts.loginDetail.loginStatus) 

  return (
    <>
      <Container maxWidth="lg">
        
      <AppBar/>
        <Grow in>
          <Container>
            <Grid
              container
              justify="space-between"
              alignItems="stretch"
              spacing={4}
            >
              <Grid item sm={12} lg={4}>
                {loginStatus === false  ? <h2 style={{color:'red'}}>You need to login first </h2> : <Form />}
              </Grid>
              <Grid item sm={12} lg={7}>
                <Posts />
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>
    </>
  );
}

export default App;
