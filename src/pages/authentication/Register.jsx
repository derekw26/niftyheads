import React, { Component } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import axios from 'axios';

import Form from "react-validation/build/form";
import { form, control, button } from 'react-validation';
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../../services/authService";

const paperStyle={padding :20, height:'70%', width:280, margin:"20px auto"}
const avatarStyle={backgroundColor:'primary', margin: "10px auto"}
const btnstyle={margin:'8px 0'}

class Register extends Component {

  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
      submitClicked: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleClick(e) {
    this.setState({
      submitClicked: true
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.password
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {

    let usernameHelper;
    let emailHelper;
    let passwordHelper;

    if (this.state.username === "" && this.state.submitClicked) {
      usernameHelper = "Username is required"
    } else if ((this.state.username.length < 3 || this.state.username.length  > 20) && this.state.submitClicked) {
      usernameHelper = "Must be between 3-20 characters"
    }

    if (this.state.email === "" && this.state.submitClicked) {
      emailHelper = "Email is required"
    } else if (!isEmail(this.state.email) && this.state.submitClicked) {
      emailHelper = "Not a valid email address"
    }

    if (this.state.password === "" && this.state.submitClicked) {
      passwordHelper = "Password is required"
    } else if ((this.state.password.length < 6 || this.state.password.length  > 40) && this.state.submitClicked) {
      passwordHelper = "Must be between 6-40 characters"
    }

    return(
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align='center'>
            <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
            <Typography>
              <h3>Sign Up for NIFTYHEADS</h3>
            </Typography>
          </Grid>
          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {this.state.message && (
              <Alert severity={
                this.state.successful ? "success" : "error" } >{this.state.message}</Alert>
            )}
            <TextField
              label='Username'
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
              placeholder='Enter username'
              margin='normal'
              fullWidth
              required
              error={this.state.username === "" && this.state.submitClicked || usernameHelper }
              helperText={usernameHelper}

            />
            <TextField
              label='Email'
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
              placeholder='Enter email'
              margin='normal'
              type='email'
              fullWidth
              required
              error={this.state.email === "" && this.state.submitClicked || emailHelper }
              helperText={emailHelper}
            />
            <TextField
              label='Password'
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
              placeholder='Enter password'
              margin='normal'
              type='password'
              fullWidth
              required
              error={this.state.password === "" && this.state.submitClicked || passwordHelper }
              helperText={passwordHelper}
            />
            <Button
              onClick={this.handleClick}
              type='submit'
              color='primary'
              variant="contained"
              style={btnstyle}
              fullWidth
            >
              Create Account
            </Button>
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />

          </Form>
          <Typography >
          </Typography>
        </Paper>
      </Grid>
    )
  }
}

export default Register;
