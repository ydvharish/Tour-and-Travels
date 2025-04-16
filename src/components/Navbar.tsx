import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Car } from 'lucide-react';
import { useNavbar } from '@/context/NavbarContext';

const Navbar: React.FC = () => {
  const { isOpen, toggle, close } = useNavbar();
  const location = useLocation();

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-gray-200/95 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3" onClick={close}>
            <img 
              src="/images/logo.png" 
              alt="Shubham Tour & Travels" 
              className="w-12 h-12 object-contain"
            />
            <span className="text-xl font-bold text-gray-800">
              Shubham Tour<span className="text-brand-orange"> & Travels</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/" 
              className={`
                px-6 py-2.5 rounded-full transition-all duration-300
                flex items-center space-x-2 font-medium
                ${isActivePath('/') 
                  ? 'bg-brand-orange text-white shadow-lg transform scale-105' 
                  : 'bg-white text-gray-700 hover:bg-brand-orange hover:text-white hover:shadow-md hover:scale-105'}
              `}
              onClick={close}
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>
            <Link 
              to="/cars" 
              className={`
                px-6 py-2.5 rounded-full transition-all duration-300
                flex items-center space-x-2 font-medium
                ${isActivePath('/cars') 
                  ? 'bg-brand-orange text-white shadow-lg transform scale-105' 
                  : 'bg-white text-gray-700 hover:bg-brand-orange hover:text-white hover:shadow-md hover:scale-105'}
              `}
              onClick={close}
            >
              <Car className="w-5 h-5" />
              <span>Cars</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 hover:text-brand-orange transition-colors duration-200 p-2 rounded-lg hover:bg-white" 
            onClick={toggle}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-3 py-3 border-t border-gray-300 animate-fade-in">
            <div className="flex flex-col space-y-2 px-2">
              <Link 
                to="/" 
                className={`
                  px-4 py-3 rounded-xl transition-all duration-300
                  flex items-center space-x-3
                  ${isActivePath('/') 
                    ? 'bg-brand-orange text-white shadow-lg' 
                    : 'bg-white text-gray-700 hover:bg-brand-orange hover:text-white hover:shadow-md'}
                `}
                onClick={close}
              >
                <Home className="w-5 h-5" />
                <span className="font-medium">Home</span>
              </Link>
              <Link 
                to="/cars" 
                className={`
                  px-4 py-3 rounded-xl transition-all duration-300
                  flex items-center space-x-3
                  ${isActivePath('/cars') 
                    ? 'bg-brand-orange text-white shadow-lg' 
                    : 'bg-white text-gray-700 hover:bg-brand-orange hover:text-white hover:shadow-md'}
                `}
                onClick={close}
              >
                <Car className="w-5 h-5" />
                <span className="font-medium">Cars</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
