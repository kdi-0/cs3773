'use client'

import ProductCard from "@/src/components/ProductCard";
import { Product } from "@prisma/client";


interface FilterProductsViewProps {
  filteredProducts: Product[]
  allProducts: Product[]
}

function FilterProductsView({ filteredProducts, allProducts }: FilterProductsViewProps) {
  return (
    <div>
      <div className="flex place-content-center">options to sort by product.PRODUCT_PRICE or product.PRODUCT_QUANTITY</div>
      <div className="flex flex-wrap gap-5 place-content-center">
        {filteredProducts.map((product) => (
          <ProductCard key={product.PRODUCT_ID} product={product} />
        ))}
      </div>
    </div>
  );
}

export default FilterProductsView;
