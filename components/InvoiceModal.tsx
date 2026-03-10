
import React, { useRef } from 'react';
import { X, CheckCircle, MessageCircle } from 'lucide-react';
import { formatPrice, WHATSAPP_NUMBER } from '../constants';
import { CartItem } from '../types';

interface InvoiceModalProps {
  order: {
    id: string;
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    items: CartItem[];
    totalAmount: number;
    paymentMethod: string;
    createdAt: string;
  };
  onClose: () => void;
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({ order, onClose }) => {
  const invoiceRef = useRef<HTMLDivElement>(null);

  const openWhatsApp = () => {
    let message = `*NEW ORDER FROM WONDERFUL AUTOS AND TECH*%0A%0A`;
    message += `*Order ID:* ${order.id}%0A`;
    message += `*Name:* ${order.customerName}%0A`;
    message += `*Total:* ${formatPrice(order.totalAmount)}%0A%0A`;
    message += `I just placed an order. Please confirm availability.`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300 flex flex-col max-h-[95vh]">
        {/* Success Header */}
        <div className="bg-green-600 p-8 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition"
          >
            <X size={24} />
          </button>
          <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tight">Order Successful!</h2>
          <p className="text-green-100 font-bold mt-2">Your order has been recorded and sent to our team.</p>
        </div>

        {/* Action Buttons */}
        <div className="p-6 bg-gray-50 border-b border-gray-100 flex flex-col gap-4">
          <button
            onClick={openWhatsApp}
            className="w-full bg-green-600 text-white py-5 px-6 rounded-2xl font-black flex items-center justify-center gap-3 shadow-lg hover:bg-green-700 transition active:scale-95 text-xl"
          >
            <MessageCircle size={24} /> Complete on WhatsApp
          </button>
        </div>

        {/* Invoice Preview (Hidden from view but used for PDF generation) */}
        <div className="flex-grow overflow-y-auto p-8 bg-gray-100">
          <div className="text-center mb-4">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Invoice Preview</p>
          </div>

          <div
            ref={invoiceRef}
            className="bg-white p-10 shadow-sm mx-auto max-w-[210mm] text-gray-800 font-sans"
            style={{ minHeight: '297mm' }}
          >
            {/* Invoice Header */}
            <div className="flex justify-between items-start border-b-4 border-tech-blue pb-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-12 h-12 bg-tech-blue rounded flex items-center justify-center">
                    <span className="text-white font-black text-2xl italic">WAT</span>
                  </div>
                  <span className="text-tech-blue font-black text-2xl tracking-tighter uppercase">Wonderful Autos and Tech</span>
                </div>
                <p className="text-sm font-bold text-gray-500">Premium Laptops & Tech Solutions</p>
                <p className="text-xs text-gray-400 mt-1">Lagos | Osogbo | Ibadan | Nationwide Delivery</p>
              </div>
              <div className="text-right">
                <h1 className="text-4xl font-black text-tech-blue uppercase tracking-tighter mb-2">Invoice</h1>
                <p className="text-sm font-bold">Order ID: <span className="text-gray-900">{order.id}</span></p>
                <p className="text-sm font-bold">Date: <span className="text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</span></p>
              </div>
            </div>

            {/* Customer & Payment Info */}
            <div className="grid grid-cols-2 gap-12 mb-12">
              <div>
                <h3 className="text-xs font-black text-tech-blue uppercase tracking-widest mb-4 border-b pb-1">Bill To:</h3>
                <p className="font-black text-lg text-gray-900 mb-1">{order.customerName}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{order.customerAddress}</p>
                <p className="text-sm font-bold text-gray-900 mt-2">Tel: {order.customerPhone}</p>
              </div>
              <div>
                <h3 className="text-xs font-black text-tech-blue uppercase tracking-widest mb-4 border-b pb-1">Payment Details:</h3>
                <p className="text-sm font-bold text-gray-600 mb-1">Method: <span className="text-gray-900">{order.paymentMethod}</span></p>
                <p className="text-sm font-bold text-gray-600">Status: <span className="text-orange-600 uppercase">Pending Verification</span></p>
              </div>
            </div>

            {/* Items Table */}
            <table className="w-full mb-12">
              <thead>
                <tr className="bg-tech-blue text-white">
                  <th className="py-3 px-4 text-left text-xs font-black uppercase tracking-widest">Item Description</th>
                  <th className="py-3 px-4 text-center text-xs font-black uppercase tracking-widest">Qty</th>
                  <th className="py-3 px-4 text-right text-xs font-black uppercase tracking-widest">Price</th>
                  <th className="py-3 px-4 text-right text-xs font-black uppercase tracking-widest">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {order.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-4 px-4">
                      <p className="font-black text-gray-900">{item.name}</p>
                      <p className="text-[10px] text-gray-400 uppercase font-bold">{item.specs}</p>
                    </td>
                    <td className="py-4 px-4 text-center font-bold">{item.quantity}</td>
                    <td className="py-4 px-4 text-right font-bold">{formatPrice(item.price)}</td>
                    <td className="py-4 px-4 text-right font-black text-tech-blue">{formatPrice(item.price * item.quantity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div className="flex justify-end mb-12">
              <div className="w-full max-w-xs space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-bold uppercase">Subtotal</span>
                  <span className="font-black text-gray-900">{formatPrice(order.totalAmount - (order.totalAmount > 10000 ? 5000 : 0))}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-bold uppercase">Shipping</span>
                  <span className="font-black text-gray-900">{formatPrice(order.totalAmount > 10000 ? 5000 : 0)}</span>
                </div>
                <div className="flex justify-between text-xl border-t-4 border-tech-blue pt-3">
                  <span className="text-tech-blue font-black uppercase tracking-tighter">Total Amount</span>
                  <span className="text-tech-blue font-black">{formatPrice(order.totalAmount)}</span>
                </div>
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-auto pt-12 border-t border-gray-100 text-center">
              <p className="text-sm font-black text-gray-900 mb-2 italic">Thank you for choosing Wonderful Autos and Tech!</p>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest leading-relaxed">
                Please keep this invoice for your records. Delivery will be processed within 24-48 hours after payment verification.
                For support, contact us on WhatsApp: +234 909 008 5555.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white text-center">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-tech-blue font-black uppercase text-xs tracking-widest transition"
          >
            Close and Return to Shop
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
