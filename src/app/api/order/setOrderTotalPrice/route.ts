import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function POST(request: Request) {
    console.log("/api/order/setOrderTotalPrice")
    try {
        const requestBody = await request.json();
        console.log("Order Total Price: $", requestBody.orderTotalPrice);
        const userCartKey = `${requestBody.email}:orderTotalPrice` as string;
        const res = {
            orderTotalPrice: requestBody.orderTotalPrice
        };
        await kv.set(userCartKey, JSON.stringify(res));
        return NextResponse.json({status: "success"});
    } catch (e) {
        console.error(e);
        return NextResponse.json({ status: "error", error: "Server side error occured when setting Order Total Price for checkout." });
    }
}
