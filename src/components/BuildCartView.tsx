import React from "react";
import prisma from '@/src/app/prismadb';


const BuildCartView = async(props) => {
    const items = [];
    const {existingCartItems} = props
    let i=0
    for(i=0; i<existingCartItems.length; i++){
      const prod_id = existingCartItems[i].PRODUCT_ID
      const prod_quantity = existingCartItems[i].PRODUCT_QUANTITY

      const result = await prisma.product.findUnique({
        where: {PRODUCT_ID: prod_id},
      })

      const total_cost = prod_quantity * result.PRODUCT_PRICE 

      // JSX code to be returned
      items.push(
        <div key={i}>
            <p>ProductId: {prod_id}</p>
            <p>{result.PRODUCT_NAME}</p>
            <p>{total_cost}</p>
            <p>Quantity: {prod_quantity}</p>
            <div className="relative rounded-lg">
                <img
                  src={result.PRODUCT_IMAGE.split('","')[0].slice(2, -2)}
                  className="w-[250px] h-[300px] object-cover object-top rounded-lg"
                  alt=""
                />
            </div>
        </div>
      );
    }

    return items;
  }

  export default BuildCartView