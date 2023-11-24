import Navbar from "@/src/components/Navbar";
import AddToCart from "@/src/components/AddToCart";
import prisma from '@/src/app/prismadb';
export default async function Page({ params }: { params: { productId } }) {
  const currentId = parseInt(params.productId);
  const product = await prisma.product.findUnique({
    where: { PRODUCT_ID: currentId, },
  });
  const imageUrl = product.PRODUCT_IMAGE.split('","')[0].slice(2, -2);
  return (
    <div>
      <Navbar />
      <div className="container mx-auto my-8 p-5">
        <div className="flex flex-wrap">
          <div className="w-full sm:w-1/2 p-2">
            <img src={imageUrl} alt={product.PRODUCT_NAME} className="w-full object-contain h-48 sm:h-72" />
          </div>
          <div className="w-full sm:w-1/2 p-2">
            <div className="bg-green-100 p-5">
              <h2 className="text-2xl font-bold mb-2">{product.PRODUCT_NAME}</h2>
              <p className="text-xl text-gray-800 mb-4">${product.PRODUCT_PRICE.toFixed(2)}</p>
              <div className="mb-4">
                <button className="text-sm bg-gray-200 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300">
                  1 +
                </button>
              </div>
              <AddToCart product={product} />
            </div>
            <div className="mt-4 p-5 bg-gray-100 border-t border-gray-200">
              <h3 className="text-lg font-semibold mb-2">Product Description</h3>
              <p className="text-gray-600">{product.PRODUCT_DESCRIPTION}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
