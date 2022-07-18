import React, { useContext } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import '../styles/components/Payment.css';

const Payment = () => {
  const { state, addNewOrder } = useContext(AppContext);
  const { cart, buyer } = state;
  const navigate = useNavigate();

  const paypalOptions = {
    clientId:
      'AURuFgfto5OpPSUcP7SkbIZsn1xv6MSxMocGQREzplJ102IjVt4HQKfhweNNejHf83QetDl5ytvcex4A',
    intent: 'capture',
    currency: 'USD',
  };

  const buttonStyles = {
    layout: 'vertical',
    shape: 'rect',
  };

  const handleSumTotal = () => {
    const reducer = (acumulator, currentValue) =>
      acumulator + currentValue.price;
    const sum = cart.reduce(reducer, 0);
    return sum;
  };

  const handlePaymentSuccess = (data) => {
    if (data.status === 'COMPLETED') {
      const newOrder = {
        buyer,
        product: cart,
        payment: data,
      };
      addNewOrder(newOrder);
      navigate('/checkout/success');
    }
  };

  return (
    <div className="Payment">
      <div className="Payment-content">
        <h3>Resumen pedido</h3>
        {cart.map((item) => (
          <div className="Payment-item" key={item.title}>
            <div className="Payment-element">
              <h4>{item.title}</h4>
              <span>{item.price}</span>
            </div>
          </div>
        ))}
        <div className="Payment-button">
          <PayPalButton
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: 'USD',
                      value: handleSumTotal(),
                    },
                  },
                ],
              });
            }}
            paypalOptions={paypalOptions}
            buttonStyles={buttonStyles}
            amount={handleSumTotal()}
            onPaymentStart={() => console.log('start payment')}
            onSuccess={(data) => handlePaymentSuccess(data)}
            onError={(error) => console.log(error)}
            onCancel={(data) => console.log(data)}
          />
        </div>
      </div>
    </div>
  );
};

export default Payment;
