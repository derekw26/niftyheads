import React, { useState, useEffect } from 'react';
import AvatarCard from '../components/marketplace/AvatarCard';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Filter from '../components/marketplace/Filter';
import LoadingCircle from '../components/LoadingCircle';

const Marketplace = (props) => {

  const avatars = props.avatars;
  const display = [];
  console.log(display)

  avatars.forEach(avatar => {
    display.push(
      <Grid item xs={3}>
        <AvatarCard url={avatar.url} price={avatar.price} uuid={avatar.uuid}/>
      </Grid>
    );
  })

  if (props.isLoading) {
    return <LoadingCircle />
  }

  return(
    <Box sx={{ flexGrow: 1 }}>
      <h1>Coming Soon</h1>
      <Grid container xs={12} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={3}>
          <Filter />
        </Grid>
        { display }
      </Grid>
    </Box>
  )
}

export default Marketplace;
