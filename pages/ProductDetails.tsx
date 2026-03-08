
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { LAPTOPS, formatPrice, WHATSAPP_NUMBER } from '../constants';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import {
  ArrowLeft,
  ShoppingCart,
  ShieldCheck,
  Truck,
  CheckCircle,
  Info,
  MessageCircle,
  Clock,
  Zap,
  Star,
  ChevronLeft,
  ChevronRight,
  Play,
  Video,
  Users,
  Eye
} from 'lucide-react';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, addToRecentlyViewed, inventory, isInventoryLoading } = useCart();

  const laptop = useMemo(() => {
    // Try finding in inventory first
    const found = inventory.find(l => l.id === id);
    if (found) return found;
    // Fallback to constants if not in inventory (e.g. during loading or if DB missing items)
    return LAPTOPS.find(l => l.id === id);
  }, [inventory, id]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewers, setViewers] = useState(Math.floor(Math.random() * 15) + 5);

  const relatedProducts = useMemo(() => {
    if (!laptop) return [];
    return inventory
      .filter(l => l.category === laptop.category && l.id !== laptop.id)
      .slice(0, 4);
  }, [laptop, inventory]);

  useEffect(() => {
    if (laptop) {
      setCurrentIndex(0);
      window.scrollTo(0, 0);
      addToRecentlyViewed(laptop);
    }
  }, [id, addToRecentlyViewed, laptop]); // Use id to ensure it only scrolls on navigation

  if (isInventoryLoading && !laptop) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-tech-blue border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 font-bold animate-pulse">Loading Product Details...</p>
      </div>
    );
  }

  if (!laptop) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <button onClick={() => navigate('/shop')} className="text-tech-blue font-bold flex items-center gap-2 mx-auto">
          <ArrowLeft size={18} /> Back to Shop
        </button>
      </div>
    );
  }

  const allImages = [laptop.image, ...(laptop.moreImages || [])];
  const discount = Math.round((1 - laptop.price / laptop.originalPrice) * 100);

  const slide = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentIndex((prev) => (prev + 1) % allImages.length);
    } else {
      setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    }
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <Helmet>
        <title>{laptop.name} | Wonderful Computers Nigeria</title>
        <meta name="description" content={`${laptop.name} - ${laptop.specs}. ${laptop.description?.substring(0, 150)}...`} />
        <meta property="og:title" content={`${laptop.name} - Wonderful Computers`} />
        <meta property="og:image" content={laptop.image} />
      </Helmet>
      {/* Breadcrumb & Back */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-tech-blue font-bold transition group mb-8"
        >
          <div className="bg-gray-100 p-2 rounded-full group-hover:bg-blue-50 transition">
            <ArrowLeft size={20} />
          </div>
          Go Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Gallery Slider */}
          <div className="space-y-4">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm relative group">
              <img
                src={allImages[currentIndex] || undefined}
                alt={laptop.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500"
              />

              {/* Slider Controls - Always visible on desktop for clarity */}
              <button
                onClick={() => slide('prev')}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg hover:bg-white transition flex items-center justify-center text-tech-blue z-20 active:scale-90"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => slide('next')}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg hover:bg-white transition flex items-center justify-center text-tech-blue z-20 active:scale-90"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>

              <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
                <span className="bg-tech-blue text-white text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-tighter shadow-lg">
                  {laptop.condition}
                </span>
                {laptop.isBestForSchool && (
                  <span className="bg-orange-500 text-white text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-tighter shadow-lg">
                    Recommended for Students
                  </span>
                )}
              </div>

              {/* Pagination Dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {allImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${currentIndex === i ? 'w-8 bg-tech-blue' : 'w-2 bg-white/70 hover:bg-white'}`}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Selectors */}
            <div className="grid grid-cols-4 gap-4">
              {allImages.slice(0, 4).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${currentIndex === i ? 'border-tech-blue scale-95 shadow-md' : 'border-transparent hover:border-gray-200'}`}
                >
                  <img
                    src={img || undefined}
                    alt={`${laptop.name} ${i}`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Video Showcase */}
            <div className="mt-8 pt-8 border-t border-gray-100">
              <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                <Video size={24} className="text-red-600" /> Watch in Action
              </h3>
              {laptop.youtubeUrl ? (
                <div className="aspect-video rounded-3xl overflow-hidden border-4 border-gray-100 shadow-xl">
                  <iframe
                    src={laptop.youtubeUrl}
                    title={`${laptop.name} Video Review`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="aspect-video bg-gray-900 rounded-3xl overflow-hidden relative group cursor-pointer border-4 border-gray-100 shadow-xl">
                  <img
                    src={laptop.image || undefined}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
                    alt="Video thumbnail"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white p-6 text-center">
                    <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                      <Play size={32} fill="currentColor" />
                    </div>
                    <div>
                      <p className="font-black text-xl uppercase tracking-tighter mb-1">Video Review Coming Soon</p>
                      <p className="text-sm text-gray-400 font-bold italic">Our engineers are currently filming a detailed performance test for this unit.</p>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-lg border border-white/10">
                    <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white">Ikeja Store Exclusive</span>
                  </div>
                </div>
              )}
            </div>

            {/* Nigerian Trust Badges below image */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-green-50 p-4 rounded-2xl flex items-center gap-3 border border-green-100/50">
                <ShieldCheck className="text-green-600" size={24} />
                <div>
                  <p className="font-bold text-xs text-gray-900">Tested & Clean</p>
                  <p className="text-[10px] text-gray-500 uppercase font-bold">10-Point Check Done</p>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-2xl flex items-center gap-3 border border-blue-100/50">
                <Truck className="text-tech-blue" size={24} />
                <div>
                  <p className="font-bold text-xs text-gray-900">Swift Delivery</p>
                  <p className="text-[10px] text-gray-500 uppercase font-bold">All 36 States covered</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Info */}
          <div className="flex flex-col">
            <div className="mb-8">
              <div className="flex items-center gap-2 text-tech-blue mb-4">
                <Star size={16} fill="currentColor" />
                <span className="text-xs font-black uppercase tracking-widest">Premium Collection</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-2 leading-tight tracking-tighter">
                {laptop.name}
              </h1>
              <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                <p>{laptop.brand} Professional Series</p>
                <div className="flex items-center gap-1 text-orange-500 bg-orange-50 px-2 py-1 rounded-lg">
                  <Users size={12} />
                  <span>{viewers} people are viewing this right now</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-[2rem] mb-8 border border-gray-100">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-4xl font-black text-tech-blue">{formatPrice(laptop.price)}</span>
                <span className="text-xl text-gray-400 line-through font-bold">{formatPrice(laptop.originalPrice)}</span>
              </div>
              <div className="flex items-center gap-2 mb-6">
                <span className="bg-red-600 text-white text-xs font-black px-2 py-1 rounded">-{discount}% OFF</span>
                <span className="text-red-600 text-xs font-black animate-pulse uppercase tracking-tighter">Limited Stock Left!</span>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => addToCart(laptop)}
                  className="w-full bg-tech-blue text-white py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 shadow-xl hover:bg-blue-900 transition active:scale-[0.98]"
                >
                  <ShoppingCart size={24} />
                  Add to My Cart
                </button>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                  <Info size={20} className="text-tech-blue" /> Why you'll love this laptop
                </h3>
                <p className="text-gray-600 leading-relaxed font-medium">
                  {laptop.description}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                  <Zap size={20} className="text-yellow-500" /> Full Technical Specs
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {laptop.detailedSpecs?.map((spec, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm font-bold text-gray-700">
                      <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 bg-red-50 rounded-2xl border border-red-100">
                <div className="flex items-center gap-3 text-red-700 font-black uppercase text-xs mb-2">
                  <Clock size={16} /> Urgent Notice
                </div>
                <p className="text-red-600 text-xs font-bold italic">
                  * Only 2 units left in our Ikeja store. We deliver laptops safely anywhere in Nigeria. Secure yours now before it's gone!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-20 border-t border-gray-50">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase italic">You May Also Like</h2>
              <div className="h-1.5 w-16 bg-tech-blue rounded-full mt-2"></div>
            </div>
            <Link to="/shop" className="text-tech-blue font-black text-sm uppercase tracking-widest hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} laptop={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
