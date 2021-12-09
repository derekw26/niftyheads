import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import RangeSlider from './RangeSlider'
import CategoryList from './CategoryList'
import _ from "lodash";


const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const Filter = (props) => {

  return (
    <Paper sx={{ height: '100%', p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>
            <h3>Price</h3>
          </Typography>
          <RangeSlider onChange={props.onPriceRangeChange} />
        </Grid>
        <Grid item xs={12}>
          <Typography>
            <h3>Collection</h3>
          </Typography>
          <CategoryList onChange={props.onCollectionChange}/>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Filter;
