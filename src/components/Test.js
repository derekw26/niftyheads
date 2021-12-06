import React, { useState } from 'react';
import axios from 'axios';
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

const SERVER_URL = "http://localhost:5000/"

firebase.initializeApp({
  apiKey: "AIzaSyApA2fPuZxsMb5xZ9H8DCxDAlR1HdW5rTo",
  authDomain: "niftyheads-b7011.firebaseapp.com",
  projectId: "niftyheads-b7011",
  storageBucket: "niftyheads-b7011.appspot.com",
  messagingSenderId: "543508334522",
  appId: "1:543508334522:web:fca7dfd7ce675ca2cb7f83"
})

const Test = (props) => {

  const [response, setResponse] = useState("No data yet...");
  const [authStatus, setAuthStatus] = useState("No Auth Status");

  const client = axios.create({
    baseURL: SERVER_URL,
    json: true
  })

  const sendRequest = function() {
    if (firebase.auth().currentUser) {
      firebase.auth().currentUser.getIdToken(true)
      .then((idToken) => {
        client({
          method: 'get',
          url: '/',
          headers: {
            'AuthToken': idToken
          }
        }).then((res) => {
          setResponse(res.data.message)
        }).catch((error) => {
          setResponse(error)
        })
      }).catch((error) => {
        setResponse("Error getting auth token")
      });
    } else {
      client({
        method: 'get',
        url: '/'
      }).then((res) => {
        setResponse(res.data.message)
      }).catch((error) => {
        setResponse(error)
      })
    }
  }

  const signIn = function() {
    firebase.auth()
    .signInWithEmailAndPassword("derek@ga.co", "asd123")
    .then(() => {
      setAuthStatus('Authorized')
    }).catch((err) => {
      setAuthStatus(err)
    })
  }

  const signOut = function() {
    firebase.auth().signOut().then(() => {
      setAuthStatus('Unauthorized')
    }).catch((err) => {
      setAuthStatus(err)
    })
  }

  return (
    <div>
      <h1>Hello</h1>
      <p>{ authStatus }</p>
      <button onClick={() => signIn() }>Sign In</button>
      <button onClick={() => sendRequest() }>Send Request</button>
      <button onClick={() => signOut() }>Sign Out</button>
      <p>{ response }</p>
      <img src={ `https://avatars.dicebear.com/api/bottts/${ Math.random() }.svg` } alt="avatar" width='500px'/>
    </div>
  );
}

export default Test;
