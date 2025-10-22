import AllArivalesComponents from '@/components/arrivalscomponent/AllArivalesComponents'
import React from 'react'

interface Article {
    id: number
    title: string
    description: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    brand: string
    category: string
    thumbnail: string
    images: string[]
}

interface typeParams {
    params: { id: string }
}

const ArrivalsPageSingle = async ({ params }: typeParams) => {
    const res = await fetch(`https://dummyjson.com/products/${params.id}`, {
        cache: 'no-store'
    })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    const data: Article = await res.json()


    return (
        <div  >
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-18">
                <div className="flex flex-col lg:flex-row gap-12 mt-10 lg:items-stretch">

                <div className="w-full lg:w-1/2">
                    <div className="h-full bg-gray-100 rounded-lg overflow-hidden">
                        <img style={{ objectFit: 'cover' }}
                            src={data.thumbnail}
                            alt={data.title}
                            className=" bg-[#f2f0f1] w-full h-full object-cover rounded-lg  object-cover transition duration-500 group-hover:scale-105"
                        />
                    </div>
                </div>

                <div className="w-full lg:w-1/2 space-y-6">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full capitalize">
                            {data.category}
                        </span>
                        <span className="font-medium">{data.brand}</span>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900">{data.title}</h1>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-yellow-100 px-3 py-1 rounded-full">
                            <span className="text-yellow-600 font-semibold">⭐ {data.rating}</span>
                            <span className="text-gray-600">|</span>
                        </div>
                        <span className="text-sm font-medium  ">  {data.stock} : stock available
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-4xl font-bold text-gray-900">${data.price}</span>

                    </div>

                    <div className="prose max-w-none">
                        <p className="text-gray-700 leading-relaxed">{data.description}</p>
                    </div>

                    <form className="flex gap-4 pt-6">
                        <button
                            type="button"
                            disabled={data.stock === 0}
                            className="flex-1 bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {data.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                        </button>

                        <button
                            type="button"
                            disabled={data.stock === 0}
                            className="flex-1 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
                        >
                            Back To Arrivals
                        </button>
                    </form>

                    <div className="border-t border-gray-200 pt-6">
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                            <div>
                                <span className="font-semibold">SKU:</span> PRD-{data.id}
                            </div>
                            <div>
                                <span className="font-semibold">Category:</span>
                                <span className="capitalize ml-1">{data.category}</span>
                            </div>
                            <div>
                                <span className="font-semibold">Brand:</span> {data.brand}
                            </div>
                            <div>
                                <span className="font-semibold">Shipping:</span> Free shipping
                            </div>
                        </div>
                    </div>
                </div>
            </div>

             </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
                <h2 className="text-2xl font-bold text-gray-900 px-10">You may galso like</h2>

                    <AllArivalesComponents />
            </div>
        </div>
    )
}

export default ArrivalsPageSingle