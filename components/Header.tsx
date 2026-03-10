
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, MessageCircle, Menu, X, Truck, Bot, Search, Heart, LogIn, LogOut, Settings, ChevronDown, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { WHATSAPP_NUMBER } from '../constants';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount, wishlist } = useCart();
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsOpen(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Banner */}
      <div className="bg-tech-blue text-white py-2 text-center text-xs md:text-sm font-semibold flex items-center justify-center gap-2">
        <Truck size={16} />
        <span>🚚 Nationwide Laptop Delivery Across Nigeria — Fast &amp; Secure</span>
      </div>

      {/* Main Nav */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-10 h-10 bg-tech-blue rounded flex items-center justify-center">
                <span className="text-white font-black text-xl italic drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">WAT</span>
              </div>
              <span className="font-extrabold text-xl tracking-tight hidden lg:block text-tech-blue">Wonderful Autos and Tech</span>
            </Link>

            {/* Global Search Bar */}
            <div className="hidden md:flex flex-grow max-w-xl mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for laptops, brands, or specs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-100 border-none rounded-xl py-2.5 pl-4 pr-12 focus:ring-2 focus:ring-tech-blue transition-all text-sm font-medium text-gray-900"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-tech-blue text-white rounded-lg hover:bg-blue-900 transition">
                  <Search size={18} />
                </button>
              </form>
            </div>

            {/* Desktop Links */}
            <div className="hidden xl:flex space-x-6 items-center">
              <Link to="/" className="text-gray-600 hover:text-tech-blue font-medium transition">Home</Link>
              <Link to="/shop" className="text-gray-600 hover:text-tech-blue font-medium transition">Shop</Link>
              <Link to="/student-deals" className="text-gray-600 hover:text-tech-blue font-medium transition">Student Deals</Link>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-3">
              <Link to="/finder" className="flex items-center gap-2 text-tech-blue text-xs font-black bg-blue-50 px-3 py-2 rounded-full hover:bg-blue-100 transition-colors border border-blue-100">
                <Bot size={18} />
                <span className="hidden sm:inline uppercase">AI Advisor</span>
              </Link>

              <Link to="/wishlist" className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <Heart size={24} />
                {wishlist.length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <Link to="/cart" className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="hidden md:flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-bold transition shadow-sm"
              >
                <MessageCircle size={18} />
                <span>WhatsApp</span>
              </a>

              {/* Auth Button / User Avatar */}
              {user ? (
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setShowUserMenu(v => !v)}
                    className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-full pl-1 pr-3 py-1 transition-colors"
                  >
                    {user.user_metadata?.avatar_url ? (
                      <img
                        src={user.user_metadata.avatar_url}
                        alt="avatar"
                        className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-tech-blue flex items-center justify-center text-white font-black text-sm">
                        WAT
                      </div>
                    )}
                    {isAdmin && (
                      <span className="hidden sm:inline text-[10px] font-black uppercase tracking-wider text-tech-blue">Admin</span>
                    )}
                    <ChevronDown size={14} className={`text-gray-500 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
                      {/* User info */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-black text-gray-900 text-sm truncate">{user.user_metadata?.full_name || 'User'}</p>
                        <p className="text-gray-400 text-[11px] truncate">{user.email}</p>
                        {isAdmin && (
                          <span className="inline-block mt-1 text-[10px] bg-tech-blue text-white px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
                            Admin
                          </span>
                        )}
                      </div>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <Settings size={16} className="text-tech-blue" />
                          Admin Panel
                        </Link>
                      )}
                      <Link
                        to="/orders"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Package size={16} className="text-tech-blue" />
                        My Orders
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={16} />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="hidden md:flex items-center gap-2 bg-tech-blue text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-900 transition shadow-sm text-sm"
                >
                  <LogIn size={16} />
                  <span>Sign In</span>
                </Link>
              )}

              <button onClick={toggleMenu} className="lg:hidden p-2 text-gray-600">
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-6 space-y-6">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search laptops..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-100 border-none rounded-xl py-3 pl-4 pr-12 focus:ring-2 focus:ring-tech-blue transition-all text-sm font-medium text-gray-900"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-tech-blue text-white rounded-lg">
                <Search size={20} />
              </button>
            </form>

            <div className="grid grid-cols-2 gap-4">
              <Link to="/" onClick={toggleMenu} className="flex flex-col items-center justify-center bg-gray-50 p-4 rounded-2xl text-gray-700 font-bold text-sm">Home</Link>
              <Link to="/shop" onClick={toggleMenu} className="flex flex-col items-center justify-center bg-gray-50 p-4 rounded-2xl text-gray-700 font-bold text-sm">Shop</Link>
              <Link to="/wishlist" onClick={toggleMenu} className="flex flex-col items-center justify-center bg-gray-50 p-4 rounded-2xl text-gray-700 font-bold text-sm">Wishlist</Link>
              <Link to="/student-deals" onClick={toggleMenu} className="flex flex-col items-center justify-center bg-gray-50 p-4 rounded-2xl text-gray-700 font-bold text-sm">Students</Link>
            </div>

            <Link to="/finder" onClick={toggleMenu} className="flex items-center justify-center gap-3 w-full bg-blue-50 text-tech-blue py-4 rounded-2xl font-black border border-blue-100">
              <Bot size={24} />
              <span>AI LAPTOP FINDER</span>
            </Link>

            {/* Mobile Auth */}
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-4">
                  {user.user_metadata?.avatar_url ? (
                    <img src={user.user_metadata.avatar_url} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-tech-blue flex items-center justify-center text-white font-black">
                      {(user.email || 'U')[0].toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="font-black text-gray-900 text-sm">{user.user_metadata?.full_name || 'User'}</p>
                    <p className="text-gray-400 text-xs">{user.email}</p>
                  </div>
                </div>
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={toggleMenu}
                    className="flex items-center justify-center gap-2 w-full bg-tech-blue text-white py-4 rounded-2xl font-black shadow-lg"
                  >
                    <Settings size={20} />
                    <span>ADMIN PANEL</span>
                  </Link>
                )}
                <Link
                  to="/orders"
                  onClick={toggleMenu}
                  className="flex items-center justify-center gap-2 w-full bg-gray-100 text-gray-800 py-4 rounded-2xl font-black"
                >
                  <Package size={20} />
                  <span>MY ORDERS</span>
                </Link>
                <button
                  onClick={() => { handleSignOut(); toggleMenu(); }}
                  className="flex items-center justify-center gap-2 w-full border-2 border-red-100 text-red-600 py-4 rounded-2xl font-black"
                >
                  <LogOut size={20} />
                  <span>SIGN OUT</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={toggleMenu}
                className="flex items-center justify-center gap-2 bg-tech-blue text-white w-full py-4 rounded-2xl font-black shadow-lg"
              >
                <LogIn size={20} />
                <span>SIGN IN WITH GOOGLE</span>
              </Link>
            )}

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              className="flex items-center justify-center gap-2 bg-green-500 text-white w-full py-4 rounded-2xl font-black shadow-lg"
            >
              <MessageCircle size={24} />
              <span>CHAT ON WHATSAPP</span>
            </a>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
