'use client'
import React, { useState, useEffect} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import axios from 'axios';

export default function OrderForm({cartItems, userEmail, order_total_price}) {
    const router = useRouter();
    // console.log("Test", cartItems, userEmail, order_total_price);

    // console.log("Cart items from Order Form:" , cartItems);
    const [formData, setFormData] = useState({
        name: '',
        street_address: '',
        city: '',
        state: '',
        zip_code: '',
        card_number: '',
        exp: '',
        cvv: '',
    });  



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if any field is empty and have 100 character limit for fields before submitting
        if (Object.values(formData).every((value) => (value.trim() !== '' && value.length < 100))) {
            try{
                //create order and add products to order
                //create_order(products_orders)
                await axios.post('/api/order/CreateOrder', {
                    userEmail: userEmail,
                    formData: formData,
                    cartItems: cartItems,
                    order_total_price: order_total_price
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                    console.log("Order created with query");
                }).catch((error) => {
                    console.log(error);
                });

                //remove items in user's cart


                
                // router.push('/'); // navigate user to home page upon successful order creation
                alert('Order successfully placed');
            }
            catch{
                console.log("ERROR: Problem occurred when submitting order form");
            }
    } else {
      alert('Please fill in all fields before submitting and make sure fields are less than 100 characters');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          First and Last Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Street Address:
          <input
            type="text"
            name="street_address"
            value={formData.street_address}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          City:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          State:
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Zip Code:
          <input
            type="text"
            name="zip_code"
            value={formData.zip_code}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Card Number:
          <input
            type="text"
            name="card_number"
            value={formData.card_number}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Expiration Date (MM/YY):
          <input
            type="text"
            name="exp"
            value={formData.exp}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          CVV:
          <input
            type="text"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
          />
        </label>
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

