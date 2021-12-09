import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm'

const PUBLIC_KEY = "pk_test_51K4bUbA9C1mFaSj8Kt7JMLQgPOjUqMEIR3Amo2sOLT6Br4bENNk6X0EF0yBxy0UvVtl0oNeGKQDlqAcDwpEdBiGy000ZqFu46h"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {

  return (
    <Elements stripe={stripeTestPromise}>
      <h1>Payment details below</h1>
      <PaymentForm />
    </Elements>
  )
}
