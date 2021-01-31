import React, { useState } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import './App.css';


function App() {
  const [product, setProduct] = useState({
    name: 'arthur',
    price: 30,
    productBy: 'enov tech'
  })

  const makePayment = token => {
    const body = {
      token,
      product
    }
    const headers = {
      "Content-Type": "application/json"
    }
    const login = () => {
      axios({
        method: "POST",
        body: JSON.stringify(body),
        withCredentials: true,
        url: "http://localhost:4000/payment"
      }).then((response) => {
        console.log(response)
      
      const {status} = response;
      console.log(status)
      })
      .catch(error => console.log(error))
    };
  }
  return (
    <div className="App">
      <header className="App-header">
        <StripeCheckout 
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
          token={makePayment}
          name={product.name}
          amount={product.price}>
            <button className="btn-large pink">buy me @ #{product.price} </button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
