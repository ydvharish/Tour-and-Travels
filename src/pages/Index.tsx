import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Clock, Tag, Check, Search, MapPin, Calendar, Users, Phone, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    pickupLocation: '',
    travelDate: '',
    seatingCapacity: ''
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    
    if (searchData.pickupLocation) {
      queryParams.append('location', searchData.pickupLocation);
    }
    if (searchData.travelDate) {
      queryParams.append('date', searchData.travelDate);
    }
    if (searchData.seatingCapacity) {
      queryParams.append('seatingCapacity', searchData.seatingCapacity);
    }

    navigate(`/cars?${queryParams.toString()}`);
  };

  return (
    <div className="bg-blue-50">
      {/* Hero Section */}
      <section 
        className="hero-gradient text-white py-32 px-4 relative overflow-hidden min-h-[90vh] flex items-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url('/images/bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Animated background overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="space-y-4 mb-8">
              <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in leading-tight">
                Explore India with Our
                <span className="text-brand-orange block mt-2">Premium Car Services</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 animate-fade-in-up text-gray-200 leading-relaxed">
                Book a car for your next tour or local trip. 
                <span className="block mt-2">Affordable rates, comfortable rides, and unforgettable memories.</span>
              </p>
            </div>
            
            {/* Search Component with enhanced styling */}
            <form onSubmit={handleSearch} className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8 animate-fade-in-up shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="relative group">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-orange" />
                  <Input 
                    placeholder="Pickup Location" 
                    className="pl-10 bg-white/20 text-white placeholder:text-gray-300 border-white/20 focus:border-brand-orange transition-all"
                    value={searchData.pickupLocation}
                    onChange={(e) => setSearchData(prev => ({ ...prev, pickupLocation: e.target.value }))}
                  />
                </div>
                <div className="relative group">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-orange" />
                  <Input 
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    className="pl-10 bg-white/20 text-white border-white/20 focus:border-brand-orange transition-all"
                    value={searchData.travelDate}
                    onChange={(e) => setSearchData(prev => ({ ...prev, travelDate: e.target.value }))}
                  />
                </div>
                <Select
                  value={searchData.seatingCapacity}
                  onValueChange={(value) => setSearchData(prev => ({ ...prev, seatingCapacity: value }))}
                >
                  <SelectTrigger className="bg-white/20 text-white border-white/20 focus:border-brand-orange transition-all">
                    <SelectValue placeholder="Seating Capacity" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 text-white border-white/20">
                    <SelectItem value="5">5 Seater</SelectItem>
                    <SelectItem value="7">7 Seater</SelectItem>
                    <SelectItem value="20">20 Seater</SelectItem>
                  </SelectContent>
                </Select>
                <Button type="submit" className="bg-brand-orange hover:bg-brand-orange/90 transition-all duration-300 text-lg py-6">
                  <Search className="mr-2 h-5 w-5" />
                  Search Cars
                </Button>
              </div>
            </form>

            {/* Important Information with enhanced styling */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8 animate-fade-in-up text-left shadow-2xl border border-white/10">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Shield className="h-6 w-6 text-brand-orange mr-2" />
                Important Booking Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-all">
                    <div className="h-6 w-6 rounded-full bg-brand-orange/20 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <span className="text-brand-orange">•</span>
                    </div>
                    <p className="text-sm text-gray-200">Toll charges, parking fees, and state taxes are not included in the base fare and will be charged extra</p>
                  </div>
                  <div className="flex items-start bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-all">
                    <div className="h-6 w-6 rounded-full bg-brand-orange/20 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <span className="text-brand-orange">•</span>
                    </div>
                    <p className="text-sm text-gray-200">For interstate travel, a minimum of 250 km per day will be charged</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-all">
                    <div className="h-6 w-6 rounded-full bg-brand-orange/20 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <span className="text-brand-orange">•</span>
                    </div>
                    <p className="text-sm text-gray-200">Driver allowance for outstation trips will be charged separately</p>
                  </div>
                  <div className="flex items-start bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-all">
                    <div className="h-6 w-6 rounded-full bg-brand-orange/20 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <span className="text-brand-orange">•</span>
                    </div>
                    <p className="text-sm text-gray-200">Night charges applicable between 10 PM to 6 AM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center animate-fade-in-up">
              <Link to="/cars">
                <Button className="bg-brand-orange hover:bg-brand-orange/90 transition-all duration-300 text-white font-semibold px-8 py-4 text-lg rounded-xl">
                  Browse Cars
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-white/50 to-blue-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Experience the best in car rental services with our premium features and exceptional customer care.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 mb-6 overflow-hidden rounded-xl bg-gray-100">
                <div className="absolute top-4 right-4 bg-blue-600/90 backdrop-blur-sm text-white p-3 rounded-full shadow-lg z-10">
                  <Shield className="w-6 h-6" />
                </div>
                <div className="w-full h-full flex items-center justify-center">
                  <img 
                    src="/images/Safety.jpg" 
                    alt="Safety First" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/images/default-car.jpg';
                      e.currentTarget.alt = 'Default Car Image';
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
              </div>
              <h3 className="text-xl font-bold mb-3">Safety First</h3>
              <p className="text-gray-600 mb-4">Our vehicles undergo regular maintenance and safety checks to ensure your journey is secure and comfortable.</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Safety Rating</span>
                <span className="text-lg font-bold text-blue-600">4.9/5</span>
              </div>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 mb-6 overflow-hidden rounded-xl bg-gray-100">
                <div className="absolute top-4 right-4 bg-blue-600/90 backdrop-blur-sm text-white p-3 rounded-full shadow-lg z-10">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="w-full h-full flex items-center justify-center">
                  <img 
                    src="/images/support.jpg" 
                    alt="24/7 Support" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/images/default-car.jpg';
                      e.currentTarget.alt = 'Default Car Image';
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
              </div>
              <h3 className="text-xl font-bold mb-3">24/7 Support</h3>
              <p className="text-gray-600 mb-4">Our dedicated support team is available round the clock to assist you with any queries or emergencies.</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Response Time</span>
                  <span className="text-lg font-bold text-blue-600">Under 5 mins</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Contact Us</span>
                  <a 
                    href="tel:+919811368167" 
                    className="text-lg font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    +91 98113 68167
                  </a>
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 mb-6 overflow-hidden rounded-xl bg-gray-100">
                <div className="absolute top-4 right-4 bg-blue-600/90 backdrop-blur-sm text-white p-3 rounded-full shadow-lg z-10">
                  <IndianRupee className="w-6 h-6" />
                </div>
                <div className="w-full h-full flex items-center justify-center">
                  <img 
                    src="/images/best-price.png" 
                    alt="Best Prices" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/images/default-car.jpg';
                      e.currentTarget.alt = 'Default Car Image';
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
              </div>
              <h3 className="text-xl font-bold mb-3">Best Prices</h3>
              <p className="text-gray-600 mb-4">Enjoy competitive pricing with no hidden charges and flexible payment options for your convenience.</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Customer Savings</span>
                <span className="text-lg font-bold text-blue-600">Up to 20%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Car Categories Section */}
      <section className="py-24 bg-gradient-to-b from-blue-50/30 to-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Our Fleet</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Choose from our wide range of vehicles to match your travel needs and style preferences.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 mb-6 overflow-hidden rounded-xl">
                <img src="/images/Aura.jpeg" alt="Economy Cars" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">Economy Cars</h3>
              </div>
              <p className="text-gray-600 mb-4">Perfect for city drives and small families. Comfortable and fuel-efficient.</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Starting from</span>
                <span className="text-lg font-bold text-blue-600">₹15/km</span>
              </div>
            </div>

            <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 mb-6 overflow-hidden rounded-xl">
                <img src="/images/crysta.jpg" alt="SUV" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">SUV</h3>
              </div>
              <p className="text-gray-600 mb-4">Spacious and powerful, ideal for family trips and rough terrain adventures.</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Starting from</span>
                <span className="text-lg font-bold text-blue-600">₹18/km</span>
              </div>
            </div>

            <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 mb-6 overflow-hidden rounded-xl">
                <img src="/images/ciaz.jpg" alt="Luxury" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">Luxury</h3>
              </div>
              <p className="text-gray-600 mb-4">Premium vehicles for those who demand the finest in comfort and style.</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Starting from</span>
                <span className="text-lg font-bold text-blue-600">₹16/km</span>
              </div>
            </div>

            <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 mb-6 overflow-hidden rounded-xl">
                <img src="/images/traveller.jpg" alt="Traveller" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">Traveller</h3>
              </div>
              <p className="text-gray-600 mb-4">Large capacity vehicles perfect for group travel and long journeys.</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Starting from</span>
                <span className="text-lg font-bold text-blue-600">₹30/km</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
