'use client'
import { useState, useEffect } from 'react';
import ProductCard from "@/src/components/ProductCard";
import { Product } from "@prisma/client";

interface FilterProductsViewProps {
  filteredProducts: Product[];
  allProducts: Product[];
}
function FilterProductsView({ filteredProducts, allProducts }: FilterProductsViewProps) {
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [sortCriteria, setSortCriteria] = useState<string>('');
  const [sortDirectionPrice, setSortDirectionPrice] = useState<boolean>(true); // true for ascending
  const [sortDirectionQuantity, setSortDirectionQuantity] = useState<boolean>(true);

  const sortProducts = (products: Product[]) => {
    let sortedProducts = [...products];
    if (sortCriteria === 'PRODUCT_PRICE') {
      sortedProducts.sort((a, b) => sortDirectionPrice ? a.PRODUCT_PRICE - b.PRODUCT_PRICE : b.PRODUCT_PRICE - a.PRODUCT_PRICE);
    } else if (sortCriteria === 'PRODUCT_QUANTITY') {
      sortedProducts.sort((a, b) => sortDirectionQuantity ? a.PRODUCT_QUANTITY - b.PRODUCT_QUANTITY : b.PRODUCT_QUANTITY - a.PRODUCT_QUANTITY);
    }
    return sortedProducts;
  };

  useEffect(() => {
    setDisplayedProducts(sortProducts(filteredProducts));
  }, [filteredProducts, sortCriteria, sortDirectionPrice, sortDirectionQuantity]);

  const handleSortChange = (criteria: string) => {
    if (criteria === 'PRODUCT_PRICE') {
      setSortDirectionPrice(!sortDirectionPrice);
    } else if (criteria === 'PRODUCT_QUANTITY') {
      setSortDirectionQuantity(!sortDirectionQuantity);
    }
    setSortCriteria(criteria);
  };

  const handleClearFilters = () => {
    setDisplayedProducts(sortProducts(allProducts));
  };

  return (
    <div>
      <div className="flex place-content-center p-2">
        <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-300" onClick={() => handleSortChange('PRODUCT_PRICE')}>Sort by Price</button>
        <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-300" onClick={() => handleSortChange('PRODUCT_QUANTITY')}>Sort by Quantity</button>
        <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-300" onClick={handleClearFilters}>Clear Filters</button>
      </div>
      <div className="flex flex-wrap gap-5 place-content-center">
        {displayedProducts.map((product) => (
          <ProductCard key={product.PRODUCT_ID} product={product} />
        ))}
      </div>
    </div>
  );
}

export default FilterProductsView;
