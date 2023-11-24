'use client'
import React, { useState, useEffect} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import axios from 'axios';

export default function OrderForm({cartItems, userEmail, order_total_price, setCartItems}) {
    const router = useRouter();
    // console.log("Test", cartItems, userEmail, order_total_price);

    // console.log("Cart items from Order Form:" , cartItems);
    const [formData, setFormData] = useState({
        name: '',
        phoneNum: '',
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

    const handleSubmit = async (e) => 
    {
        if(cartItems.length !== 0 && cartItems !== null)
        {
            e.preventDefault();

            // Check if any field is empty and have 100 character limit for fields before submitting
            if (Object.values(formData).every((value) => (value.trim() !== '' && value.length < 100))) 
            {
                try{
                    //queries to order table in prisma (creates order)
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

                    //empties user's cart
                    await axios.post('/api/order/EmptyCart', {
                        userEmail: userEmail,
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then((response) => {
                        console.log("Cart has been emptied");
                        setCartItems([]);
                    }).catch((error) => {
                        console.log(error);
                    });

                    alert('Order successfully placed');
                    router.push('/'); // navigate user to home page upon successful order creation
                }
                catch{
                    console.log("ERROR: Problem occurred when submitting order form");
                }
            } 
            else 
                alert('Please fill in all fields before submitting and make sure fields are less than 100 characters');
        
        
        }
        else
            alert("ERROR: Cart is empty, cannot place an order");
    };

    return (
    <div>
      <form className="bg-green-100 p-8 rounded shadow-md w-96" onSubmit={handleSubmit}>
        <label className="block mb-2">
          First and Last Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input mt-1"
          />
        </label>
        <br />

        <label className="block mb-2">
          Phone Number:
          <input
            type="text"
            name="phoneNum"
            value={formData.phoneNum}
            onChange={handleChange}
            className="form-input mt-1"

          />
        </label>
        <br />

        <label className="block mb-2">
          Street Address:
          <input
            type="text"
            name="street_address"
            value={formData.street_address}
            onChange={handleChange}
            className="form-input mt-1"
          />
        </label>
        <br />

        <label className="block mb-2">
          City:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="form-input mt-1"

          />
        </label>
        <br />

        <label className="block mb-2">
          State:
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="form-input mt-1"
          />
        </label>
        <br />

        <label className="block mb-2">
          Zip Code:
          <input
            type="text"
            name="zip_code"
            value={formData.zip_code}
            onChange={handleChange}
            className="form-input mt-1"
          />
        </label>
        <br />

        <label className="block mb-2">
          Card Number:
          <input
            type="text"
            name="card_number"
            value={formData.card_number}
            onChange={handleChange}
            className="form-input mt-1"
          />
        </label>
        <br />

        <label className="block mb-2">
          Expiration Date (MM/YY):
          <input
            type="text"
            name="exp"
            value={formData.exp}
            onChange={handleChange}
            className="form-input mt-1"
          />
        </label>
        <br />

        <label className="block mb-2">
          CVV:
          <input
            type="text"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            className="form-input mt-1"
          />
        </label>
        <br />

        <button type="submit" className="bg-white border font-semibold">Submit</button>
      </form>
    </div>
  );
};

