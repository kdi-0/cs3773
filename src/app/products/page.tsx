import prisma from '@/src/app/prismadb';
import Navbar from '../../components/Navbar';
import { Product } from '@prisma/client';
import FilterProductsView from './FilteredProductsView';

function searchParamHandler(
  searchParams: { [key: string]: string | undefined },
  products: Product[]
): Product[] {
  let filteredProducts: Product[];
  if (searchParams.product_name) {
    filteredProducts = products.filter((product) =>
      product.PRODUCT_NAME.toLowerCase().includes(
        searchParams.product_name.toLowerCase()
      )
    );
  } else if (searchParams.product_description) {
    filteredProducts = products.filter((product) =>
      product.PRODUCT_DESCRIPTION.toLowerCase().includes(
        searchParams.product_description.toLowerCase()
      )
    );
  }
  return filteredProducts;
}
function filterProducts(
  searchParams: { [key: string]: string | undefined },
  products: Product[]
) {
  if (
    searchParams &&
    (searchParams.product_name || searchParams.product_description)
  ) {
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
