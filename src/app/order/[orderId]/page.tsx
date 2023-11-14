import { useRouter } from 'next/router';
import React, { useState } from 'react';

const create_order = async(product_orders) => {
    try{
        await prisma.order.create({
          data: {
            USER_ID: 1,
            ORDER_DATE: new Date(),
            product_orders: product_orders,
            // PRODUCTS: {
            //   PRODUCT_ID: 33,
            //   QUANTITY: 3
            // },
            ORDER_TOTAL_PRICE: 33.45,
            ORDER_SHIPPING_ADDR: '3333 street, state, zip',
            IS_CURRENT_ORDER: true
          },
        })
    }
    catch{
      alert("ERROR creating order")
    }
}

export default async function Page({ params }: { params: { orderId: string } }) {

  // get user's cart items, store user cart items in a separate table called cart. Each row could be a user id then a list of json objects (each json object has a product id and quantity), or each row represents a product (product id) and quantity with user_id as one of the primary keys.

   
   

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
    if (Object.values(formData).every((value) => (value.trim() !== '' && value.length < 100))) {
      // Handle form submission logic here

      //before hand, create the list of json objects where each json contains productid and quantity
      const products_orders = [{PRODUCT_ID: 3, QUANTITY: 3}, {PRODUCT_ID: 4, QUANTITY: 1}]

      //create order and add products to order
      create_order(products_orders)

      //add products in user's cart to order -> (maybe dont use ProductOrder table b/c prisma tables can hold list of json objects)


      //remove items in user's cart



      console.log('Form submitted:', formData);
      const router = useRouter()
      router.push('/') // navigate user to home page upon successful order creation
      alert('Order successfully created')
    } else {
      alert('Please fill in all fields before submitting and make sure fields are less than 100 characters');
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
};





  

//   return (
//     <main>
//       <div>Order ID: {params.orderId}</div>
//     </main>
//   );
// }
