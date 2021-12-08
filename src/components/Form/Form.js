import React, { useState, useEffect } from "react";
import useStyles from "./style";
import { TextField, Button, Typography, Paper, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import FileBase from "react-file-base64";
import {
  createPosts,
  patchPosts,
  setFlagEdit,
} from "../../features/posts/postsSlice";
import MuiAlert from "@mui/material/Alert"; 
 

function Form(props) {
  const newPost = useSelector((state) => state.posts.editPost); 
   
  const dispatch = useDispatch();
  const classes = useStyles(); 
  

  const [postData, setPostData] = useState(newPost); 
  useEffect(() => {
    setPostData(newPost);
  }, [newPost]);
 

  const handelSubmit = (e) => { 
    e.preventDefault();
      //console.log('postData',postData)
      if (postData.editFlag === false) {
        dispatch(createPosts(postData));
      } else {
        dispatch(patchPosts(postData));
      } 
      handelclear()
  };
  const handelclear = () => {
     
      setPostData({
        editFlag: false, 
        title: "",
        message: "",
        tags: "",
        selectedFile: "",
        ...newPost
      });
     
  };

  return (
    <>
      <Paper className={classes.Paper} sx={{ p: 2, m: 1 }}>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          noValidate
          autoComplete="off"
          alignItems="center"
        >
          <Typography variant="h6" align="center" color="primary">
            {postData.editFlag ? "Edit Memory" : "Creating a Memory"}
          </Typography>
          {/* <TextField
            name="creator"
            variant="outlined"
            label="Creator"
            fullWidth
            value={postData.creator}
            onChange={(e) =>
              setPostData({ ...postData, creator: e.target.value })
            }
          ></TextField> */}

          <TextField
            name="title"
            variant="outlined"
            label="title"
            fullWidth
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          ></TextField>

          <TextField
            name="message"
            variant="outlined"
            label="message"
            fullWidth
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
          ></TextField>

          <TextField
            name="tags"
            variant="outlined"
            label="tags"
            fullWidth
            value={postData.tags}
            onChange={(e) => {
              const tagArr = e.target.value.split(" ");
              setPostData({ ...postData, tags: tagArr });
            }}
          ></TextField>

          <div className={classes.fileInput}>
            <FileBase
              mutifile={false}
              type="file"
              onDone={(base) =>
                setPostData({ ...postData, selectedFile: base })
              }
            />
          </div>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            onClick={(e) => { 
              handelSubmit(e)
            }}
            size="large"
            fullWidth
            color="primary"
          >
            SUBMIT
          </Button>
          <Button
            // className={}
            variant="contained"
            onClick={() => handelclear()}
            size="large"
            fullWidth
            color="secondary"
          >
            CLEAR
          </Button>
        </Box>
      </Paper>
     </>
  );
}

export default Form;
