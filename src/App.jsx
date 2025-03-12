import { loadStripe } from "@stripe/stripe-js"
import PaymentSession from "./components/PaymentSession"
import { Elements } from "@stripe/react-stripe-js"

const stripePromise = loadStripe("pk_test_51QysgjFJBecSeG72fozsNCBqsyN08rJvjE78F2jOR4UAehqYWVcB8YUU9h3FYBGAuVHLkcTuPjQg9R5RUJQMBxvA00wM8yBA8p")

function App() {
  
  
  

  return (
    <>

    <Elements stripe={stripePromise}>

      <PaymentSession/>
    </Elements>
    
    </>
  )
}

export default App
