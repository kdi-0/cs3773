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
        

        // await prisma.order.create({
        //   data: {
        //     USER_ID: 1,
        //     ORDER_DATE: new Date(),
        //     product_orders: product_orders,
        //     ORDER_TOTAL_PRICE: 33.45,
        //     ORDER_SHIPPING_ADDRESS: ORDER_SHIPPING_ADDRESS,
        //     IS_CURRENT_ORDER: true
        //   },
        // })    
        return NextResponse.json({});
    }
    catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Server side error occured." });
    }
}