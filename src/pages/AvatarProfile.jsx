import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import axios from 'axios';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const SERVER_URL = "http://localhost:5000/"

const dollarAULocale = Intl.NumberFormat('en-AU');

const AvatarProfile = (props) => {

  const avatarUuid = useParams().uuid
  const currentUser = props.currentUser;
  // const location = useLocation();
  // const { avatar } = location.state;

  const [avatar, setAvatar] = useState({});
  const [creator, setCreator] = useState({});
  const [ethToAudRate, setEthToAudRate] = useState(Infinity);
  const [audPrice, setAudPrice] = useState(Infinity);

  useEffect(() => {
    axios(`${SERVER_URL}avatars/${avatarUuid}`)
      .then(responseAvatar => {
        setAvatar(responseAvatar.data);
        console.log(responseAvatar.data.createdBy)
        return axios(`${SERVER_URL}users/${responseAvatar.data.createdBy}`)
      })
      .then(responseCreator => {
        setCreator(responseCreator.data);
      })
      .catch(error => console.log(error.response))
  }, []);

  useEffect(() => {
    axios('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=aud').then(res => {
      setEthToAudRate(res.data.ethereum.aud)
    })
  }, []);

  useEffect(() => {
    setAudPrice(dollarAULocale.format(Number(avatar.price * ethToAudRate).toFixed(2)));
  }, [setEthToAudRate, creator]);

  console.log(audPrice)

  // console.log(avatar.user.uuid)
  // console.log(currentUser.uuid)

  const controlsToListAvatar = () => {
    console.log('can be listed')
    if (avatar.user.uuid === currentUser.uuid) {
      return (
        <h1>this avatar can be listed</h1>
      )
    }
  }

  return(
    <Grid container spacing={2} columns={{ xs: 6, sm: 6, md: 12 }}>
      <Grid item xs={6} sm={6} md={6}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <img src={avatar.url} alt=""/>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6} sm={6} md={6}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Collection: { avatar.category }
            </Typography>
            <Typography variant="h5" component="div">
              { avatar.name }
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Minted by: { creator.username }
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
              Owned by: { avatar.user ? avatar.user.username : null }
            </Typography>
            <Typography sx={{ mb: 1.5 }}>
              <a href="https://etherscan.io/token/0x3B3ee1931Dc30C1957379FAc9aba94D1C48a5405?a=115386" target="_blank">View On Etherscan</a>
            </Typography>
            <Typography variant="h6" component="div">
              { avatar.listed ? `${ avatar.price } ETH`: null }
            </Typography>
            <Typography variant="p" component="div">
              { avatar.listed ? `= ${ audPrice } AUD`: null }
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="large">
              { avatar.listed ?
                <Link to={`/avatars/${avatar.uuid}/pay`} state={{ amount:audPrice, avatar:avatar }}>
                  PURCHASE
                </Link>
              : "NOT FOR SALE"}
            </Button>
            { controlsToListAvatar }
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  )
}


export default AvatarProfile;
