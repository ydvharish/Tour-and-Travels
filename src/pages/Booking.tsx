import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  CreditCard, 
  User, 
  Mail, 
  Phone,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { getCarById, Car } from '@/services/carService';
import { createBooking } from '@/services/bookingService';
import { getCurrentDate, calculateDistance, formatCurrency } from '@/utils/utils';

const BookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  
  const [car, setCar] = useState<Car | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [travelDate, setTravelDate] = useState(getCurrentDate());
  const [travelTime, setTravelTime] = useState('09:00');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  // Calculated values
  const [distance, setDistance] = useState<number | null>(null);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);

  useEffect(() => {
    // Fetch car details
    const fetchCar = async () => {
      if (!id) return;
      
      try {
        const carData = await getCarById(id);
        
        if (!carData) {
          toast({
            title: "Car not found",
            description: "The requested car could not be found",
            variant: "destructive",
          });
          navigate('/cars');
          return;
        }
        
        setCar(carData);
        setIsLoading(false);
        
        // Pre-fill user info if authenticated
        if (isAuthenticated && user) {
          setName(user.name);
          setEmail(user.email);
        }
      } catch (error) {
        console.error('Error fetching car details:', error);
        toast({
          title: "Error",
          description: "Failed to load car details",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    };

    fetchCar();
  }, [id, navigate, toast, isAuthenticated, user]);

  // Calculate estimated price when pickup and drop locations change
  useEffect(() => {
    if (pickupLocation && dropLocation && car) {
      const estimatedDistance = calculateDistance(pickupLocation, dropLocation);
      setDistance(estimatedDistance);
      
      const estimatedCost = Math.round(estimatedDistance * car.pricePerKm);
      setTotalAmount(estimatedCost);
    } else {
      setDistance(null);
      setTotalAmount(null);
    }
  }, [pickupLocation, dropLocation, car]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!car || !distance || !totalAmount) {
      toast({
        title: "Missing information",
        description: "Please fill in all the required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Validation
    if (!pickupLocation || !dropLocation || !travelDate || !travelTime || !name || !email || !phone) {
      toast({
        title: "Missing information",
        description: "Please fill in all the required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create booking with complete car details
      const bookingData = {
        carId: car.id,
        car: car,
        userId: user?.id || 'guest',
        userName: name,
        userEmail: email,
        userPhone: phone,
        pickupLocation,
        dropLocation,
        travelDate,
        travelTime,
        distance,
        totalAmount,
        paymentMethod: 'UPI' as const,
      };
      
      await createBooking(bookingData);
      
      toast({
        title: "Booking Successful",
        description: "Your booking has been confirmed. Check your email for details.",
      });
      
      // Redirect to dashboard or confirmation page
      if (isAuthenticated) {
        navigate('/dashboard/bookings');
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="spinner mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading booking information...</p>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-xl text-gray-600">Car not found</p>
        <Link to="/cars">
          <Button className="mt-4">Browse Cars</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="flex items-center text-gray-600 hover:text-gray-900"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Car Details
        </Button>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Book Your Car
      </h1>
      <p className="text-gray-600 mb-8">
        Fill in the details below to book the {car.name} {car.model}
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Booking Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-6">Booking Details</h2>
            
            <form onSubmit={handleSubmit}>
              {/* Pickup and Drop Locations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <Label htmlFor="pickupLocation">Pickup Location</Label>
                  <div className="relative mt-1">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input 
                      id="pickupLocation"
                      placeholder="Enter pickup location"
                      className="pl-10"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="dropLocation">Drop Location</Label>
                  <div className="relative mt-1">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input 
                      id="dropLocation"
                      placeholder="Enter drop location"
                      className="pl-10"
                      value={dropLocation}
                      onChange={(e) => setDropLocation(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              
              {/* Travel Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <Label htmlFor="travelDate">Travel Date</Label>
                  <div className="relative mt-1">
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input 
                      id="travelDate"
                      type="date"
                      className="pl-10"
                      min={getCurrentDate()}
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="travelTime">Pickup Time</Label>
                  <div className="relative mt-1">
                    <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input 
                      id="travelTime"
                      type="time"
                      className="pl-10"
                      value={travelTime}
                      onChange={(e) => setTravelTime(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mb-4 mt-8">Personal Information</h3>
              
              {/* Personal Information */}
              <div className="space-y-4 mb-6">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input 
                      id="name"
                      placeholder="Enter your full name"
                      className="pl-10"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input 
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative mt-1">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input 
                      id="phone"
                      placeholder="Enter your phone number"
                      className="pl-10"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              
              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full bg-brand-orange hover:bg-brand-orange-600 text-lg py-6"
                disabled={isSubmitting || !distance || !totalAmount}
              >
                {isSubmitting ? 'Processing...' : 'Confirm Booking'}
              </Button>
              
              {/* Warning for non-logged in users */}
              {!isAuthenticated && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md flex items-start space-x-2">
                  <AlertCircle size={20} className="text-yellow-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-yellow-700">
                      You're not logged in. We recommend <Link to="/login" className="font-semibold underline">logging in</Link> or <Link to="/register" className="font-semibold underline">creating an account</Link> to track your bookings easily.
                    </p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
        
        {/* Booking Summary */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Booking Summary</h2>
            
            <div className="flex items-center space-x-4 mb-6">
              <img 
                src={car.images[0]} 
                alt={car.name} 
                className="w-20 h-20 object-cover rounded-md"
              />
              <div>
                <h3 className="font-semibold">{car.name} {car.model}</h3>
                <p className="text-sm text-gray-600">{car.category} • {car.seatingCapacity} Seater</p>
                <p className="text-brand-orange font-medium">{formatCurrency(car.pricePerKm)}/km</p>
              </div>
            </div>
            
            <div className="border-t border-b border-gray-100 py-4 mb-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Rate per kilometer:</span>
                <span>{formatCurrency(car.pricePerKm)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Distance:</span>
                <span>{distance ? `${distance} km` : '--'}</span>
              </div>
              
              <div className="flex justify-between font-semibold">
                <span>Total Amount:</span>
                <span>{totalAmount ? formatCurrency(totalAmount) : '--'}</span>
              </div>
            </div>
            
            <div className="text-sm text-gray-600 space-y-2 mb-6">
              <div className="flex items-start space-x-2">
                <CreditCard size={16} className="shrink-0 mt-0.5" />
                <span>Payment will be processed securely after booking confirmation.</span>
              </div>
              
              <div className="flex items-start space-x-2">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>Free cancellation up to 24 hours before pickup.</span>
              </div>
            </div>
            
            <div className="border-t border-gray-100 pt-4">
              <h3 className="font-semibold mb-2">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-2">
                Contact our customer support team for assistance.
              </p>
              <div className="text-sm font-medium text-brand-blue-600">
                +91 9811368167, +91 9811705232 | shubhamtourandtravels9@gmail.com, yadavshubham6695@gmail.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
