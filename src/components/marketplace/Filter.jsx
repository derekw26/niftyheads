import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import RangeSlider from './RangeSlider'
import CategoryList from './CategoryList'

const Filter = (props) => {

  return (
    <Paper elevation={5} sx={{ height: '100%', p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1 }}>
      <Grid container sx={{ padding:"20px" }} spacing={2}>
        <Grid item xs={12} >
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
