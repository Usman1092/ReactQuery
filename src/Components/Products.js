
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchProducts = async (page = 0) => {
    try {
        const res = await axios.get(`https://dummyjson.com/products?limit=10&skip=${page * 10}`);
        console.log(res.data.products);
       
        return res.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

const Products = () => {
    const [page, setPage] = React.useState(0);

    const {
        isLoading,
        error,
        data,
        isFetching,
        isPlaceholderData,
    } = useQuery({
        queryKey: ['products', page],
        queryFn: () => fetchProducts(page),
        keepPreviousData: true,
    });

    if (isLoading) {
        return <h3>Loading...</h3>;
    }

    if (error) {
        return <h3>Error: {error.message}</h3>;
    }

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {data.products.map((product) => (
                        <div key={product.id} className="group relative">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <a>
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {product.title}
                                        </a>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">{product.tags.join(', ')}</p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">{product.price}</p>
                            </div>
                        </div>
                    ))}

                   

           
                    {isFetching ? <span> Loading...</span> : null}{' '}
                </div>
                <div className="flex items-center justify-between mt-20 border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                        <span className="bg-[#429def] pt-2 pb-2 pl-2 pr-2 rounded text-white">Current Page: {page + 1}</span>

                        <button className="bg-[#429def] pt-2 pb-2 pl-2 pr-2 rounded text-white"
                            onClick={() => setPage((old) => Math.max(old - 1, 0))}
                            disabled={page === 0}
                        >
                            Previous Page
                        </button>{' '}
                        <button className="bg-[#429def] pt-2 pb-2 pl-2 pr-2 rounded text-white "
                            onClick={() => {
                                if (!isPlaceholderData && data.total > (page + 1) * 10) {
                                    setPage((old) => old + 1);
                                }
                            }}
                            // Disable the Next Page button until we know a next page is available
                            disabled={isPlaceholderData || data.total <= (page + 1) * 10}
                        >
                            Next Page
                     </button>
                    </div>       
            
            </div>
        </div>
    );
};

export default Products;
