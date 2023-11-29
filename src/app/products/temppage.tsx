'use client'
import { useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { PrismaClient } from '@prisma/client';

import Navbar from '@/src/components/Navbar';
export default function ProductsPage() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const [sort, setSort] = useState('asc');
    const [category, setCategory] = useState('');
    const [pageSize, setPageSize] = useState(10);

    const prisma = new PrismaClient();

    const search = async () => {
        try {
            setLoading(true);

            const params = {
                take: pageSize,
                orderBy: {
                    price: sort === 'asc' ? 'asc' : 'desc'
                }
            };

            if (searchTerm) {
                params.where = {
                    OR: [
                        { name: { contains: searchTerm } },
                        { description: { contains: searchTerm } },
                    ],
                };
            }

            if (category) {
                params.where.category = category;
            }

            const products = await prisma.product.findMany(params);
            setProducts(products);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Navbar />

            {/* Filters */}

            <button disabled={loading} onClick={search}>
                Search
            </button>

            {loading && <p>Loading...</p>}

        </div>
    );

}
