'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { products, categories, getProductsByCategory } from '@/data/products';

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'all');

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const filteredProducts = selectedCategory === 'all'
    ? products
    : getProductsByCategory(selectedCategory);

  const categoryTitle = selectedCategory === 'all'
    ? 'All Products'
    : categories.find(c => c.id === selectedCategory)?.name || 'Products';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4 md:mb-0">
          {categoryTitle}
        </h1>
        <span className="text-dark-500">{filteredProducts.length} products</span>
      </div>

      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-4 mb-8">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`flex-shrink-0 px-5 py-2 rounded-full font-medium transition-colors ${
            selectedCategory === 'all'
              ? 'bg-dark-900 text-white'
              : 'bg-dark-100 text-dark-600 hover:bg-dark-200'
          }`}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`flex-shrink-0 px-5 py-2 rounded-full font-medium transition-colors ${
              selectedCategory === cat.id
                ? 'bg-dark-900 text-white'
                : 'bg-dark-100 text-dark-600 hover:bg-dark-200'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-dark-500 text-lg">No products found in this category.</p>
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-10 bg-dark-100 rounded w-48 mb-8" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-dark-100 rounded-2xl aspect-square" />
            ))}
          </div>
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
