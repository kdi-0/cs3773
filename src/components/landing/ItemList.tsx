import Item from '../../model/Item'
import axios from 'axios'
import Link from 'next/link';
import prisma from '@/src/app/prismadb';

function ItemList() {

    const items = [
        new Item(1, 'Item 1', 10, 5, ""),
        new Item(2, 'Item 2', 15, 2.5, ""),

    ]

    const products = await prisma.product.findMany();
    //console.log(products[0]?.PRODUCT_IMAGE?.split(',')[0]);
    if (products.length === 0) {
        return <div>No items</div>;
    }

    return (
        <>
            <h1>Featured Items</h1>
            <div>
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
                                <AddToCart product={{PRODUCT_ID: product.PRODUCT_ID, PRODUCT_QUANTITY: product.PRODUCT_QUANTITY}}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ItemList;