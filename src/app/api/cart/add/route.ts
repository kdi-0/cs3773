import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
export async function POST(request: Request) {
    console.log("/api/cart/add")
    try {
        const requestBody = await request.json();

        const userCartKey = `${requestBody.email}:cart` as string;

        let userCart: string = await kv.get(userCartKey);
        let cartItems = [];

        console.log("HERE");
        try {
            console.log(userCart);
            cartItems = JSON.parse(JSON.stringify(userCart));
            console.log("Current Cart");
            console.log(cartItems);
        } catch (e) {
            console.log(e)
        }


        let productInfo = {
            PRODUCT_ID: requestBody.PRODUCT_ID,
            PRODUCT_NAME: requestBody.PRODUCT_NAME,
            PRODUCT_QUANTITY: requestBody.PRODUCT_QUANTITY,
            PRODUCT_PRICE: requestBody.PRODUCT_PRICE,
            PRODUCT_IMAGE: "https://picsum.photos/250/300"
        };
        let existingItemIndex = cartItems.findIndex(item => item.PRODUCT_ID === requestBody.PRODUCT_ID);
        if (existingItemIndex !== -1) {
            // already in cart, just update using newest information
            cartItems[existingItemIndex].PRODUCT_QUANTITY = parseInt(cartItems[existingItemIndex].PRODUCT_QUANTITY);
            cartItems[existingItemIndex].PRODUCT_QUANTITY += productInfo.PRODUCT_QUANTITY;
            cartItems[existingItemIndex].PRODUCT_PRICE = productInfo.PRODUCT_PRICE;
        } else {
            cartItems.push(productInfo);
        }
        await kv.set(userCartKey, JSON.stringify(cartItems));

        return NextResponse.json(cartItems);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Server side error occured." });
    }
}
