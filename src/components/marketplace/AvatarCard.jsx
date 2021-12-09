import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
// import _ from "lodash";

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const AvatarCard = (props) => {

  const avatar = props.avatar;

  return (
    <Paper elevation={5} sx={{ p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item>
          <Link
            to={`/avatars/${avatar.uuid}`}
            state={{ avatar: avatar }}
          >
            <ButtonBase sx={{ width: 128, height: 128 }}>
              <Img alt="complex" src={ avatar.url } />
            </ButtonBase>
          </Link>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                <strong>{ avatar.name }</strong>
              </Typography>
              <Typography variant="body2" gutterBottom>
                { avatar.category }
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
                <Link
                  to={`/avatars/${avatar.uuid}`}
                  state={{ avatar: avatar }}
                  style={{ textDecoration: 'none' }}
                >
                  Inspect
                </Link>
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              { avatar.listed ? avatar.price + ' ETH' : 'Unlisted'}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default AvatarCard;
