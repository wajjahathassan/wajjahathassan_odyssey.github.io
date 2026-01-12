import React, { useState } from 'react';
import { X, MessageCircle, Send } from 'lucide-react';
import Mascot from './Mascot';

const Chatbox = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 animate-fade-in-up origin-bottom-right">
          <div className="bg-asan-green p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center border border-white/30">
                 {/* Mini Mascot Head */}
                 <Mascot className="w-full h-full" compact={true} />
               </div>
               <div>
                 <h3 className="font-serif font-bold text-sm">Assistant</h3>
                 <p className="text-xs text-green-100">Online • Ready to help</p>
               </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded transition-colors">
              <X size={18} />
            </button>
          </div>
          
          <div className="h-64 p-4 bg-gray-50 overflow-y-auto">
            <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-gray-700 inline-block max-w-[85%] border border-gray-100">
              Hello! I am the spirit of this portfolio. How can I assist you today? 🏯
            </div>
          </div>

          <div className="p-3 bg-white border-t border-gray-100">
             <form className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Ask me anything..." 
                  className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-asan-gold/50 transition-shadow"
                />
                <button type="submit" className="p-2 bg-asan-gold text-white rounded-full hover:bg-opacity-90 transition-colors shadow-sm">
                   <Send size={16} />
                </button>
             </form>
          </div>
        </div>
      )}

      {/* Toggle Button - Using Mascot Head */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="group relative w-16 h-16 flex items-center justify-center transition-transform active:scale-95"
      >
        <div className={`absolute inset-0 bg-asan-green rounded-full shadow-lg transition-transform duration-300 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100 group-hover:scale-110'}`}></div>
        
        {/* If closed, show Mascot. If open, show nothing (or close icon, but handling that in window) */}
        {!isOpen ? (
            <div className="relative w-12 h-12 z-10 transition-transform duration-300 group-hover:-translate-y-1">
                <Mascot compact={true} />
                {/* Chat Bubble Notification */}
                <div className="absolute -top-1 -right-1 bg-red-500 w-3 h-3 rounded-full border-2 border-white"></div>
            </div>
        ) : (
             <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center shadow-inner hover:bg-gray-300 transition-colors">
                <X size={24} className="text-gray-600" />
             </div>
        )}
      </button>
    </div>
  );
};

export default Chatbox;