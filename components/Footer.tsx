
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Truck, Settings } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-tech-blue text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
              <span className="text-tech-blue font-black text-xl italic">IF</span>
            </div>
            <span className="text-white font-extrabold text-xl tracking-tight">Info-Fix <span className="text-blue-300">Laptop</span></span>
          </div>
          <p className="text-blue-100 text-sm leading-relaxed mb-6">
            Premium Nigerian electronics retailer specializing in affordable UK-used and new laptops. We prioritize reliability, trust, and exceptional nationwide delivery.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-blue-900/50 rounded-lg hover:bg-blue-800 transition"><Facebook size={18} /></a>
            <a href="#" className="p-2 bg-blue-900/50 rounded-lg hover:bg-blue-800 transition"><Twitter size={18} /></a>
            <a href="https://www.instagram.com/info_fix_laptops_gadgets/" target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-900/50 rounded-lg hover:bg-blue-800 transition">
              <Instagram size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6">Quick Links</h4>
          <ul className="space-y-4 text-blue-100 text-sm">
            <li><Link to="/shop" className="hover:text-white transition">Shop Catalog</Link></li>
            <li><Link to="/student-deals" className="hover:text-white transition">Student Specials</Link></li>
            <li><Link to="/bulk-orders" className="hover:text-white transition">Corporate Orders</Link></li>
            <li><Link to="/finder" className="hover:text-white transition">AI Laptop Finder</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6">Contact Us</h4>
          <ul className="space-y-4 text-blue-100 text-sm">
            <li className="flex items-center gap-3"><MapPin size={18} className="text-blue-300" /> <span>Suite 52,1 Adepele(Blue building), computer village, Ikeja 100212</span></li>
            <li className="flex items-center gap-3"><Phone size={18} className="text-blue-300" /> <span>+234 813 362 0282</span></li>
            <li className="flex items-center gap-3"><Mail size={18} className="text-blue-300" /> <span>sales@infofixlaptops.com.ng</span></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6">Newsletter</h4>
          <p className="text-blue-100 text-sm mb-4">Get the latest laptop deals and tech tips in your inbox.</p>
          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              className="w-full bg-blue-900/50 border border-blue-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
            />
            <button className="w-full bg-white text-tech-blue font-black py-3 rounded-xl text-sm hover:bg-blue-50 transition shadow-lg">
              Subscribe Now
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-10 border-t border-blue-800/50 flex flex-col md:flex-row justify-between items-center gap-4 text-blue-300 text-xs">
        <p>&copy; {new Date().getFullYear()} Info-Fix Laptop Nigeria. Trusted Laptop Retailer. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
