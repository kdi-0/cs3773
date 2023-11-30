'use client';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  // get user's cart items, store user cart items in a separate table called cart. Each row could be a user id then a list of json objects (each json object has a product id and quantity), or each row represents a product (product id) and quantity with user_id as one of the primary keys.
  try {
    //GET RID OF THIS WHERE getting order price through GET in URL b/c anybody could change the value in the URL to make their order cheaper.
    //just do another query of user's  from kerwin's db instead
    // const order_total_price = props.router.query.order_total_price
    const searchParams = useSearchParams();
    const order_total_price = searchParams.get('order_total_price');
    console.log(order_total_price);
  } catch {
    console.log('ERROR, could not get order_total_price from url');
  }

  const [formData, setFormData] = useState({
    field1: '',
    field2: '',
    field3: '',
    field4: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any field is empty and have 100 character limit for fields before submitting
    if (
      Object.values(formData).every(
        (value) => value.trim() !== '' && value.length < 100
      )
    ) {
      // Handle form submission logic here

      //before hand, create the list of json objects where each json contains productid and quantity
      const products_orders = [
        { PRODUCT_ID: 3, QUANTITY: 3 },
        { PRODUCT_ID: 4, QUANTITY: 1 },
      ];

      //create order and add products to order
      //create_order(products_orders)

      //add products in user's cart to order -> (maybe dont use ProductOrder table b/c prisma tables can hold list of json objects)

      //remove items in user's cart

      console.log('Form submitted:', formData);

      router.push('/'); // navigate user to home page upon successful order creation
      alert('Order successfully created');
    } else {
      alert(
        'Please fill in all fields before submitting and make sure fields are less than 100 characters'
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Field 1:
          <input
            type="text"
            name="field1"
            value={formData.field1}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Field 2:
          <input
            type="text"
            name="field2"
            value={formData.field2}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Field 3:
          <input
            type="text"
            name="field3"
            value={formData.field3}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Field 4:
          <input
            type="text"
            name="field4"
            value={formData.field4}
            onChange={handleChange}
          />
        </label>
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

//   return (
//     <main>
//       <div>Order ID: {params.orderId}</div>
//     </main>
//   );
// }
