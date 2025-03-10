import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { meta } from '@eslint/js'
import axios, { Axios } from 'axios'

function App() {
  const [count, setCount] = useState(0)


  const [paymentCollection, setPaymentCollection] = useState()

  const publishKey = "pk_d340a383e122ed6b019277b486a90e9c2ecf689da4533efbabaf01076f0a7368"

  const cart = {
    cart_id : "cart_01JNNNR0SBH21MXAFQ4EAJ4AH3"
  }


  function CreatePaymentCollection(){
    const  data  = axios.post("http://medusa.dev.zdrowybox.pl:9000/store/payment-collections", cart ,  {
      headers: {
        "x-publishable-api-key" : publishKey
      }
    });


    

    setPaymentCollection(data);

    console.log(paymentCollection)

    console.log(1+1)
  }
  

  return (
    <>
     <button onClick={CreatePaymentCollection}>Test</button>


    </>
  )
}

export default App
