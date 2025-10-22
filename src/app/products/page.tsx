'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FaAngleRight } from "react-icons/fa6";
import { IoFilterCircle } from "react-icons/io5";
import { FaRegStar, FaStar } from "react-icons/fa6";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

const ProductsPages = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState(1000);
  const [sortBy, setSortBy] = useState('featured');

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setProducts(data.products);
        setFilteredProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...products];

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        selectedCategories.includes(product.category)
      );
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product =>
        selectedBrands.includes(product.brand)
      );
    }

    // Price filter
    filtered = filtered.filter(product => product.price <= priceRange);

    // Sort products
    switch (sortBy) {
      case 'price-low-high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        // featured - no sorting or default sorting
        break;
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategories, selectedBrands, priceRange, sortBy]);

  // Handle category selection
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Handle brand selection
  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange(1000);
    setSortBy('featured');
  };

  // Get unique categories and brands
  const categories = Array.from(new Set(products.map(product => product.category)));
  const brands = Array.from(new Set(products.map(product => product.brand)));

  // Render stars for rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="p-4 py-14 flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading products...</div>
      </div>
    );
  }

  return (
    <div className='p-4 py-14'>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 mt-12">
        <Link href="/" className="text-gray-600 hover:text-gray-900  ">Go to Home</Link>
        <FaAngleRight className="text-gray-400" />
        <p className="text-gray-900 font-medium">Products</p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Filter Sidebar */}
        <div className="lg:w-1/4">
          <div className='card border border-gray-300 rounded-lg p-4 bg-white sticky top-4'>
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-lg font-semibold">Filters</h1>
              <IoFilterCircle className="text-xl" />
            </div>

            {/* Categories Filter */}
            <div className="mb-6">
              <h2 className="font-semibold mb-3">Categories</h2>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {categories.map(category => (
                  <div key={category} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`cat-${category}`}
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryToggle(category)}
                      className="rounded border-gray-300"
                    />
                    <label 
                      htmlFor={`cat-${category}`}
                      className="text-sm cursor-pointer capitalize flex-1"
                    >
                      {category} 
                      <span className="text-gray-500 ml-1">
                        ({products.filter(p => p.category === category).length})
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <hr className="my-4" />

            {/* Brands Filter */}
            <div className="mb-6">
              <h2 className="font-semibold mb-3">Brands</h2>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {brands.map(brand => (
                  <div key={brand} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`brand-${brand}`}
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandToggle(brand)}
                      className="rounded border-gray-300"
                    />
                    <label 
                      htmlFor={`brand-${brand}`}
                      className="text-sm cursor-pointer flex-1"
                    >
                      {brand}
                      <span className="text-gray-500 ml-1">
                        ({products.filter(p => p.brand === brand).length})
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <hr className="my-4" />

            {/* Price Filter */}
            <div className="mb-6">
              <h2 className="font-semibold mb-3">Price - Up to ${priceRange}</h2>
              <input 
                type="range" 
                min="0" 
                max="2000" 
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className='w-full mb-2'
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>$0</span>
                <span>$2000</span>
              </div>
            </div>

            <hr className="my-4" />
            
            <button 
              onClick={resetFilters}
              className='w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors'
            >
              Reset All Filters
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:w-3/4">
          {/* Header */}
          <div className='p-3 flex flex-col sm:flex-row items-center justify-between gap-4 mb-6'>
            <h1 className="text-2xl font-bold">
              All Products
              <span className="text-gray-600 text-lg font-normal ml-2">
                ({filteredProducts.length} products)
              </span>
            </h1>
            
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <p className="text-gray-600">Sort by</p>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className='border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black'
                >
                  <option value="featured">Featured</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="rating">Highest Rating</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedCategories.length > 0 || selectedBrands.length > 0 || priceRange < 1000) && (
            <div className="mb-6 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-semibold">Active filters:</span>
                {selectedCategories.map(category => (
                  <span 
                    key={category} 
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm flex items-center gap-1"
                  >
                    {category}
                    <button 
                      onClick={() => handleCategoryToggle(category)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {selectedBrands.map(brand => (
                  <span 
                    key={brand} 
                    className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm flex items-center gap-1"
                  >
                    {brand}
                    <button 
                      onClick={() => handleBrandToggle(brand)}
                      className="text-green-600 hover:text-green-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {priceRange < 1000 && (
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm flex items-center gap-1">
                    Under ${priceRange}
                    <button 
                      onClick={() => setPriceRange(1000)}
                      className="text-purple-600 hover:text-purple-800"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your filters.</p>
              <button 
                onClick={resetFilters}
                className="mt-4 bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Link href={`/arrivals/${product.id}`} 
                  key={product.id} 
                  className="group relative block overflow-hidden bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
                >
                   

                  {/* Discount Badge */}
                  {product.discountPercentage > 0 && (
                    <div className="absolute start-4 top-4 z-10 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      {product.discountPercentage}% OFF
                    </div>
                  )}

                  {/* Product Image */}
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="p-4">
                    {/* Brand */}
                    <p className="text-sm text-gray-500 mb-1 line-clamp-1">  <span className="text-lg font-medium text-gray-900 mb-2   " >{product.brand}</span></p>
                    
                    {/* Product Title */}
                    <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2 h-9">
                      {product.title}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        {renderStars(product.rating)}
                      </div>
                      <span className="text-sm text-gray-600">
                        {product.rating} ({product.stock} in stock)
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2  ">
                      <span className="text-xl font-semibold text-gray-900">
                        ${product.price}
                      </span>
                      {product.discountPercentage > 0 && (
                        <>
                          <span className="text-gray-400 line-through text-sm">
                            ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                          </span>
                          <span className="text-green-600 text-sm font-semibold">
                            Save {product.discountPercentage}%
                          </span>
                        </>
                      )}
                    </div>

                    
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPages;