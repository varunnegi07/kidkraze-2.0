'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Product } from '@/types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  title: string;
  products: Product[];
  viewAllHref?: string;
}

export default function ProductGrid({ title, products, viewAllHref }: ProductGridProps) {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="section-title">{title}</h2>
          {viewAllHref && (
            <Link href={viewAllHref} className="flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
