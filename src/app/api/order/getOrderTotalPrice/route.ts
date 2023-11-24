import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function POST(request: Request) {
    console.log("/api/order/getOrderTotalPrice")
    try {
        const requestBody = await request.json();
        const userCartKey = `${requestBody.email}:orderTotalPrice` as string;
        let orderTotalPrice: string = await kv.get(userCartKey);
        // console.log("$$$ ", orderTotalPrice);
        return NextResponse.json({orderTotalPrice: orderTotalPrice, status: "success"});
    } catch (e) {
        console.error(e);
        return NextResponse.json({ status: "error", error: "Server side error occured when getting Order Total Price for checkout." });
    }
}
