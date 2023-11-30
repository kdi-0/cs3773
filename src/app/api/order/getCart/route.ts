import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

interface UserSession {
  name: string;
  email: string;
}
// returns the user cart without the images per product.
// Do not want to store images for products in an ORDER as this could take up mem space
export async function POST(request: Request) {
  console.log('/api/order/getCart');
  try {
    const userDetails: UserSession = await request.json();

    const userCart: any = await kv.get(`${userDetails.email}:cart`);

    if (userCart) {
      userCart.forEach((product) => {
        delete product.PRODUCT_IMAGE;
      });

      return NextResponse.json(JSON.stringify(userCart));
    } else {
      return NextResponse.json({});
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({
      error: 'An error occurred while processing your request.',
    });
  }
}
