import prisma from '@/src/app/prismadb';
import Navbar from '../../components/Navbar'
import ProductCard from '@/src/components/ProductCard';
import { Product } from '@prisma/client';

function searchParamHandler(searchParams: { [key: string]: string | undefined }, products: Product[]): JSX.Element[] {
    let filteredProducts: Product[];
    if (searchParams.product_name) {
        filteredProducts = products.filter((product) =>
            product.PRODUCT_NAME.toLowerCase().includes(searchParams.product_name.toLowerCase())
        );
    } else if (searchParams.product_description) {
        filteredProducts = products.filter((product) =>
            product.PRODUCT_DESCRIPTION.toLowerCase().includes(searchParams.product_description.toLowerCase())
        );
    }
    return filteredProducts.map((product) => (
        <ProductCard key={product.PRODUCT_ID} product={product} />
    ));
}
function getContent(searchParams: { [key: string]: string | undefined }, products: Product[]) {
    if (searchParams && (searchParams.product_name || searchParams.product_description)) {
        return searchParamHandler(searchParams, products);
    } else {
        return products.map((product) => (
            <ProductCard key={product.PRODUCT_ID} product={product} />
        ));
    }
}

export default async function Page({
    params,
    searchParams,
}: {
    params: { slug: string }
    searchParams: { [key: string]: string | undefined }
}) {
    const products = await prisma.product.findMany();
    let pageContent = getContent(searchParams, products);
    return (
        <div>
            <Navbar />
            <div className='grid grid-cols-2 gap-2 place-content-center'>
                {pageContent}
            </div>
        </div>
    );
};