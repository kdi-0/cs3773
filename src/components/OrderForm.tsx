'use client'
import React, { useState, useEffect} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import axios from 'axios';

// const create_order = async(product_orders) => {
//     try{
//         await prisma.order.create({
//           data: {
//             USER_ID: 1,
//             ORDER_DATE: new Date(),
//             product_orders: product_orders,
//             ORDER_TOTAL_PRICE: 33.45,
//             ORDER_SHIPPING_ADDRESS: '3333 street, state, zip',
//             IS_CURRENT_ORDER: true
//           },
//         })
//     }
//     catch{
//       alert("ERROR creating order")
//     }
// }

export default function OrderForm({cartItems}) {
    const router = useRouter();

    console.log("Cart items from Order Form:" , cartItems);
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
            console.log("Form data: ", formData);
            try{
                // concatenate  street address, city, state, zip code together 
                // separated by commas and place in ORDER_SHIPPING_ADDRESS
                const ORDER_SHIPPING_ADDRESS = formData.street_address + "," + formData.city + "," + formData.state + "," + formData.zip_code;
                
                //create order and add products to order
                //create_order(products_orders)
                


                //add products in user's cart to order -> (maybe dont use ProductOrder table b/c prisma tables can hold list of json objects)


                //remove items in user's cart



                console.log('Form submitted:', formData);
                
                // router.push('/'); // navigate user to home page upon successful order creation
                alert('Order successfully created');
            }
            catch{

            }
    } else {
      alert('Please fill in all fields before submitting and make sure fields are less than 100 characters');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Street Address:
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

