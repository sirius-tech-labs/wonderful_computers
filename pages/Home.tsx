
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, ChevronRight, ChevronLeft, CheckCircle2, Star, ShieldCheck, MapPin, Zap, Verified, Truck, MessageCircle } from 'lucide-react';
import { LAPTOPS, TESTIMONIALS, formatPrice } from '../constants';
import { Category } from '../types';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

const CategoryCarousel: React.FC<{ title: string; category: Category }> = ({ title, category }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { inventory } = useCart();

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      // Scroll by approximately 80% of the container width for a smooth, logical skip
      const scrollAmount = clientWidth * 0.8;
      const scrollTo = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;

      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };

  const filteredLaptops = inventory.filter(l => l.category === category);

  if (filteredLaptops.length === 0) return null;

  return (
    <section className="relative group/carousel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div className="flex-grow">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h2 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tighter uppercase italic">
                {title}
              </h2>
              <span className="text-[9px] md:text-[10px] bg-red-100 text-red-600 px-2 py-0.5 md:px-3 md:py-1 rounded-full font-black uppercase tracking-tighter whitespace-nowrap">
                Fast Moving
              </span>
            </div>
            <div className="h-1.5 md:h-2 w-16 md:w-20 bg-tech-blue rounded-full"></div>
          </div>
          <Link to="/shop" className="text-tech-blue font-black text-xs md:text-sm flex items-center gap-1 hover:underline group uppercase tracking-widest whitespace-nowrap pb-1">
            Browse All <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <div className="relative px-4 sm:px-6 lg:px-8">
        {/* Navigation Buttons - Visible on all screens for better UX */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 z-20 bg-white p-3 md:p-4 rounded-full shadow-2xl text-tech-blue hover:bg-tech-blue hover:text-white transition-all flex items-center justify-center border border-gray-100 active:scale-90"
          aria-label="Previous items"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 z-20 bg-white p-3 md:p-4 rounded-full shadow-2xl text-tech-blue hover:bg-tech-blue hover:text-white transition-all flex items-center justify-center border border-gray-100 active:scale-90"
          aria-label="Next items"
        >
          <ChevronRight size={24} />
        </button>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 md:gap-8 pb-12 hide-scrollbar snap-x snap-mandatory scroll-smooth"
        >
          {filteredLaptops.map(laptop => (
            <div key={laptop.id} className="flex-shrink-0 w-[280px] sm:w-[350px] snap-start">
              <ProductCard laptop={laptop} />
            </div>
          ))}
          <Link
            to="/shop"
            className="flex-shrink-0 w-60 md:w-64 bg-gray-50 rounded-[2rem] border-4 border-dashed border-gray-200 flex flex-col items-center justify-center gap-4 hover:bg-gray-100 transition group snap-start"
          >
            <div className="bg-white p-5 md:p-6 rounded-full shadow-lg text-tech-blue group-hover:scale-110 transition-transform">
              <ChevronRight size={32} className="md:w-10 md:h-10" />
            </div>
            <span className="font-black text-gray-400 uppercase tracking-widest text-xs md:text-sm text-center px-4">See all {title}</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

const Home: React.FC = () => {
  const { inventory } = useCart();
  const categories = [
    { title: "Student Laptops", cat: Category.STUDENT },
    { title: "Business & Work", cat: Category.BUSINESS },
    { title: "Programming Powerhouses", cat: Category.PROGRAMMING },
    { title: "Gaming Monsters", cat: Category.GAMING },
    { title: "Premium Selection", cat: Category.PREMIUM },
    { title: "Budget Friendly", cat: Category.BUDGET },
  ];

  const hotToday = inventory.slice(0, 3);

  return (
    <div className="space-y-12 md:space-y-24 pb-20 overflow-x-hidden">
      <Helmet>
        <title>Wonderful Computers | Premium Tech Store Nigeria</title>
        <meta name="description" content="Buy affordable, high-quality UK-used and new laptops in Nigeria. Nationwide delivery, tested hardware, and trusted service in Ikeja Computer Village." />
      </Helmet>
      {/* Hero Section */}
      <section className="relative bg-tech-blue py-12 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-20 -mt-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full -ml-10 -mb-10 blur-2xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
            <div className="max-w-2xl text-white">
              <div className="inline-flex items-center gap-2 bg-blue-500/30 border border-blue-400/30 px-3 md:px-4 py-1.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-wider mb-6 md:mb-8">
                <Verified size={14} className="text-blue-300" />
                Trusted in Computer Village, Ikeja since 2015
              </div>
              <h1 className="text-4xl md:text-8xl font-black mb-6 md:mb-8 leading-[1.1] tracking-tighter">
                Premium Laptops. <br />
                <span className="text-blue-400 underline decoration-white/20">Slash Prices.</span> <br />
                No Regrets.
              </h1>
              <p className="text-lg md:text-2xl text-blue-100 mb-8 md:mb-12 font-medium leading-relaxed max-w-xl">
                Grade A+ UK-Used machines starting from <span className="text-white font-black underline">₦165,000</span>. <br className="hidden md:block" />
                Tested by Wonderful Computers Engineers. 12-Months Support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 md:gap-5">
                <Link to="/shop" className="bg-white text-tech-blue px-8 md:px-12 py-5 md:py-6 rounded-2xl font-black text-center hover:bg-gray-100 transition shadow-2xl flex items-center justify-center gap-2 group text-base md:text-lg">
                  Start Shopping <Zap size={20} className="fill-tech-blue group-hover:scale-125 transition" />
                </Link>
                <Link to="/finder" className="bg-transparent border-2 border-white/30 text-white px-8 md:px-12 py-5 md:py-6 rounded-2xl font-black text-center hover:bg-white/10 transition flex items-center justify-center gap-2 backdrop-blur-sm text-base md:text-lg">
                  <Search size={20} />
                  AI Advisor
                </Link>
              </div>
              <div className="mt-8 md:mt-12 flex items-center gap-4 md:gap-8 opacity-70 flex-wrap">
                <div className="flex items-center gap-2 text-xs md:text-sm font-bold"><CheckCircle2 size={16} className="text-green-400" /> <span>Pay on Delivery</span></div>
                <div className="flex items-center gap-2 text-xs md:text-sm font-bold"><CheckCircle2 size={16} className="text-green-400" /> <span>Tested Hardware</span></div>
                <div className="flex items-center gap-2 text-xs md:text-sm font-bold"><CheckCircle2 size={16} className="text-green-400" /> <span>Ikeja Physical Office</span></div>
              </div>
            </div>

            {/* Hot Stock Sidebar */}
            <div className="hidden lg:block w-full max-w-sm bg-white/5 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/10 shadow-2xl">
              <h4 className="text-white font-black text-xl mb-6 flex items-center gap-2">
                <Zap size={24} className="text-yellow-400" /> Hot Today
              </h4>
              <div className="space-y-5">
                {hotToday.map(l => (
                  <Link to={`/product/${l.id}`} key={l.id} className="flex gap-4 items-center bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition group">
                    <img
                      src={l.image || undefined}
                      loading="lazy"
                      className="w-16 h-16 rounded-xl object-cover group-hover:scale-105 transition"
                      alt={l.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=1000";
                      }}
                    />
                    <div>
                      <p className="text-white font-bold text-sm leading-tight mb-1">{l.name}</p>
                      <p className="text-blue-300 font-black">{formatPrice(l.price)}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-8 p-6 bg-yellow-400 rounded-2xl text-tech-blue text-center">
                <p className="font-black text-xs tracking-widest mb-1">PROMO ENDS IN:</p>
                <p className="text-3xl font-black tabular-nums tracking-widest">04:12:09</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges - Amazon/Jumia Style */}
      <section className="max-w-7xl mx-auto px-4 -mt-12 lg:-mt-20 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-100 overflow-hidden">
          <div className="p-8 flex items-center gap-4 hover:bg-gray-50 transition group">
            <div className="bg-blue-50 p-3 rounded-2xl text-tech-blue group-hover:scale-110 transition">
              <Truck size={32} />
            </div>
            <div>
              <h4 className="font-black text-gray-900 uppercase tracking-tighter">Fast Delivery</h4>
              <p className="text-xs text-gray-500 font-bold">Nationwide in Nigeria</p>
            </div>
          </div>
          <div className="p-8 flex items-center gap-4 hover:bg-gray-50 transition group">
            <div className="bg-green-50 p-3 rounded-2xl text-green-600 group-hover:scale-110 transition">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h4 className="font-black text-gray-900 uppercase tracking-tighter">Tested Units</h4>
              <p className="text-xs text-gray-500 font-bold">100% Quality Guaranteed</p>
            </div>
          </div>
          <div className="p-8 flex items-center gap-4 hover:bg-gray-50 transition group">
            <div className="bg-orange-50 p-3 rounded-2xl text-orange-500 group-hover:scale-110 transition">
              <Zap size={32} />
            </div>
            <div>
              <h4 className="font-black text-gray-900 uppercase tracking-tighter">Best Prices</h4>
              <p className="text-xs text-gray-500 font-bold">Unbeatable Value</p>
            </div>
          </div>
          <div className="p-8 flex items-center gap-4 hover:bg-gray-50 transition group">
            <div className="bg-purple-50 p-3 rounded-2xl text-purple-600 group-hover:scale-110 transition">
              <MessageCircle size={32} />
            </div>
            <div>
              <h4 className="font-black text-gray-900 uppercase tracking-tighter">24/7 Support</h4>
              <p className="text-xs text-gray-500 font-bold">Expert Help via WhatsApp</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sliding Product Panels by Category */}
      <div className="space-y-16 md:space-y-24">
        {categories.map((cat, idx) => (
          <CategoryCarousel key={idx} title={cat.title} category={cat.cat} />
        ))}
      </div>

      {/* Trust & Psychological Purchase Triggers Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-tech-blue text-white rounded-[3rem] md:rounded-[4rem] p-8 md:p-24 overflow-hidden relative shadow-2xl">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-6xl font-black mb-8 md:mb-10 leading-[1.1] tracking-tighter">Why Thousands Choose Wonderful Computers</h2>
              <div className="space-y-6 md:space-y-8">
                <div className="flex gap-4 md:gap-6">
                  <div className="bg-blue-500/20 p-3 md:p-4 rounded-2xl md:rounded-3xl h-fit border border-white/5 shadow-inner flex-shrink-0"><ShieldCheck className="text-blue-400" size={28} /></div>
                  <div>
                    <h4 className="font-black text-lg md:text-xl mb-1">Rigorous 10-Point Testing</h4>
                    <p className="text-blue-100/70 text-xs md:text-sm leading-relaxed">Our engineers check battery health, SSD speeds, ports, and screen quality before any laptop leaves our shop.</p>
                  </div>
                </div>
                <div className="flex gap-4 md:gap-6">
                  <div className="bg-blue-500/20 p-3 md:p-4 rounded-2xl md:rounded-3xl h-fit border border-white/5 shadow-inner flex-shrink-0"><MapPin className="text-blue-400" size={28} /></div>
                  <div>
                    <h4 className="font-black text-lg md:text-xl mb-1">Lagos Physical Store</h4>
                    <p className="text-blue-100/70 text-xs md:text-sm leading-relaxed">We are not "ghost" sellers. Visit our mega-store in Ikeja Computer Village to see and test before you pay.</p>
                  </div>
                </div>
                <div className="flex gap-4 md:gap-6">
                  <div className="bg-blue-500/20 p-3 md:p-4 rounded-2xl md:rounded-3xl h-fit border border-white/5 shadow-inner flex-shrink-0"><Zap className="text-yellow-400" size={28} /></div>
                  <div>
                    <h4 className="font-black text-lg md:text-xl mb-1">Direct Grade A+ UK-Used</h4>
                    <p className="text-blue-100/70 text-xs md:text-sm leading-relaxed">No "Nigeria-used" refurbished junk. We only sell clean, high-performance machines that look and work like new.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] text-tech-blue shadow-3xl transform lg:rotate-3">
                <div className="flex items-center gap-2 mb-4 md:mb-6">
                  <div className="bg-blue-50 p-2 rounded-lg"><Star className="text-yellow-500" fill="currentColor" size={20} /></div>
                  <h3 className="text-xl md:text-2xl font-black tracking-tighter">Engineer's Verdict</h3>
                </div>
                <div className="space-y-4 md:space-y-6 italic text-gray-600 leading-relaxed font-medium text-sm md:text-base">
                  <p>"The current batch of HP 840 G5 is incredibly solid. The aluminum unibody is perfect for Nigerians on the go. Battery health verified at 90%+ across all units. Highly recommended for business use."</p>
                  <div className="flex items-center gap-3 md:gap-4 mt-6 md:mt-8 border-t border-gray-100 pt-4 md:pt-6">
                    <div className="w-10 h-10 md:w-14 md:h-14 bg-blue-50 rounded-full flex items-center justify-center font-black text-tech-blue text-base md:text-xl border-2 border-white shadow-sm">EE</div>
                    <div>
                      <p className="font-black text-tech-blue not-italic text-base md:text-lg">Engr. Emeka</p>
                      <p className="text-[9px] md:text-[10px] uppercase font-black text-gray-400 tracking-widest">Chief Tech, Wonderful Computers</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -inset-8 bg-blue-500/30 rounded-full -z-10 blur-[80px]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Nationwide Delivery Promo */}
      <section className="bg-gray-100/50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-black mb-4 md:mb-6 tracking-tight uppercase italic underline decoration-tech-blue/20">Safely Delivered Anywhere in Nigeria</h2>
          <p className="text-gray-500 max-w-2xl mx-auto mb-10 md:mb-14 text-base md:text-lg font-medium">
            From Lagos to Abuja, Port Harcourt to Kano. We use secure double-bubble packaging. Your laptop arrives safe or we replace it!
          </p>
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {['Lagos', 'Abuja', 'Ibadan', 'Port Harcourt', 'Benin', 'Enugu', 'Kaduna', 'Jos'].map(city => (
              <span key={city} className="bg-white px-4 md:px-8 py-2.5 md:py-4 rounded-xl md:rounded-2xl shadow-sm text-xs md:text-sm font-black text-gray-700 border border-gray-200 uppercase tracking-tighter hover:bg-tech-blue hover:text-white transition cursor-default">
                {city}
              </span>
            ))}
            <span className="bg-tech-blue text-white px-4 md:px-8 py-2.5 md:py-4 rounded-xl md:rounded-2xl shadow-xl text-xs md:text-sm font-black uppercase tracking-tighter">
              + All 36 states
            </span>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-black mb-10 md:mb-16 text-center tracking-tight uppercase italic">What Nigerians Are Saying</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {TESTIMONIALS.map(t => (
            <div key={t.id} className="bg-white p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col hover:shadow-xl transition-all duration-300">
              <div className="flex gap-1 text-orange-400 mb-6 md:mb-8">
                {[...Array(t.rating)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <p className="text-gray-700 mb-8 md:mb-10 font-bold italic text-lg md:text-xl leading-relaxed">"{t.text}"</p>
              <div className="mt-auto border-t border-gray-50 pt-6 md:pt-8 flex items-center justify-between">
                <div>
                  <p className="font-black text-gray-900 text-base md:text-lg tracking-tighter">{t.name}</p>
                  <p className="text-[9px] md:text-[10px] text-gray-400 font-black uppercase tracking-widest">{t.location}, Nigeria</p>
                </div>
                <div className="bg-green-100 text-green-700 px-3 md:px-4 py-1 rounded-full text-[9px] md:text-[10px] font-black flex items-center gap-1.5 shadow-sm border border-green-200">
                  <Verified size={12} /> VERIFIED BUYER
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
