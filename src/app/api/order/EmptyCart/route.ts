import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

//empty the user's cart when creating an order
export async function POST(request: Request) {
    console.log("/api/order/EmptyCart")
    try {
        const requestBody = await request.json();
        const userCartKey = `${requestBody.userEmail}:cart` as string;
        await kv.set(userCartKey, null); // set cart to null

        return NextResponse.json({});
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Server side error occured when emptying user cart." });
    }
}
