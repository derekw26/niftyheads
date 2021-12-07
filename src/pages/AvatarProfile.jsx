import React, { useState } from 'react';
import Grid from '@mui/material/Grid';

const SERVER_URL = "http://localhost:5000/"

const AvatarProfile = (props) => {

  return(
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <div></div>
      </Grid>
      <Grid item xs={4}>
        <div></div>
      </Grid>
    </Grid>
  )
}


export default AvatarProfile;
