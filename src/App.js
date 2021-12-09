import React, { Component } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"

import AuthService from "./services/authService"
import Navbar from './components/Navbar'
import Login from './pages/authentication/Login'
import Register from './pages/authentication/Register'
import Marketplace from './pages/Marketplace'
import UserProfile from './pages/UserProfile'
import AvatarProfile from './pages/AvatarProfile'
import BoardUser from './components/BoardUser'
import BoardAdmin from './components/BoardAdmin'
import StripeContainer from './pages/payment/StripeContainer'
import Footer from './components/Footer'

import './App.css'

import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#aefdd8',
    },
    secondary: {
      main: '#d32f2f',
    },
  },
  typography: {
    fontFamily: 'Readex Pro',
  },
});

class App extends Component {

  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
      isLoading: true
    };
  }

  componentDidMount() {

    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.isAdmin
      });
    }
  }

  logOut() {
    AuthService.logout();
    window.location.replace('http://localhost:3000/login');
  }

  render() {
    const { currentUser, isLoading } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <Navbar currentUser={currentUser} onLogOut={this.logOut} />
          <br/>
          <br/>
          <div className="container mt-3">
            <Routes>

              { currentUser
                ?
                  <>
                    <Route path="/" element={<Navigate to="/profile"/>} />
                    <Route path="/register" element={<Navigate to="/profile"/>} />
                  </>
                :
                <>
                  <Route path="/" element={<Navigate to="/login"/>} />
                  <Route path="/register" element={<Register />} />
                </>
              }
              <Route path="/home" element={<Navigate to="/login"/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Navigate to="/login"/>} />

              <Route path="/marketplace" element={<Marketplace isLoading={isLoading}/>} />
              <Route path="/mint%20avatar" element={<Navigate to="/user"/>} />
              <Route path="/connect%20wallet" element={<Navigate to="/user"/>} />

              <Route path="/profile" element={<UserProfile />} />
              <Route path="/avatars/:uuid" element={<AvatarProfile currentUser={currentUser} />} />
              <Route path="/user" element={<BoardUser />} />
              <Route path="/admin" element={<BoardAdmin />} />
              <Route path="/avatars/:uuid/pay" element={<StripeContainer currentUser={currentUser} />} />
            </Routes>
          </div>
        </div>
        <Footer/>
      </ThemeProvider>
    );
  }
}

export default App;
