import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import fire from './firebase.js'

import Test from './components/Test'
import Navbar from './components/Navbar'
import Login from './components/authentication/Login'
import Signup from './components/authentication/Signup'
import Marketplace from './components/marketplace/Marketplace'

const SERVER_URL = "http://localhost:5000/"

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  fire.auth().onAuthStateChanged((user) => {
     return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  });

  console.log('logged in?', isLoggedIn);

  return (
    <div className="App">
      <Navbar/>
      <Routes>
        {/* <Route path="/" element={<Test />} /> */}
        {!isLoggedIn
          ?
            <Route path="/" element={<Login />} />
          : (
            <>
              <Route path="/" element={<Marketplace />} />
            </>
          )}
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
