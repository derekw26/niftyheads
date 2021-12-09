import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AvatarCard from '../components/marketplace/AvatarCard';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Filter from '../components/marketplace/Filter';
import LoadingCircle from '../components/LoadingCircle';
import Typography from '@mui/material/Typography';
// import Skeleton from '@mui/material/Skeleton';
import './Marketplace.css'

const SERVER_URL = "http://localhost:5000/"

const Marketplace = (props) => {
  const [priceRange, setPriceRange] = useState([]);
  const [collections, setCollections] = useState([]);
  const [avatars, setAvatars] = useState([])

  const displayAvatars = [];

  useEffect(() => {
    axios.get(SERVER_URL + 'avatars').then(res => {
      const avatars = res.data;
      setAvatars(avatars);
    });
  }, []);



  const selectedCollections = (values) => {
    setCollections(values);

  }

  const selectedPriceRange = (values) => {
    setPriceRange(values);
    console.log(values)
  }


  avatars.forEach(avatar => {
    if (collections.includes(avatar.category)
    && avatar.price > priceRange[0]
    && avatar.price < priceRange[1]) {
      displayAvatars.push(
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <AvatarCard avatar={avatar} />
        </Grid>
      );
    }
  })


  // if (!displayAvatars) {
  //   return <LoadingCircle />
  // }

  return(
    <div>
      <Typography>
        <h1 class='marketplacetitle'>Marketplace</h1>
      </Typography>
      <div className="row">
        <div className="leftcolumn">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container xs={12} rowSpacing={1} columnSpacing={{ xs: 1, sm: 1 }}>
              <Grid item xs={12}>
                <Filter onPriceRangeChange={selectedPriceRange} onCollectionChange={selectedCollections}/>
              </Grid>
            </Grid>
          </Box>
        </div>
        <div className="rightcolumn">
          <Box sx={{ flexGrow: 1 }}>

            <Grid container xs={12} rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 2, lg: 3 }}>
              { displayAvatars.length === 0 ?
                <Typography id="noresults">
                  <h4>No results</h4>
                </Typography> : displayAvatars }
            </Grid>
          </Box>
        </div>
      </div>
    </div>
  )
}

export default Marketplace;
