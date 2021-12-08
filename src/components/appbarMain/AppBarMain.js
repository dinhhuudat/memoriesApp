import { AppBar, Avatar, Button, IconButton, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { setLogoutStatus } from "../../features/posts/postsSlice";
import { imageMemory } from "../../images/images";
import useStyles from "../../styles";
import Login from "../login/login";

function AppBarMain(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const loginDetail = useSelector((state) => state.posts.loginDetail);
   
  const dispatch = useDispatch();

  //popup Login google
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //popup MenuUser
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenuUser = Boolean(anchorEl);
  const handleClickMenuUser = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenuUser = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    dispatch(setLogoutStatus());
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Login closeEvent={handleClose} />
        </DialogContent>
      </Dialog>
      <AppBar
        className={classes.appBar}
        position="static"
        color="inherit"
        sx={{ flexDirection: "row", flexGrow: 1 }}
      >
        <img
          className={classes.image}
          src={imageMemory}
          alt="memories"
          height="60px"
          sx={{ flexGrow: 1 }}
        />
        <Typography
          className={classes.heading}
          variant="h2"
          align="center"
          sx={{ flexGrow: 1 }}
        >
          Memories
        </Typography>
        {loginDetail.loginStatus === true ? (
          <>
            <IconButton>
              <Avatar
                alt={loginDetail.profileObj.familyName}
                src={loginDetail.profileObj.imageUrl}
              >{loginDetail.profileObj.imageUrl ? "" : loginDetail.profileObj.familyName.charAt(0) }</Avatar>
            </IconButton>
            <Typography>{`${loginDetail.profileObj.name}`}</Typography>
            <Button
              variant="contained"
              onClick={() => {
                handleLogOut();
              }}
              sx={{ mr: 3,ml:3 }}
            >
              Logout
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            onClick={() => {
              handleClickOpen();
            }}
            sx={{ mr: 3 }}
          >
            Login
          </Button>
        )}
      </AppBar>
    </>
  );
}

export default AppBarMain;
