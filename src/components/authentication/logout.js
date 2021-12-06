import { Routes, Route } from 'react-router-dom'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { auth } from "../../firebase.js";
import Login from "./Login"

const logout = async (props) => {

    await signOut(auth);
    alert("logged out")

    return (
      <Routes>
        <Route path="/" element={<Login />}/>
      </Routes>
    )
}

export default logout;
