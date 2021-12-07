import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import _ from "lodash";

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const AvatarCard = (props) => {
  return (
    <Paper sx={{ p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item>
          <Link
            to={`/avatars/${props.uuid}`}
            state={{from}}
          >
            <ButtonBase sx={{ width: 128, height: 128 }}>
              <Img alt="complex" src={ props.url } />
            </ButtonBase>
          </Link>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                Bot #{ Math.floor(Math.random()*1000) }
              </Typography>
              <Typography variant="body2" gutterBottom>
                Full resolution 1920x1080 • JPEG
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ID: 1030114
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
                Remove
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              { props.price } ETH
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default AvatarCard;
