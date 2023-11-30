import prisma from '@/src/app/prismadb';
import Navbar from '../../components/Navbar';
import { Product } from '@prisma/client';
import FilterProductsView from './FilteredProductsView';

function searchParamHandler(
  searchParams: { [key: string]: string | undefined },
  products: Product[]
): Product[] {
  return products.filter(
    (product) =>
      product.PRODUCT_NAME.toLowerCase().includes(
        searchParams.product_search.toLowerCase()
      ) ||
      product.PRODUCT_DESCRIPTION.toLowerCase().includes(
        searchParams.product_search.toLowerCase()
      )
  );
}

function filterProducts(
  searchParams: { [key: string]: string | undefined },
  products: Product[]
) {
  if (searchParams && searchParams.product_search) {
    return searchParamHandler(searchParams, products);
  } else {
    return products;
  }
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | undefined };
}) {
  const products = await prisma.product.findMany();
  const filtered = filterProducts(searchParams, products);
  return (
    <div>
      <Navbar />
      <FilterProductsView filteredProducts={filtered} allProducts={products} />
    </div>
  );
}
