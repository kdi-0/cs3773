import { NextResponse } from 'next/server';
import prisma from '@/src/app/prismadb';

//sees if discount code user inputted in cart page exists, and if so, returns needed values
export async function POST(request: Request) {
  console.log('/api/cart/discount');
  try {
    const requestBody = await request.json();
    console.log('discount code in route:', requestBody.discountCode);

    let discountResponse = {
      discountCode: requestBody.discountCode,
      discountExists: false,
      discountValue: 0,
    };
    try {
      //IMPORTANT: prisma where clauses can only take an attribute that is marked as an id (primary key/unique identifier)
      // but each table can only have one unique identifier (only one attribute can be marked with @id)
      // to apply changes made to prisma schema: npx prisma migrate dev

      //fetch all discounts, then filter discount here
      const discounts = await prisma.discount.findMany();
      console.log('Discounts: ', discounts);
      discounts.forEach((discount) => {
        if (discount.DISCOUNT_CODE === requestBody.discountCode) {
          discountResponse.discountExists = true;
          discountResponse.discountValue = discount.DISCOUNT_VALUE;
          return;
        }
      });
      if (discounts != null && discountResponse.discountExists === true) {
        console.log('Discount exists');
      } else {
        console.log("Discount doesn't exist");
      }
    } catch {
      console.log('ERROR when making prisma query for discount');
      // return NextResponse.json(discountResponse);
    }
    return NextResponse.json(discountResponse);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Server side error occured.' });
  }
}
