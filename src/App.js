import React, { Component } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css"
import _ from "lodash";

import AuthService from "./services/authService"
import Navbar from './components/Navbar'

import Home from './pages/Home'
import Login from './pages/authentication/Login'
import Register from './pages/authentication/Register'
import Marketplace from './pages/Marketplace'
import UserProfile from './pages/UserProfile'
import AvatarProfile from './pages/AvatarProfile'
import BoardUser from './components/BoardUser'
import BoardAdmin from './components/BoardAdmin'
import LoadingCircle from './components/LoadingCircle'

const SERVER_URL = "http://localhost:5000/"

class App extends Component {

  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
      avatars: {},
      isLoading: true
    };
  }

  componentDidMount() {

    axios.get(SERVER_URL + 'avatars').then(res => {
      const avatars = res.data
      this.setState({ avatars });
      this.setState({ isLoading: false });
    });

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
    const { currentUser, showAdminBoard, avatars, isLoading } = this.state;

    if (isLoading) {
      return <LoadingCircle />
    }

    return (
      <div className="App">
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin
                </Link>
              </li>
            )}

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
            <Route path="/marketplace" element={<Marketplace avatars={avatars} isLoading={isLoading}/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/avatars/:avatarUuid" element={<AvatarProfile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/admin" element={<BoardAdmin />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
