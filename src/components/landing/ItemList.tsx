import axios from 'axios'
import Link from 'next/link';
import prisma from '@/src/app/prismadb';
import AddToCart from '@/src/components/AddToCart'

async function ItemList() {

    const products = await prisma.product.findMany();
    //console.log(products[0]?.PRODUCT_IMAGE?.split(',')[0]);
    if (products.length === 0) {
        return <div>No items</div>;
    }

    const firstProducts = products.slice(0, 4)

    const style = {
        h1: {
            fontSize: '2.0rem',
            margin: '0.5rem',
        },
    }

    return (
        <>
            <h1 style={style.h1}>Featured Items</h1>
            <div>
                <div>
                    <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-20 gap-12 ">
                        {firstProducts.map((product) => (
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