
import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { LAPTOPS, formatPrice } from '../constants';
import { Category } from '../types';
import ProductCard from '../components/ProductCard';
import { Filter, Search as SearchIcon, X, History } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ProductCardSkeleton } from '../components/LoadingSkeleton';

const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('q') || '';

  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [sortBy, setSortBy] = useState<'default' | 'priceAsc' | 'priceDesc'>('default');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { recentlyViewed, inventory, isInventoryLoading } = useCart();

  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null) {
      setSearchTerm(q);
    }
  }, [searchParams]);

  const filteredLaptops = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    return inventory.filter(l => {
      const matchesCat = activeCategory === 'All' || l.category === activeCategory;

      // Improved search logic: check name, specs, brand, and category
      const matchesSearch =
        l.name.toLowerCase().includes(searchLower) ||
        l.specs.toLowerCase().includes(searchLower) ||
        l.brand.toLowerCase().includes(searchLower) ||
        l.category.toLowerCase().includes(searchLower) ||
        l.description?.toLowerCase().includes(searchLower);

      return matchesCat && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'priceAsc') return a.price - b.price;
      if (sortBy === 'priceDesc') return b.price - a.price;
      return 0;
    });
  }, [activeCategory, searchTerm, sortBy, inventory]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Helmet>
        <title>Shop | Wonderful Autos and Tech Nigeria Catalog</title>
        <meta name="description" content="Browse our wide range of UK-used and new laptops. Filter by category: Student, Business, Gaming, and more. Best prices in Nigeria." />
      </Helmet>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-gray-900">Explore Our Catalog</h1>
          <p className="text-gray-500 mt-2">Find the best laptop that fits your budget.</p>
        </div>

        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search laptops..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-tech-blue outline-none w-full md:w-64 transition-all text-gray-900"
            />
            {searchTerm && <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><X size={16} /></button>}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="py-3 px-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-tech-blue outline-none font-medium text-gray-900 transition-all"
          >
            <option value="default">Sort by: Featured</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="bg-white p-4 lg:p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-32">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full flex items-center justify-between lg:hidden mb-0"
            >
              <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                <Filter size={20} className="text-tech-blue" /> Categories
              </h3>
              <span className={`transform transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`}>
                <Filter size={16} className="text-gray-400" />
              </span>
            </button>

            <h3 className="hidden lg:flex font-bold text-gray-900 text-lg mb-6 items-center gap-2">
              <Filter size={20} className="text-tech-blue" /> Categories
            </h3>

            <div className={`${isFilterOpen ? 'block mt-6' : 'hidden'} lg:block space-y-2`}>
              {['All', ...Object.values(Category)].map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat as any);
                    setIsFilterOpen(false); // Contract the drawdown
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition ${activeCategory === cat
                    ? 'bg-tech-blue text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className={`${isFilterOpen ? 'block' : 'hidden'} lg:block`}>
              <div className="mt-10 bg-blue-50 p-4 rounded-xl">
                <p className="text-xs font-bold text-tech-blue uppercase tracking-wider mb-2">Need help choosing?</p>
                <p className="text-xs text-gray-600 mb-4">Try our AI Laptop Finder for expert advice based on your needs.</p>
                <Link to="/finder" className="block text-center bg-tech-blue text-white py-2 rounded-lg text-xs font-bold shadow-sm">
                  Try AI Finder
                </Link>
              </div>

              {/* Recently Viewed Sidebar */}
              {recentlyViewed.length > 0 && (
                <div className="mt-10">
                  <h3 className="font-bold text-sm mb-4 flex items-center gap-2 text-gray-400 uppercase tracking-widest">
                    <History size={14} /> Recently Viewed
                  </h3>
                  <div className="space-y-4">
                    {recentlyViewed.slice(0, 3).map(l => (
                      <Link key={l.id} to={`/product/${l.id}`} className="flex gap-3 items-center group">
                        <div className="w-12 h-12 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                          <img src={l.image || undefined} className="w-full h-full object-cover group-hover:scale-110 transition" />
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-xs font-bold text-gray-900 truncate">{l.name}</p>
                          <p className="text-[10px] font-black text-tech-blue">{formatPrice(l.price)}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-grow">
          {isInventoryLoading && inventory.length <= 13 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => <ProductCardSkeleton key={i} />)}
            </div>
          ) : filteredLaptops.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredLaptops.map(laptop => (
                <ProductCard key={laptop.id} laptop={laptop} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-20 rounded-3xl text-center border-2 border-dashed border-gray-100">
              <SearchIcon size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-gray-900">No laptops found</h3>
              <p className="text-gray-500">Try adjusting your filters or search term.</p>
              <button
                onClick={() => { setActiveCategory('All'); setSearchTerm(''); }}
                className="mt-6 text-tech-blue font-bold underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
