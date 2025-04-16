import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              Shubham Tour<span className="text-brand-orange"> & Travels</span>
            </h3>
            <p className="text-gray-400 mb-4">
              Your trusted partner for car tours and local trips across India. We provide premium vehicles for all your travel needs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-brand-orange">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-brand-orange">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-brand-orange">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-brand-orange">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-brand-orange">Home</Link>
              </li>
              <li>
                <Link to="/cars" className="text-gray-400 hover:text-brand-orange">Our Cars</Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-brand-orange">About Us</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-brand-orange">Services</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-brand-orange">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Car Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Car Categories</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-brand-orange">Economy Cars</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-brand-orange">Luxury Sedans</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-brand-orange">SUVs</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-brand-orange">Premium Cars</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-brand-orange">Mini Vans</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <p className="flex items-start space-x-3">
                <MapPin size={20} className="shrink-0 text-brand-orange" />
                <span className="text-gray-400">5 ,Ashok vihar phase 3 EXTN, Gurugram-122001</span>
              </p>
              <p className="flex items-center space-x-3">
                <Phone size={20} className="shrink-0 text-brand-orange" />
                <span className="text-gray-400">+91 9811368167, +91 9671862121</span>
              </p>
              <p className="flex items-center space-x-3">
                <Mail size={20} className="shrink-0 text-brand-orange" />
                <span className="text-gray-400">shubhamtourandtravels9@gmail.com, yadavshubham6695@gmail.com</span>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Shubham Tour And Travels. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
