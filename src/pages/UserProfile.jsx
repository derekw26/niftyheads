import React, { Component } from "react";
import AuthService from "../services/authService";


class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
  }

  render() {
    const { currentUser } = this.state;
    console.log(currentUser)

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}{"'s"}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Token:</strong>{" "}
          {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p>
        <p>
          <strong>Id:</strong>{" "}
          {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        <p>
          <strong>Admin:</strong>{" "}
          {currentUser.isAdmin ? "Yes" : "No" }
        </p>
      </div>
    );
  }
}

export default UserProfile;
