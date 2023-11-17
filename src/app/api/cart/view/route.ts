import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

interface UserSession {
    name: string;
    email: string;
}

export async function POST(request: Request) {
    console.log("/api/cart/view")
    try {
        const userDetails: UserSession = await request.json();

        const userCart = await kv.get(`${userDetails.email}:cart`);
        console.log(userCart)
        

        if (userCart) {
            let i=0;
            let sum=0;
            // for(i=0; i<userCart.length; i++){  //for loop seems to be slowing down app
            //  sum += userCart[i].PRODUCT_QUANTITY * userCart[i].PRODUCT_PRICE;
            // }
            // const ret = {
            //     userCart: userCart,
            //     total_price: sum
            // }
            return NextResponse.json(JSON.stringify(ret));
        } else {
            return NextResponse.json({});
        }
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "An error occurred while processing your request." });
    }
}

