import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://memories-project-d.herokuapp.com/posts";
const initialState = {
  posts: [],
  editPost: {
    editFlag: false,
    _id: "",
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  },
  loginDetail: {
    loginStatus: false,
    profileObj: {},
  },
};

// export const getPostsAPI =()=>axios.get(url)

export const createPostAPI = (newPost) =>
  axios.post(url, newPost).then((response) => response);

export const getPosts = createAsyncThunk("index/getposts", async () => {
  const response = await axios.get(url);
  const jsonData = await response.data;
  return jsonData;
});

export const createPosts = createAsyncThunk(
  "index/createPost",
  async (newPost) => {
    const response = await axios.post(url, newPost);
    const jsonData = await response.data;
    return jsonData;
  }
);

export const patchPosts = createAsyncThunk(
  "index/patchPost",
  async (patchPost) => {
    const response = await axios.patch(url + "/" + patchPost._id, patchPost);
    const jsonData = await response.data;
    return jsonData;
  }
);

export const patchPostsLike = createAsyncThunk(
  "index/patchPost/Like",
  async (patchPost) => {
    let Like = parseInt(patchPost.likeCount);
    const response = await axios.patch(url + "/" + patchPost._id + "/likePost");
    const jsonData = await response.data;
    return jsonData;
  }
);

export const deletePosts = createAsyncThunk(
  "index/deletePost",
  async (patchPost) => {
    const response = await axios.delete(url + "/" + patchPost._id);
    const jsonData = await response.data;
    return jsonData;
  }
);

export const counterSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setFlagEdit: (state, action) => {
      state.editPost = action.payload;
    },
    setLoginStatus: (state, action) => {
      state.loginDetail.loginStatus = action.payload.loginStatus;
      state.loginDetail.profileObj = action.payload.profileObj;
      state.editPost.creator = action.payload.profileObj.name;
    },
    setLogoutStatus: (state, action) => {
      state.loginDetail = { loginStatus: false, profileObj: {} };
    },
  },
  extraReducers: (buiders) => {
    buiders.addCase(getPosts.fulfilled, (state, action) => {
      // state.posts=action.payload
      Object.assign(state.posts, action.payload);
    });
    buiders.addCase(createPosts.fulfilled, (state, action) => {
      state.posts.unshift(action.payload);
    });
    buiders.addCase(patchPosts.fulfilled, (state, action) => {
      const index = state.posts.findIndex((e) => e._id === action.payload._id);
      state.posts.splice(index, 1);

      state.posts.unshift(action.payload);

      state.editPost = {
        editFlag: false,
        _id: "",
        creator: "",
        title: "",
        message: "",
        tags: "",
        selectedFile: "",
      };
    });
    buiders.addCase(deletePosts.fulfilled, (state, action) => {
      const index = state.posts.findIndex((e) => e._id === action.payload);
      state.posts.splice(index, 1);
    });
    buiders.addCase(patchPostsLike.fulfilled, (state, action) => {
      // state.posts.likeCount=action.payload.likeCount
      const setLike = state.posts.find((e) => e._id === action.payload._id);
      setLike.likeCount = action.payload.likeCount;
      // console.log( action.payload.likeCount )
    });
  },
});

export const { setFlagEdit, setLoginStatus, setLogoutStatus } =
  counterSlice.actions;

export default counterSlice.reducer;
