
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Car as CarIcon, AlertCircle, Clock, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { getUserBookings, cancelBooking } from '@/services/bookingService';
import { getCarById } from '@/services/carService';
import { Booking } from '@/services/bookingService';
import { Car } from '@/services/carService';
import { formatCurrency, formatDate, formatTime, getStatusColor } from '@/utils/utils';

const BookingsPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bookingWithCarDetails, setBookingWithCarDetails] = useState<(Booking & { car?: Car })[]>([]);
  
  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;
      
      try {
        const userBookings = await getUserBookings(user.id);
        setBookings(userBookings);
        
        // Fetch car details for each booking
        const bookingsWithCars = await Promise.all(
          userBookings.map(async (booking) => {
            const car = await getCarById(booking.carId);
            return { ...booking, car };
          })
        );
        
        setBookingWithCarDetails(bookingsWithCars);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        toast({
          title: "Error",
          description: "Failed to load your bookings",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [user, toast]);

  const handleCancelBooking = async (id: string) => {
    try {
      await cancelBooking(id);
      
      // Update local state after cancellation
      setBookingWithCarDetails(prevBookings => 
        prevBookings.map(booking => 
          booking.id === id 
            ? { ...booking, status: 'Cancelled' as const } 
            : booking
        )
      );
    } catch (error) {
      console.error('Error cancelling booking:', error);
      toast({
        title: "Error",
        description: "Failed to cancel booking",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="spinner mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading your bookings...</p>
      </div>
    );
  }

  const getFilteredBookings = (status: string | null) => {
    if (!status) return bookingWithCarDetails;
    return bookingWithCarDetails.filter(booking => booking.status === status);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      
      {bookingWithCarDetails.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar size={24} className="text-gray-500" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No Bookings Found</h2>
          <p className="text-gray-600 mb-6">
            You haven't made any bookings yet. Browse our car collection and book your first trip!
          </p>
          <Link to="/cars">
            <Button className="bg-brand-blue-600 hover:bg-brand-blue-700">
              Browse Cars
            </Button>
          </Link>
        </div>
      ) : (
        <Tabs defaultValue="all">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <BookingList 
              bookings={getFilteredBookings(null)} 
              onCancelBooking={handleCancelBooking} 
            />
          </TabsContent>
          
          <TabsContent value="confirmed">
            <BookingList 
              bookings={getFilteredBookings('Confirmed')} 
              onCancelBooking={handleCancelBooking} 
            />
          </TabsContent>
          
          <TabsContent value="completed">
            <BookingList 
              bookings={getFilteredBookings('Completed')} 
              onCancelBooking={handleCancelBooking} 
            />
          </TabsContent>
          
          <TabsContent value="cancelled">
            <BookingList 
              bookings={getFilteredBookings('Cancelled')} 
              onCancelBooking={handleCancelBooking} 
            />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

interface BookingListProps {
  bookings: (Booking & { car?: Car })[];
  onCancelBooking: (id: string) => void;
}

const BookingList: React.FC<BookingListProps> = ({ bookings, onCancelBooking }) => {
  const [expandedBookingId, setExpandedBookingId] = useState<string | null>(null);
  
  const toggleExpand = (id: string) => {
    setExpandedBookingId(expandedBookingId === id ? null : id);
  };
  
  if (bookings.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-600">No bookings found in this category</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {bookings.map(booking => (
        <div 
          key={booking.id} 
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          {/* Booking Header */}
          <div 
            className="p-4 border-b cursor-pointer"
            onClick={() => toggleExpand(booking.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-4">
                  {booking.car && (
                    <img 
                      src={booking.car.images[0]} 
                      alt={booking.car.name} 
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">
                    {booking.car ? `${booking.car.name} ${booking.car.model}` : 'Car Information Unavailable'}
                  </h3>
                  <div className="text-sm flex items-center text-gray-600">
                    <Calendar size={14} className="mr-1" />
                    <span>{formatDate(booking.travelDate)}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </span>
                <div className="text-sm font-semibold mt-1">
                  {formatCurrency(booking.totalAmount)}
                </div>
              </div>
            </div>
          </div>
          
          {/* Expanded Details */}
          {expandedBookingId === booking.id && (
            <div className="p-4 bg-gray-50 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2">Trip Details</h4>
                  <div className="space-y-2">
                    <div className="flex items-start text-sm">
                      <MapPin size={16} className="mr-2 shrink-0 mt-0.5 text-brand-blue-600" />
                      <div>
                        <div className="font-medium">Pickup Location</div>
                        <div className="text-gray-600">{booking.pickupLocation}</div>
                      </div>
                    </div>
                    <div className="flex items-start text-sm">
                      <MapPin size={16} className="mr-2 shrink-0 mt-0.5 text-brand-orange" />
                      <div>
                        <div className="font-medium">Drop Location</div>
                        <div className="text-gray-600">{booking.dropLocation}</div>
                      </div>
                    </div>
                    <div className="flex items-start text-sm">
                      <Clock size={16} className="mr-2 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">Pickup Time</div>
                        <div className="text-gray-600">{formatTime(booking.travelTime)}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold mb-2">Booking Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-start text-sm">
                      <CarIcon size={16} className="mr-2 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">Distance</div>
                        <div className="text-gray-600">{booking.distance} km</div>
                      </div>
                    </div>
                    <div className="flex items-start text-sm">
                      <AlertCircle size={16} className="mr-2 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">Booking ID</div>
                        <div className="text-gray-600">{booking.id}</div>
                      </div>
                    </div>
                    <div className="flex items-start text-sm">
                      <Calendar size={16} className="mr-2 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">Booking Date</div>
                        <div className="text-gray-600">{formatDate(booking.createdAt)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {booking.status === 'Confirmed' && (
                <Button 
                  variant="outline" 
                  className="text-red-600 border-red-200 hover:bg-red-50 flex items-center gap-2"
                  onClick={() => onCancelBooking(booking.id)}
                >
                  <XCircle size={16} />
                  <span>Cancel Booking</span>
                </Button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BookingsPage;
