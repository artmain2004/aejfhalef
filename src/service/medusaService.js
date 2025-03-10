import axios from "axios";

export function CreatePaymentCollection(cart){
    const { data } = axios.post("http://medusa.dev.zdrowybox.pl:9000/store/payment-collections", cart ,  {
        headers: {
          "x-publishable-api-key" : publishKey
        }})

    return data;
}

export function CreatePaymentSession(paymentCollectionId){
    axios.post("")
}


