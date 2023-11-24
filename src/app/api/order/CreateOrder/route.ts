import { NextResponse } from "next/server";
import prisma from '@/src/app/prismadb';

//prisma query to create an order for a user
export async function POST(request: Request){
    console.log("/api/order/CreateOrder");
    try{
        const requestBody = await request.json();
        // console.log("requestBody for CreateOrder: ", requestBody);

        // concatenate  street address, city, state, zip code together 
        // separated by commas and place in ORDER_SHIPPING_ADDRESS
        const ORDER_SHIPPING_ADDRESS = requestBody.formData.street_address + "," + requestBody.formData.city + "," 
            + requestBody.formData.state + "," + requestBody.formData.zip_code;

        //figure out user id based on user's email
        const user = await prisma.user.findUnique({
            where: {USER_EMAIL: requestBody.userEmail}
        });
        console.log("User: ", user);

        //npx prisma migrate dev -> run command to update changes made to schema.prisma

        //Products in the order are indexed in the product_id and product_quantity arrays in the Order table. 
        //Ex: 2nd index in both arrays correspond to the 2nd product in the order
        let product_id = [];
        let product_quantity = [];
        requestBody.cartItems.forEach(product => {
            product_id.push(Number(product.PRODUCT_ID));
            product_quantity.push(Number(product.PRODUCT_QUANTITY));
        });

        //before order is created check to see if product(s) still available (possible added feature)

        //Create order with prisma query (adds a new row to the order table in prisma db)
        await prisma.order.create({
          data: {
            USER_ID: Number(user.USER_ID),
            ORDER_DATE: new Date(),
            ORDER_TOTAL_PRICE: Number.parseFloat(requestBody.order_total_price),
            ORDER_SHIPPING_ADDRESS: ORDER_SHIPPING_ADDRESS,
            Customer_Name: requestBody.formData.name, //ignore type error
            Customer_PhoneNum: requestBody.formData.phoneNum,
            IS_CURRENT_ORDER: true,
            PRODUCT_ID: product_id,
            PRODUCT_QUANTITY: product_quantity
          },
        });    

        //see if order was created
        const orders = await prisma.order.findMany();
        console.log(orders);       
        
        // update products' stock quantity after order has been made
        for(let i=0; i < product_id.length; i++){
            // get current quantity (stock) for a product
            const product = await prisma.product.findUnique({ 
                where: {
                    PRODUCT_ID: product_id[i]
                }
            });
            //update the product's quantity (stock)
            const updatedProduct =await prisma.product.update({
                where: {
                    PRODUCT_ID: product_id[i],
                },
                data: {
                    PRODUCT_QUANTITY: product.PRODUCT_QUANTITY - product_quantity[i]
                },
            });
            console.log(`Product quantity (stock) update for product id:${product_id[i]}:  
                ${product.PRODUCT_QUANTITY} -> ${updatedProduct.PRODUCT_QUANTITY}`);
        }
        
        return NextResponse.json({});
    }
    catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Server side error occured when creating order." });
    }
}