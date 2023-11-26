import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import prisma from '@/src/app/prismadb';

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
            PRODUCT_QUANTITY: requestBody.quantity,
            PRODUCT_PRICE: requestBody.PRODUCT_PRICE,
            PRODUCT_IMAGE: requestBody.PRODUCT_IMAGE,
        };
        console.log("product info: ", productInfo);

        //check if the product is available (in stock)
        const product = await prisma.product.findUnique({
            where: {
                PRODUCT_ID: productInfo.PRODUCT_ID
            }
        });
        if (product.PRODUCT_QUANTITY > 0) { //product available

            let existingItemIndex;
            if (cartItems != null) {  // cart not empty
                existingItemIndex = cartItems.findIndex(item => item.PRODUCT_ID === requestBody.PRODUCT_ID);
            }
            else {         //    item.PRODUCT_ID producing null error when trying to be accessed in case of cart being empty (FIXED this problem)
                console.log("cart is empty/has not been created");
                cartItems = [];
                existingItemIndex = -1;
            }

            if (existingItemIndex !== -1) { // already in cart, just update using newest information
                //check to see if the user adding the product to their cart will exceed remaining stock for that product
                if (cartItems[existingItemIndex].PRODUCT_QUANTITY + productInfo.PRODUCT_QUANTITY <= product.PRODUCT_QUANTITY) {
                    cartItems[existingItemIndex].PRODUCT_QUANTITY = parseInt(cartItems[existingItemIndex].PRODUCT_QUANTITY);
                    cartItems[existingItemIndex].PRODUCT_QUANTITY += productInfo.PRODUCT_QUANTITY;
                    cartItems[existingItemIndex].PRODUCT_PRICE = productInfo.PRODUCT_PRICE;
                }
                else {
                    return NextResponse.json({ status: "overflow stock" });
                }
            } else {
                cartItems.push(productInfo);
            }
            console.log("Updated cart: ", cartItems);
            await kv.set(userCartKey, JSON.stringify(cartItems));
            return NextResponse.json({ cartItems, status: "success" });
        }
        else {
            return NextResponse.json({ status: "out of stock" });
        }
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Server side error occured." });
    }
}
