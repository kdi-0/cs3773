import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

//remove product from cart while on cart page
export async function POST(request: Request) {
    console.log("/api/cart/delete")
    try {
        const requestBody = await request.json();
        console.log("product being deleted from cart:", requestBody)

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

        let indexToRemove = -1;
        let i=0;
        //loop through cart items and remove the product from the cart items list then reassign updated cart to vercel db
        for(i=0; i<cartItems.length; i++){
            if(cartItems[i].PRODUCT_ID === requestBody.PRODUCT_ID){
                try{
                    indexToRemove = i;
                    break;
                }
                catch{
                    console.log("ERROR: problem when trying to remove product from cart list");
                }
            }
        }

        if (indexToRemove !== -1) {
            cartItems.splice(indexToRemove, 1);
            console.log("Removing product from cart...");
        } else {
            console.log('Product to remove not found in the users cart.');
        }

        console.log("Updated cart: ", cartItems);
        await kv.set(userCartKey, JSON.stringify(cartItems));

        return NextResponse.json(cartItems);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Server side error occured." });
    }
}
