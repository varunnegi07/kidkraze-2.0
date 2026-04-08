'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { products, categories, clothingSubCategories, getProductsByCategory, getProductsBySubCategory } from '@/data/products';

type PriceRange = 'all' | 'under100' | '100-500' | '500-1000' | 'above1000';
type GenderFilter = 'all' | 'boys' | 'girls' | 'unisex';
type AvailabilityFilter = 'all' | 'inStock' | 'outOfStock';

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const subCategoryParam = searchParams.get('subCategory');
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'all');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>(subCategoryParam || '');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<PriceRange>('all');
  const [genderFilter, setGenderFilter] = useState<GenderFilter>('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<AvailabilityFilter>('all');

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
      if (categoryParam !== 'clothing') {
        setSelectedSubCategory('');
      }
    }
    if (subCategoryParam) {
      setSelectedSubCategory(subCategoryParam);
    }
  }, [categoryParam, subCategoryParam]);

  const filteredProducts = selectedCategory === 'all'
    ? products
    : selectedSubCategory
      ? getProductsBySubCategory(selectedSubCategory)
      : getProductsByCategory(selectedCategory);

  const applyFilters = (productList: typeof products) => {
    return productList.filter(product => {
      if (priceRange !== 'all') {
        if (priceRange === 'under100' && product.price >= 100) return false;
        if (priceRange === '100-500' && (product.price < 100 || product.price > 500)) return false;
        if (priceRange === '500-1000' && (product.price < 500 || product.price > 1000)) return false;
        if (priceRange === 'above1000' && product.price <= 1000) return false;
      }
      if (genderFilter !== 'all' && product.gender !== genderFilter && product.gender !== 'unisex') return false;
      if (availabilityFilter === 'inStock' && product.inStock === false) return false;
      if (availabilityFilter === 'outOfStock' && product.inStock !== false) return false;
      return true;
    });
  };

  const displayProducts = applyFilters(filteredProducts);

  const categoryTitle = selectedCategory === 'all'
    ? 'All Products'
    : selectedSubCategory
      ? clothingSubCategories.find(s => s.id === selectedSubCategory)?.name || 'Products'
      : categories.find(c => c.id === selectedCategory)?.name || 'Products';

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    setSelectedSubCategory('');
  };

  const handleSubCategoryClick = (subCatId: string) => {
    setSelectedSubCategory(subCatId);
  };

  const clearFilters = () => {
    setPriceRange('all');
    setGenderFilter('all');
    setAvailabilityFilter('all');
  };

  const hasActiveFilters = priceRange !== 'all' || genderFilter !== 'all' || availabilityFilter !== 'all';

  const priceLabels: Record<PriceRange, string> = {
    all: 'All Prices',
    under100: 'Under ₹100',
    '100-500': '₹100 - ₹500',
    '500-1000': '₹500 - ₹1000',
    above1000: 'Above ₹1000',
  };

  const genderLabels: Record<GenderFilter, string> = {
    all: 'All',
    boys: 'Boys',
    girls: 'Girls',
    unisex: 'Unisex',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4 md:mb-0">
          {categoryTitle}
        </h1>
        <div className="flex items-center gap-3">
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Clear filters
            </button>
          )}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-dark-100 hover:bg-dark-200 rounded-full font-medium text-dark-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
            {hasActiveFilters && (
              <span className="bg-primary-600 text-white text-xs px-2 py-0.5 rounded-full">
                {(priceRange !== 'all' ? 1 : 0) + (genderFilter !== 'all' ? 1 : 0) + (availabilityFilter !== 'all' ? 1 : 0)}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-4 mb-4">
        <button
          onClick={() => handleCategoryClick('all')}
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
            onClick={() => handleCategoryClick(cat.id)}
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

      {selectedCategory === 'clothing' && (
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-4 mb-4">
          <button
            onClick={() => setSelectedSubCategory('')}
            className={`flex-shrink-0 px-4 py-2 rounded-full font-medium transition-colors text-sm ${
              selectedSubCategory === ''
                ? 'bg-primary-600 text-white'
                : 'bg-primary-50 text-primary-700 hover:bg-primary-100'
            }`}
          >
            All Clothing
          </button>
          {clothingSubCategories.map(sub => (
            <button
              key={sub.id}
              onClick={() => handleSubCategoryClick(sub.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full font-medium transition-colors text-sm ${
                selectedSubCategory === sub.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-primary-50 text-primary-700 hover:bg-primary-100'
              }`}
            >
              {sub.name}
            </button>
          ))}
        </div>
      )}

      {showFilters && (
        <div className="bg-dark-50 rounded-2xl p-6 mb-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-dark-900 mb-3">Price</h3>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(priceLabels) as PriceRange[]).map((range) => (
                  <button
                    key={range}
                    onClick={() => setPriceRange(range)}
                    className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                      priceRange === range
                        ? 'bg-dark-900 text-white'
                        : 'bg-white text-dark-600 hover:bg-dark-100 border border-dark-200'
                    }`}
                  >
                    {priceLabels[range]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-dark-900 mb-3">Category</h3>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(genderLabels) as GenderFilter[]).map((gender) => (
                  <button
                    key={gender}
                    onClick={() => setGenderFilter(gender)}
                    className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                      genderFilter === gender
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-dark-600 hover:bg-dark-100 border border-dark-200'
                    }`}
                  >
                    {genderLabels[gender]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-dark-900 mb-3">Availability</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setAvailabilityFilter('all')}
                  className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                    availabilityFilter === 'all'
                      ? 'bg-dark-900 text-white'
                      : 'bg-white text-dark-600 hover:bg-dark-100 border border-dark-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setAvailabilityFilter('inStock')}
                  className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                    availabilityFilter === 'inStock'
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-dark-600 hover:bg-dark-100 border border-dark-200'
                  }`}
                >
                  Available
                </button>
                <button
                  onClick={() => setAvailabilityFilter('outOfStock')}
                  className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                    availabilityFilter === 'outOfStock'
                      ? 'bg-red-600 text-white'
                      : 'bg-white text-dark-600 hover:bg-dark-100 border border-dark-200'
                  }`}
                >
                  Not Available
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {hasActiveFilters && (
        <div className="flex items-center gap-2 mb-4 text-sm text-dark-500">
          <span>Filtered by:</span>
          {priceRange !== 'all' && (
            <span className="bg-dark-100 px-2 py-1 rounded text-dark-700">{priceLabels[priceRange]}</span>
          )}
          {genderFilter !== 'all' && (
            <span className="bg-dark-100 px-2 py-1 rounded text-dark-700 capitalize">{genderFilter}</span>
          )}
          {availabilityFilter !== 'all' && (
            <span className="bg-dark-100 px-2 py-1 rounded text-dark-700">
              {availabilityFilter === 'inStock' ? 'In Stock' : 'Out of Stock'}
            </span>
          )}
        </div>
      )}

      <span className="text-dark-500 mb-6 block">{displayProducts.length} products</span>

      {displayProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-dark-500 text-lg">No products found matching your filters.</p>
          <button
            onClick={clearFilters}
            className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
          >
            Clear filters
          </button>
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
