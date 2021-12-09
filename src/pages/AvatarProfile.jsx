import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import LoadingCircle from '../components/LoadingCircle';
import Paper from '@mui/material/Paper';


const SERVER_URL = "http://localhost:5000/"

const dollarAULocale = Intl.NumberFormat('en-AU');

const AvatarProfile = (props) => {

  const avatarUuid = useParams().uuid
  const currentUser = props.currentUser;


  const [avatar, setAvatar] = useState(null);
  const [creator, setCreator] = useState({});
  const [ethToAudRate, setEthToAudRate] = useState(Infinity);
  const [audPrice, setAudPrice] = useState(Infinity);
  const [listingPrice, setListingPrice] = useState(0);

  const handleListingPrice = (e) => {
    setListingPrice(e.target.value);
    console.log(e.target.value)
  }

  const handleList = () => {
    axios.put(`${SERVER_URL}avatars/${avatarUuid}`, {
      "listed": true,
      "price": listingPrice
    })
    alert(`Avatar listed for ${listingPrice} ETH`);
    setAvatar(
      {
        ...avatar,
        "listed": true,
        "price": listingPrice
      }
    );
  }

  const handleUnlist = () => {
    axios.put(`${SERVER_URL}avatars/${avatarUuid}`, {
      "listed": false,
      "price": null
    })
    alert(`Avatar unlisted from marketplace`);
    setAvatar(
      {
        ...avatar,
        "listed": false,
        "price": null
      }
    );
  }

  useEffect(() => {
    axios(`${SERVER_URL}avatars/${avatarUuid}`)
      .then(responseAvatar => {
        setAvatar(responseAvatar.data);
        return axios(`${SERVER_URL}users/${responseAvatar.data.createdBy}`)
      })
      .then(responseCreator => {
        setCreator(responseCreator.data);
      })
      .catch(error => console.log(error.response))
  }, [avatarUuid]);

  useEffect(() => {
    axios('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=aud').then(res => {
      setEthToAudRate(res.data.ethereum.aud)
    })
  }, []);


  useEffect(() => {
    if (!avatar) {
      return;
    } else {
      setAudPrice(dollarAULocale.format(Number(avatar.price * ethToAudRate).toFixed(2)));
    }
  }, [ethToAudRate, creator, avatar]);


  const avatarControls = []

  if (!avatar) {
    return <LoadingCircle />
  } else if (avatar.user.uuid === currentUser.uuid) {

    if (!avatar.listed) {
      avatarControls.push(
        <>
          <TextField
            id="listing-price"
            value={listingPrice}
            label="ETH"
            type="number"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleListingPrice}
            sx={ { marginRight: '10px' }}
          />
          <Button size="large" onClick={handleList} style={{ textDecoration: 'none' }}>
            <Link
              to={`/avatars/${avatar.uuid}`}
              style={{ textDecoration: 'none' }}
            >
              LIST ON MARKETPLACE
            </Link>
          </Button>
        </>
      );
    } else {
      avatarControls.push(
          <Button size="large" onClick={handleUnlist} style={{ textDecoration: 'none' }}>
            <Link
              to={`/avatars/${avatar.uuid}`}
              style={{ textDecoration: 'none' }}
            >
              UNLIST
            </Link>
          </Button>
      )
    }

  } else {
    avatarControls.push(
      <Button size="large">
        { avatar ?
          ( avatar.listed ?
            <Link to={`/avatars/${avatar.uuid}/pay`} state={{ amount:audPrice, avatar:avatar }} style={{ textDecoration: 'none' }}>
              PURCHASE
            </Link>
          : "NOT FOR SALE" )
        : null }
      </Button>
    )
  }


  return(
    <Grid sx={{ marginTop:'40px'}} container spacing={2} columns={{ xs: 6, sm: 6, md: 12 }}>
      <Grid item xs={6} sm={6} md={6}>
        <Paper elevation={5}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <img src={ avatar ? avatar.url : null } alt=""/>
            </CardContent>
          </Card>
        </Paper>
      </Grid>

      <Grid item xs={6} sm={6} md={6}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Collection: { avatar ? avatar.category : null }
            </Typography>
            <Typography variant="h5" component="div">
              { avatar ? avatar.name : null }
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Minted by: { creator ? creator.username : null }
            </Typography>
            <Typography variant="body2">
              <p>
                Ethereum detected the minimum bag although Bitcoin is the unspent transaction output during few flippening, yet ERC20 token standard proves the safe flippening. Although Solidity returns the pump and dump for few bag, Nexo was a provably fair SHA 256, however, Dogecoin halving many centralised node although Digitex Futures based on many algo-traded hardware wallet! Someone limited a automated technical analysis after the pump and dump. Ethereum sharded a immutable on-ledger currency for many smart contract although someone proves the decentralisation of few consensus process.
              </p>
              <p>
                Tezos looked at a reinvested genesis block until the consensus process. They specialises in few market cap behind few segregated witness, nor because Ripple returns many considerable astroturfing, Ravencoin rejoins few delegated proof-of-stake during the delegated proof-of-stake. They thinking lots of instant shitcoin behind a shilling, or because VeChain built lots of minimum bagholder, Stellar chose many automated confirmation behind few digital identity! IPO sharded lots of reinvested pre-sale!
              </p>
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Contract: { avatar ? avatar.uuid : null }
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Owned by: { avatar ? avatar.user.username : null }
            </Typography>
            <Typography sx={{ mb: 1.5 }}>
              <a href="https://etherscan.io/token/0x3B3ee1931Dc30C1957379FAc9aba94D1C48a5405?a=115386" target="_blank" rel="noreferrer">View On Etherscan</a>
            </Typography>
            <Typography variant="h6" component="div">
              { avatar ? (avatar.listed ? `${ avatar.price } ETH`: null) : null }
            </Typography>
            <Typography variant="p" component="div">
              { avatar ? (avatar.listed ? `= ${ audPrice } AUD`: null) : null }
            </Typography>
          </CardContent>
          <CardActions>
            { avatarControls }
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  )
}


export default AvatarProfile;
