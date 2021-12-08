import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import GoogleLogin from "react-google-login";
import GoogleIcon from '@mui/icons-material/Google';
import {useDispatch} from "react-redux";
import {setLoginStatus} from '../../features/posts/postsSlice'

const theme = createTheme();

export default function SignIn(props) { 
  const dispatch= useDispatch() 

  const handleSubmit = (event) => {
    // setLoginStatus
    event.preventDefault();

    const data = new FormData(event.currentTarget); 

    let newAccount={loginStatus:true,profileObj:{
      email: data.get("email"),
      familyName:data.get("email"),
      givenName:data.get("email"),
      name:data.get("email"),
    }}
    if(data.get("email")) 
    dispatch(setLoginStatus(newAccount))

  };

  const loginSuccess = async (res) => {
    // console.log(res);
    dispatch(setLoginStatus({loginStatus:true,profileObj:res.profileObj}))
    // profileObj
    props.closeEvent()
  };

  const loginFailure = async (res) => {
    //dispatch(setLoginStatus(false))
    // console.log(res);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            LOGIN
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="điền đại gì cũng được"
              name="email"
              autoComplete="off"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <GoogleLogin
              clientId="1022674129223-p09l4j8asia5vudljrh3ihlkpcjsfu87.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  fullWidth 
                  sx={{ mt: 3, mb: 2 }}
                  variant='outlined'
                >
                  <GoogleIcon sx={{mr:2}} />Login with google
                </Button>
              )}
              buttonText="Login with google "
              onSuccess={loginSuccess}
              onFailure={loginFailure}
              cookiePolicy={"single_host_origin"} 
              style={{width: "100%"}}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={props.closeEvent}
            >
              Login
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{ mb: 2 }}
              onClick={props.closeEvent}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
