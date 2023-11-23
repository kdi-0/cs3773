import { NextResponse } from 'next/server';
import {PrismaClient} from '@prisma/client'


const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB

export async function GET() {
    const products = await prisma.product.findMany();
    return NextResponse.json({data: products});
}