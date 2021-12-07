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

const Filter = () => {
  return (
    <Paper sx={{ height: '100%', p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h3>Price</h3>
          <RangeSlider />
        </Grid>
        <Grid item xs={12}>
          <h3>Category</h3>
          <CategoryList />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Filter;
