import React from 'react';
import Link from 'next/link';
import prisma from '@/src/app/prismadb';
import AddToCart from './AddToCart';
import ProductCard from './ProductCard';

type Props = {};

const Item = async (props: Props) => {
  const products = await prisma.product.findMany();
  //console.log(products[0]?.PRODUCT_IMAGE?.split(',')[0]);
  if (products.length === 0) {
    return <div>No items</div>;
  }

  return (
    <div>
      <h1 className="py-3 text-xl">Items</h1>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-20 gap-12 ">
        {products.map((product) => (<ProductCard key={product.PRODUCT_ID} product={product} />))}
      </div>
    </div>
  );
};

export default Item;

