import React, { Component } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import withNavigation from '../../hocs';

import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";

import AuthService from "../../services/authService";

const paperStyle={padding:20, height:'70%', width:280, margin:"50px auto"}
const avatarStyle={backgroundColor:'primary', margin: "10px auto"}
const btnstyle={margin:'8px 0'}

class Login extends Component {

  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      submitClicked: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
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

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.navigate("/profile");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return(
      <Grid>
        <Paper elevation={5} style={paperStyle}>
          <Grid align='center'>
            <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
            <Typography>
              <h3>Login to NIFTYHEADS</h3>
            </Typography>
          </Grid>
          <Form
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          >
            {this.state.message && (
              <Alert severity="error">{this.state.message}</Alert>
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
              error={this.state.username === "" && this.state.submitClicked }
              helperText={this.state.username === "" && this.state.submitClicked ? "Username is required" : null}
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
              error={this.state.password === "" && this.state.submitClicked }
              helperText={this.state.password === "" && this.state.submitClicked ? "Password is required" : null}
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
              onClick={this.handleClick}
              type='submit'
              color='primary'
              variant="contained"
              style={btnstyle}
              disabled={this.state.loading}
              fullWidth
            >
              {this.state.loading ? (
                <span className="spinner-border spinner-border-sm m-1"></span>
              ) : (
                <span>Login</span>
              )}
            </Button>
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
          <Typography variant="body2">
            <span>Don't have an account? </span>
            <Link href="/register"  >
              Sign Up
            </Link>
          </Typography>
        </Paper>
      </Grid>
    )
  }
}

export default withNavigation(Login);
