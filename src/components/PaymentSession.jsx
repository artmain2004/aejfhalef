import { useState } from 'react'
import '../App.css'
import axios, { Axios } from 'axios'
import { useClientSecretStore } from '../store/clientSecretStore'
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { CardElement } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'


function PaymentSession() {
  

  const [paymentCollection, setPaymentCollection] = useState()

  const { clientSecret, setClientSecret } = useClientSecretStore();

  const stripePromise = loadStripe("pk_test_51QysgjFJBecSeG72fozsNCBqsyN08rJvjE78F2jOR4UAehqYWVcB8YUU9h3FYBGAuVHLkcTuPjQg9R5RUJQMBxvA00wM8yBA8p")

  const stripe = useStripe();

  const elements = useElements();
   
 

  const publishKey = "pk_d340a383e122ed6b019277b486a90e9c2ecf689da4533efbabaf01076f0a7368"

  const cart = {
    cart_id : "cart_01JNNNR0SBH21MXAFQ4EAJ4AH3"
  }


  const paymentSessionBody = {
    provider_id: "pp_stripe_stripe"
    
  }

  async function CreatePaymentCollection(){
    try {
      
      const response = await axios.post("https://medusa.dev.zdrowybox.pl/store/payment-collections", cart, {
        headers: {
          "x-publishable-api-key": publishKey
        }
      });
      
      const data = response.data.payment_collection;
      setPaymentCollection(data);
  
      if (data) {
        
        const paymentSessionBody = {
          provider_id: "pp_stripe_stripe",
          
        };
  
        const createSessionResponse = await axios.post(
          `https://medusa.dev.zdrowybox.pl/store/payment-collections/${data.id}/payment-sessions`, 
          paymentSessionBody, 
          {
            headers: {
              "x-publishable-api-key": publishKey
            }
          }
        );
        
        const paymentSession = createSessionResponse.data.payment_collection.payment_sessions[0].data.client_secret;;
        const clientSecret = paymentSession;
        
        
        setClientSecret(clientSecret)
        
      
      }
    } catch (error) {
      console.error("Ошибка при создании платежной сессии:", error);
    }
  }


  async function HandleSubmit(event) {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          
        },
      },
    });

    if (result.error) {
      console.error(result.error.message);

    } else {
      
      console.log('Payment succeeded:', result.paymentIntent);
    
    }

  }

  
  

  return (
    <>
      <button onClick={CreatePaymentCollection}>Create Payment Session</button>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <form onSubmit={HandleSubmit}>
            <PaymentElement options={{
              paymentMethodOrder: ['apple_pay', 'google_pay']
            }} />
            <button type="submit" disabled={!stripe}>
              Pay
            </button>

            
          </form>
        </Elements>
      )}
    </>
  )
}

export default PaymentSession


