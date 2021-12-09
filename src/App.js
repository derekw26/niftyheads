import React, { Component } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css"
import _ from "lodash";

import AuthService from "./services/authService"
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/authentication/Login'
import Register from './pages/authentication/Register'
import Marketplace from './pages/Marketplace'
import UserProfile from './pages/UserProfile'
import AvatarProfile from './pages/AvatarProfile'
import BoardUser from './components/BoardUser'
import BoardAdmin from './components/BoardAdmin'
import LoadingCircle from './components/LoadingCircle'

import StripeContainer from './pages/payment/StripeContainer'

import './App.css'


import { green } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: 'Readex Pro',
  },
})

// const SERVER_URL = "http://localhost:5000/"

class App extends Component {

  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
      // avatars: {},
      isLoading: true
    };
  }

  componentDidMount() {

    // axios.get(SERVER_URL + 'avatars').then(res => {
    //   const avatars = res.data;
    //   this.setState({ avatars });
    //   this.setState({ isLoading: false });
    // });

    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.isAdmin
      });
    }
  }

  logOut() {
    console.log('logout triggered')
    AuthService.logout();
  }

  render() {
    const { currentUser, showAdminBoard, isLoading } = this.state;
    console.log(currentUser)

    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav mr-auto">


              {currentUser && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    User
                  </Link>
                </li>
              )}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </nav>

          <Navbar currentUser={currentUser} onLogOut={this.logOut} />
          <div className="container mt-3">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/marketplace" element={<Marketplace isLoading={isLoading}/>} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/avatars/:uuid" element={<AvatarProfile currentUser={currentUser} />} />
              <Route path="/user" element={<BoardUser />} />
              <Route path="/admin" element={<BoardAdmin />} />
              <Route path="/avatars/:uuid/pay" element={<StripeContainer currentUser={currentUser} />} />
            </Routes>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
