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

    console.log(avatars)

    return (
          <Box sx={{ flexGrow: 1 }}>

            <Typography>
              <header className="jumbotron">
                <h1>
                  <strong>{currentUser.username}{"'s"}</strong> Profile
                </h1>
              </header>
              { currentUser.isAdmin ?
                <>
                  <p>
                    <strong>ADMINISTRATOR</strong>{" "}
                  </p>
                  <p>
                    <strong>Token:</strong>{" "}
                    {currentUser.accessToken.substring(0, 20)} ...{" "}
                    {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
                  </p>
                </>
              : null }
              <p>
                <strong>Wallet ID:</strong>{" "}
                {currentUser.uuid}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                {currentUser.email}
              </p>
              <h3><strong>Avatars Owned</strong>{" "}</h3>
            </Typography>
            <Grid mt={{ xs:2 }} container xs={12} rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 2, lg: 3 }}>
              { avatars.length ?
              avatars :
              <Grid item xs={12} style={{ display: "flex", alignItems: "center" }}>
                <Typography>
                  <p>
                    None, purchase some from the marketplace!
                  </p>
                </Typography>
              </Grid>
              }
            </Grid>
          </Box>
    );
  }
}

export default UserProfile;
