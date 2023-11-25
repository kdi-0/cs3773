import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
export async function POST(request: Request) {
    console.log("/api/cart/add")
    try {
        const requestBody = await request.json();
        console.log("product being added:", requestBody)

        const userCartKey = `${requestBody.email}:cart` as string;

        let userCart: string = await kv.get(userCartKey);
        let cartItems = [];

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
            // PRODUCT_QUANTITY: requestBody.PRODUCT_QUANTITY, //do not use this value for user's cart, this is for stock purposes
            PRODUCT_QUANTITY: 1,
            PRODUCT_PRICE: requestBody.PRODUCT_PRICE,
            PRODUCT_IMAGE: requestBody.PRODUCT_IMAGE,
        };
        console.log("product info: ", productInfo);

        let existingItemIndex;
        if (cartItems != null) {  // cart not empty
            existingItemIndex = cartItems.findIndex(item => item.PRODUCT_ID === requestBody.PRODUCT_ID);
        }
        else {         //    item.PRODUCT_ID producing null error when trying to be accessed in case of cart being empty (FIXED this problem)
            console.log("cart is empty/has not been created");
            cartItems = [];
            existingItemIndex = -1;
        }

        if (existingItemIndex !== -1) {
            // already in cart, just update using newest information
            cartItems[existingItemIndex].PRODUCT_QUANTITY = parseInt(cartItems[existingItemIndex].PRODUCT_QUANTITY);
            cartItems[existingItemIndex].PRODUCT_QUANTITY += productInfo.PRODUCT_QUANTITY;
            cartItems[existingItemIndex].PRODUCT_PRICE = productInfo.PRODUCT_PRICE;
        } else {
            cartItems.push(productInfo);
        }
        console.log("Updated cart: ", cartItems);
        await kv.set(userCartKey, JSON.stringify(cartItems));

        return NextResponse.json(cartItems);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Server side error occured." });
    }
}
