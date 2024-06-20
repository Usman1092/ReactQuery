import React from 'react'
import { keepPreviousData } from '@tanstack/react-query'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query'

// const fetchProducts=async(page = 0) =>{
//     const res= await fetch('https://dummyjson.com/products?page='+ page);
//     console.log(res);
//     const data=await res.json();
//     return data.products;
// };



const fetchProducts = async () => {
    try {
        const res = await axios.get('https://dummyjson.com/products');
        console.log(res);
        return res.data.products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};



const Products = () => {
    // const queryClient = useQueryClient() 
    const [page, setPage] = React.useState(0)
const{isLoading,error,data:products,data, isFetching, isPlaceholderData} =
useQuery ({ queryKey: ['products',page], queryFn: () => fetchProducts(page),placeholderData: keepPreviousData,  });

  
 if(isLoading){
        return <h3>Loading</h3>;
    }
    if(error){
        return <h3>Error:{error.msg}</h3>
    }
  return (

    
    // <div>Products</div>

    <div className="bg-white">
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
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
                  <a >   
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </a>
                </h3>
                <p className="mt-1 text-sm text-gray-500">{product.tags}</p>
              </div>
              <p className="text-sm font-medium text-gray-900">{product.price}</p>
            </div>
          </div>
        ))}

       <div className='flex justify-items-end   mt-50 mt-auto ml-auto mr-auto'>  
        <span className=''>Current Page: {page + 1}</span>

         <button
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 0}
      >
        Previous Page
      </button>{' '}
      <button
        onClick={() => {
          if (!isPlaceholderData && data.hasMore) {
            setPage((old) => old + 1)
          }
        }}
        // Disable the Next Page button until we know a next page is available
        disabled={isPlaceholderData || !data?.hasMore}
      >
        Next Page
      </button>
      </div>
      {isFetching ? <span> Loading...</span> : null}{' '}
      </div>
    </div>
  </div>
  )
}

export default Products