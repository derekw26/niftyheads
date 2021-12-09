import React, { Component } from "react";
import AuthService from "../services/authService";
import AvatarCard from '../components/marketplace/AvatarCard';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
  }

  render() {
    const { currentUser } = this.state;
    console.log(currentUser.avatars)

    const avatars = currentUser.avatars.map(avatar => {
      return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AvatarCard avatar={avatar} />
        </Grid>
      )
    })

    return (
          <Box sx={{ flexGrow: 1 }}>
            <div>
              <Typography>
                <header className="jumbotron">
                  <h1>
                    <strong>{currentUser.username}{"'s"}</strong> Profile
                  </h1>
                </header>
                <p>
                  <strong>Token:</strong>{" "}
                  {currentUser.accessToken.substring(0, 20)} ...{" "}
                  {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
                </p>
                <p>
                  <strong>Wallet ID:</strong>{" "}
                  {currentUser.uuid}
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  {currentUser.email}
                </p>
                <p>
                  <strong>Admin:</strong>{" "}
                  {currentUser.isAdmin ? "Yes" : "No" }
                </p>

                <h3><strong>Avatars Owned</strong>{" "}</h3>
            </Typography>
            <Grid container xs={12} rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 2, lg: 3 }}>
              { avatars }
            </Grid>

          </div>
          </Box>
    );
  }
}

export default UserProfile;
