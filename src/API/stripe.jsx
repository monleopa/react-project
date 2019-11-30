import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import './stripe.scss'

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price;
  const publishableeKey = 'pk_test_3cnaaJYKej4ZqPMljydHlSmP00WLd4vmgd';

  const onToken = token => {
    console.log(token);
    alert("success");
  }

  return (
    <StripeCheckout
      label='Pay now'
      name="NDANH"
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is 500$`}
      billingAddress
      shippingAddress
      amount={priceForStripe}
      panelLabel='Order'
      token={onToken}
      stripeKey={publishableeKey}
      className="form-control btn stripe-btn"
    />
  );

}
export default StripeCheckoutButton