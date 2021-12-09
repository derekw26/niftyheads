import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import './PaymentForm.css'

const SERVER_URL = "http://localhost:5000/"

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: 'black',
			color: "black",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#444" },
			"::placeholder": { color: "#999" }
		},
		invalid: {
			iconColor: "#d32f2f",
			color: "#d32f2f"
		}
	}
}

export default function PaymentForm(props) {

  const avatar = props.avatar;
  console.log(avatar)
  const currentUser = props.currentUser;
  console.log(currentUser.avatars)
  const amount = props.amount;
  const cleanAmount = parseFloat(amount.replace(/,/g, ''));
  const amountInCents = Math.round(cleanAmount * 100);


  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    })


    if (!error) {

      try {
        const { id } = paymentMethod
        const response = await axios.post(SERVER_URL + 'payment', {
          amount: amountInCents,
          id
        });


        if (response.data.success) {
          console.log("successful payment")
          setSuccess(true)

          await axios.put(SERVER_URL + `avatars/${ avatar.uuid }`, {
            "listed": false,
            "userId": currentUser.id
          });

					avatar.listed = false;
          currentUser.avatars.push(avatar);
          localStorage.setItem("user", JSON.stringify(currentUser));

        }

      } catch (error) {
        console.log("Error", error)
      }

    } else {
      console.log(error.message);
    }
  }

  return (
    <>
      {!success ?
        <form onSubmit={handleSubmit}>
					<h1 class='paymenttext'>Please enter your payment details</h1>
          <h3 class='paymenttext' id='paymentheader'>Payment amount of ${amount} AUD for the avatar below</h3>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS}/>
            </div>
          </fieldset>
          <button class="payButton">Pay</button>
        </form>
      :
      <div>
        <h1 class='paymenttext'>You just bought a NIFTYHEAD avatar!</h1>
      </div>
      }
    </>
  );
};
