import Navbar from "@/src/components/Navbar";
import AddToCart from "@/src/components/AddToCart";
import prisma from '@/src/app/prismadb';
import Link from "next/link";
import ProductDetails from "@/src/components/ProductDetails";
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
    return (
      <div>
        <Navbar />
        <ProductDetails product={product} />
      </div>
    );
  }
}
