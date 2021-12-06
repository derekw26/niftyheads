import React, { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.js";

const Signup = () => {

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
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
          <h2>Sign Up for NIFTYHEADS</h2>
        </Grid>
        <TextField
          label='Email'
          placeholder='Enter email'
          onChange={(e) => {
            setRegisterEmail(e.target.value);
          }}
          margin='normal'
          fullWidth
          required
        />
        <TextField
          label='Password'
          placeholder='Enter password'
          onChange={(e) => {
            setRegisterPassword(e.target.value);
          }}
          margin='normal' type='password'
          fullWidth
          required
        />
        <TextField
          label='Password confirmation'
          placeholder='Confirm password'
          margin='normal'
          type='password'
          fullWidth
          required
        />
        <Button
          onClick={register}
          type='submit'
          color='primary'
          variant="contained"
          style={btnstyle}
          fullWidth
        >
          Create Account
        </Button>
        <Typography >
        </Typography>
      </Paper>
    </Grid>
  )
}

export default Signup;
