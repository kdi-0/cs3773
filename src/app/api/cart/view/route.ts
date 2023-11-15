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
            return NextResponse.json(JSON.stringify(userCart));
        } else {
            return NextResponse.json({});
        }
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "An error occurred while processing your request." });
    }
}

