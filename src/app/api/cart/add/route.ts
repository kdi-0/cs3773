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
            // PRODUCT_QUANTITY: requestBody.PRODUCT_QUANTITY, //do not use this value for user's cart, this is for stock purposes
            PRODUCT_QUANTITY: 1,
            PRODUCT_PRICE: requestBody.PRODUCT_PRICE,
            PRODUCT_IMAGE: "https://picsum.photos/250/300"
        };
        console.log("product info: ", productInfo);

        //check if the product is available (in stock)
        const product = await prisma.product.findUnique({
            where: {
                PRODUCT_ID: productInfo.PRODUCT_ID
            }
        });
        if(product.PRODUCT_QUANTITY > 0){ //product available

            let existingItemIndex;
            if (cartItems != null){  // cart not empty
                existingItemIndex = cartItems.findIndex(item => item.PRODUCT_ID === requestBody.PRODUCT_ID);
            }
            else{         //    item.PRODUCT_ID producing null error when trying to be accessed in case of cart being empty (FIXED this problem)
                console.log("cart is empty/has not been created");
                cartItems=[];
                existingItemIndex = -1;
            }

            if (existingItemIndex !== -1) { // already in cart, just update using newest information
                //check to see if the user adding the product to their cart will exceed remaining stock for that product
                if(cartItems[existingItemIndex].PRODUCT_QUANTITY + 1 <= product.PRODUCT_QUANTITY){
                    cartItems[existingItemIndex].PRODUCT_QUANTITY = parseInt(cartItems[existingItemIndex].PRODUCT_QUANTITY);
                    cartItems[existingItemIndex].PRODUCT_QUANTITY += productInfo.PRODUCT_QUANTITY;
                    cartItems[existingItemIndex].PRODUCT_PRICE = productInfo.PRODUCT_PRICE;
                }
                else{
                    alert("Cannot add item to cart. You already have the entire stock for that product in your cart");
                    return NextResponse.json({});
                }
            } else {
                cartItems.push(productInfo);
            }
            console.log("Updated cart: ", cartItems);
            await kv.set(userCartKey, JSON.stringify(cartItems));
            alert("Added item to cart!")
            return NextResponse.json(cartItems);
        }
        else{
            alert("Product is out of stock. Cannot add product to cart.")
            return NextResponse.json({});
        }
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Server side error occured." });
    }
}
