import React from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import Link from 'next/link';
import prisma from '@/src/app/prismadb';

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
        {products.map((product) => (
          <div key={product.PRODUCT_ID}>
            <Link href={`/dashboard/${product.PRODUCT_ID}`}>
              <div className="relative rounded-lg">
                <img
                  src={product.PRODUCT_IMAGE.split('","')[0].slice(2, -2)}
                  className="w-[250px] h-[300px] object-cover object-top rounded-lg"
                  alt=""
                />
              </div>
              <div className="flex items-center justify-between mt-4">
                <div>
                  <h1 className="text-[18px] font-medium max-w-[150px] whitespace-nowrap overflow-hidden">
                    {product.PRODUCT_NAME}
                  </h1>
                </div>
              </div>
              <span className="font-medium bg-gray-100 rounded-lg">
                ${product.PRODUCT_PRICE}.00
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Item;
