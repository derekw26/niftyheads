import React, { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';

import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.js";


const SERVER_URL = "http://localhost:5000/"

const Login = () => {

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});

  const client = axios.create({
    baseURL: SERVER_URL,
    json: true
  })

  onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
  })

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user)
    } catch(error) {
      alert(error.message)
    }
  }

  const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
  const avatarStyle={backgroundColor:'primary'}
  const btnstyle={margin:'8px 0'}

  return(
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
          <h2>Sign In</h2>
        </Grid>
        <TextField
          label='Username'
          placeholder='Enter username'
          onChange={(e) => {
            setLoginEmail(e.target.value);
          }}
          margin='normal'
          fullWidth
          required
        />
        <TextField
          label='Password'
          placeholder='Enter password'
          onChange={(e) => {
            setLoginPassword(e.target.value);
          }}
          margin='normal'
          type='password'
          fullWidth
          required
        />
        <FormControlLabel
          control={
            <Checkbox
              name="checkedB"
              color="primary"
            />
          }
          label="Remember me"
        />
        <Button
          onClick={login}
          type='submit'
          color='primary'
          variant="contained"
          style={btnstyle}
          fullWidth
        >
          Sign In
        </Button>
        <Typography >
          <Link href="#" >
            Forgot password?
          </Link>
        </Typography>
        <Typography>
          <span>Don't have an account? </span>
          <Link href="/signup" >
            Sign Up
          </Link>
          <p>{ user?.email }</p>
        </Typography>
      </Paper>
    </Grid>
  )
}

export default Login;
