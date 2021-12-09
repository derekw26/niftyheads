import React from 'react';
import { useLocation } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
import AvatarCard from '../../components/marketplace/AvatarCard';
import Typography from '@mui/material/Typography';

const PUBLIC_KEY = "pk_test_51K4bUbA9C1mFaSj8Kt7JMLQgPOjUqMEIR3Amo2sOLT6Br4bENNk6X0EF0yBxy0UvVtl0oNeGKQDlqAcDwpEdBiGy000ZqFu46h"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer(props) {

  const currentUser = props.currentUser;
  const location = useLocation();
  const { amount, avatar } = location.state;

  return (
    <Elements stripe={stripeTestPromise}>
      <Typography>
        <PaymentForm class='paymentForm' currentUser={currentUser} amount={amount} avatar={avatar} />
        <br/>
        <AvatarCard avatar={avatar}/>
      </Typography>
    </Elements>
      )
}
