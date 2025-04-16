import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Calendar,
  Clock,
  MapPin,
  Star,
  Shield,
  Check,
  Users,
  Fuel,
  Gauge,
  Car as CarIcon 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getCarById } from '@/services/carService';
import type { Car } from '@/services/carService';

interface CarDetailPageProps {}

const CarDetailPage: React.FC<CarDetailPageProps> = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bookingDate, setBookingDate] = useState<string>('');
  const [bookingTime, setBookingTime] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    const fetchCar = async () => {
      if (!id) {
        toast({
          title: "Error",
          description: "Car ID is missing.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const carData = await getCarById(id);
        if (carData) {
          setCar(carData);
        } else {
          toast({
            title: "Error",
            description: "Car not found.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching car:", error);
        toast({
          title: "Error",
          description: "Failed to load car details.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCar();
  }, [id, toast]);

  const handleBooking = () => {
    if (!car) {
      toast({
        title: "Error",
        description: "Car details not loaded yet.",
        variant: "destructive",
      });
      return;
    }

    if (!bookingDate || !bookingTime) {
      toast({
        title: "Missing Information",
        description: "Please select both date and time for booking.",
        variant: "destructive",
      });
      return;
    }

    try {
      const selectedDateTime = new Date(`${bookingDate}T${bookingTime}`);
      if (isNaN(selectedDateTime.getTime())) {
        throw new Error('Invalid date/time');
      }

      // Use react-router navigate instead of window.location
      navigate(`/booking/${car.id}?date=${selectedDateTime.toISOString()}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid date or time selected.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Car not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Car Image and Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={car.images?.[0] || '/images/default-car.jpg'}
            alt={car.name}
            className="w-full rounded-lg shadow-md"
            onError={(e) => {
              e.currentTarget.src = '/images/default-car.jpg';
              e.currentTarget.alt = 'Default Car Image';
            }}
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{car.name}</h1>
          <p className="text-gray-600 mb-4">{car.model} ({car.year})</p>

          {/* Features Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {car.features?.map((feature, index) => (
              <Badge key={index}>{feature}</Badge>
            ))}
          </div>

          {/* Car Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <span className="flex items-center text-gray-700">
                <CarIcon size={16} className="mr-2" />
                Category: {car.category}
              </span>
            </div>
            <div>
              <span className="flex items-center text-gray-700">
                <Users size={16} className="mr-2" />
                Seats: {car.seatingCapacity}
              </span>
            </div>
            <div>
              <span className="flex items-center text-gray-700">
                <Fuel size={16} className="mr-2" />
                Fuel Type: {car.fuelType}
              </span>
            </div>
            <div>
              <span className="flex items-center text-gray-700">
                <Gauge size={16} className="mr-2" />
                Transmission: {car.transmission}
              </span>
            </div>
            <div>
              <span className="flex items-center text-gray-700">
                <Star size={16} className="mr-2" />
                Rating: {car.rating} ({car.reviews} reviews)
              </span>
            </div>
            <div>
              <span className="flex items-center text-gray-700">
                <Shield size={16} className="mr-2" />
                Price: ₹{car.pricePerKm}/km
              </span>
            </div>
          </div>

          {/* Booking Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">Book this car</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="booking-date" className="block text-sm font-medium text-gray-700">
                  Select Date
                </Label>
                <Input
                  type="date"
                  id="booking-date"
                  min={new Date().toISOString().split('T')[0]}
                  className="mt-1 p-2 w-full border rounded-md"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="booking-time" className="block text-sm font-medium text-gray-700">
                  Select Time
                </Label>
                <Input
                  type="time"
                  id="booking-time"
                  className="mt-1 p-2 w-full border rounded-md"
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                />
              </div>
            </div>
            <Button 
              variant="default"
              className="mt-4 w-full bg-[#1e3a8a] hover:bg-[#1e4620] text-white font-semibold py-2 px-4 rounded transition-colors duration-200" 
              onClick={handleBooking}
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>

      {/* Car Details Tabs */}
      <Tabs defaultValue="overview" className="w-full mt-8">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Car Overview</h3>
          <p className="text-gray-700">
            The {car.name} is a {car.category} known for its reliability and comfort.
            It offers a smooth driving experience and is perfect for city commutes and
            long trips alike.
          </p>
        </TabsContent>
        <TabsContent value="details" className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Detailed Specifications</h3>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Model: {car.model}</li>
            <li>Year: {car.year}</li>
            <li>Seating Capacity: {car.seatingCapacity}</li>
            <li>Fuel Type: {car.fuelType}</li>
            <li>Transmission: {car.transmission}</li>
            <li>Price per km: ₹{car.pricePerKm}</li>
          </ul>
        </TabsContent>
        <TabsContent value="reviews" className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Customer Reviews</h3>
          <p className="text-gray-700">
            No reviews yet. Be the first to review this car!
          </p>
        </TabsContent>
      </Tabs>

      {/* Back to Cars */}
      <div className="mt-8">
        <Link to="/cars" className="text-brand-blue-600 hover:text-brand-blue-700 font-semibold">
          <Check size={16} className="inline-block mr-1" /> Back to Cars
        </Link>
      </div>
    </div>
  );
};

export default CarDetailPage;
