import Navbar from "@/src/components/Navbar";
import AddToCart from "@/src/components/AddToCart";
import prisma from '@/src/app/prismadb';
import Link from "next/link";
export default async function Page({ params }: { params: { productId: string } }) {
  const currentId = parseInt(params.productId);
  const product = await prisma.product.findUnique({
    where: { PRODUCT_ID: currentId, },
  });
  if (product === null) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto my-8 p-5">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">Product Not Found</h2>
            <p>The product you're looking for does not exist or may have been removed.</p>
            <Link href="/products" className="text-blue-500 hover:underline">
              Go back to products
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    const imageUrl = product.PRODUCT_IMAGE.split('","')[0].slice(2, -2);
    return (
      <div>
        <Navbar />
        <div className="container mx-auto my-8 p-5">
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 lg:w-2/5 p-2">
              <img src={imageUrl} alt={product.PRODUCT_NAME} className="w-full object-contain h-48 sm:h-72" />
            </div>
            <div className="w-full md:w-1/2 lg:w-3/5 flex flex-col p-2">
              <div className="bg-green-100 p-5 mb-4">
                <h2 className="text-2xl font-bold mb-2">{product.PRODUCT_NAME}</h2>
                <p className="text-xl text-gray-800 mb-4">${product.PRODUCT_PRICE.toFixed(2)}</p>
                <p className="text-sm text-gray-800 mb-4">Quantity Left: {product.PRODUCT_QUANTITY}</p>
                <AddToCart product={product} />
              </div>
              <div className="mt-4 p-5 bg-gray-100 border-t border-gray-200 flex-grow">
                <h3 className="text-lg font-semibold mb-2">Product Description</h3>
                <p className="text-gray-600">{product.PRODUCT_DESCRIPTION}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
