'use client'
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import prisma from '@/src/app/prismadb';
import Navbar from '../../components/Navbar'


export default function Page(){
    try{
        const searchParams = useSearchParams();
        const product_name = searchParams.get('product_name');
        

        if(product_name === '')
            console.log('no specific product is being searched')
        else{
            if (product_name.length > 50)
                console.error('ERROR: product name is longer than 50 characters')
            else
                console.log(`Product being searched: ${product_name}`)
        }
        //prisma query based on product_name, if product name is empty '', just query all of the products


    }
    catch{
        console.log("ERROR, could not get product_id from URL")
    }

    

    return(
        <div>
            <Navbar />
            <p>fetch the products</p>
        </div>
    )
}