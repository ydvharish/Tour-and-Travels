import { toast } from 'sonner';
import { Car } from './carService';
import emailjs from '@emailjs/browser';

export interface Booking {
  id: string;
  carId: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  pickupLocation: string;
  dropLocation: string;
  travelDate: string;
  travelTime: string;
  distance: number;
  totalAmount: number;
  paymentMethod: 'UPI' | 'Credit Card' | 'Debit Card' | 'Net Banking';
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
  car?: Car;
}

// Sample booking data
let bookings: Booking[] = [
  {
    id: "booking-1",
    carId: "car-1",
    userId: "2",
    userName: "Shubham Yadav",
    userEmail: "shubhamtourandtravels9@gmail.com",
    userPhone: "9876543210",
    pickupLocation: "Bangalore Airport",
    dropLocation: "Mysore Palace",
    travelDate: "2023-12-15",
    travelTime: "09:00",
    distance: 145,
    totalAmount: 1740,
    paymentMethod: "UPI",
    status: "Confirmed",
    createdAt: "2023-12-01T10:30:00Z"
  },
  {
    id: "booking-2",
    carId: "car-3",
    userId: "2",
    userName: "John Doe",
    userEmail: "yadavshubham6695@gmail.com",
    userPhone: "9876543210",
    pickupLocation: "Chennai Central",
    dropLocation: "Pondicherry",
    travelDate: "2023-12-20",
    travelTime: "11:00",
    distance: 170,
    totalAmount: 2380,
    paymentMethod: "Credit Card",
    status: "Pending",
    createdAt: "2023-12-05T14:20:00Z"
  }
];

// Add email service function
const sendBookingEmails = async (bookingData: any) => {
  // Log the data to verify
  console.log('Sending email with car data:', bookingData.car);

  const customerEmailContent = `
    Booking Confirmation:
    Dear ${bookingData.userName},

    Thank you for choosing our service. Your booking has been confirmed with the following details:

    Car Details:
    Car Name: ${bookingData.car.name}
    Model: ${bookingData.car.model}
    Category: ${bookingData.car.category}
    Seating: ${bookingData.car.seatingCapacity} Seater
    Fuel Type: ${bookingData.car.fuelType}

    Journey Details:
    Pickup: ${bookingData.pickupLocation}
    Drop: ${bookingData.dropLocation}
    Date: ${bookingData.travelDate}
    Time: ${bookingData.travelTime}
    Distance: ${bookingData.distance} km
    Amount: ₹${bookingData.totalAmount}

    Your Contact Details:
    Name: ${bookingData.userName}
    Phone: ${bookingData.userPhone}
    Email: ${bookingData.userEmail}

    For assistance contact:
    +91 9811368167, +91 9811705232
    shubhamtourandtravels9@gmail.com
  `;

  try {
    // Send email with direct car object properties
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        to_email: bookingData.userEmail,
        booking_details: customerEmailContent,
        customer_name: bookingData.userName,
        customer_phone: bookingData.userPhone,
        car_name: bookingData.car.name,
        car_model: bookingData.car.model,
        car_category: bookingData.car.category,
        car_capacity: bookingData.car.seatingCapacity,
        car_fuel: bookingData.car.fuelType,
        pickup_location: bookingData.pickupLocation,
        drop_location: bookingData.dropLocation,
        travel_date: bookingData.travelDate,
        travel_time: bookingData.travelTime,
        distance: bookingData.distance,
        total_amount: bookingData.totalAmount
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );
  } catch (error) {
    console.error('Error sending email:', error);
    toast.error('Failed to send booking confirmation email');
  }
};

// Create a new booking
export const createBooking = async (bookingData: Omit<Booking, 'id' | 'status' | 'createdAt'>): Promise<Booking> => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      // Make sure car details are included
      const newBooking: Booking = {
        ...bookingData,
        id: `booking-${bookings.length + 1}`,
        status: 'Pending',
        createdAt: new Date().toISOString(),
        car: bookingData.car // Ensure this is passed from the booking form
      };
      
      bookings.push(newBooking);
      
      // Log booking data before sending email
      console.log('New Booking Data:', {
        bookingId: newBooking.id,
        carDetails: newBooking.car
      });
      
      // Send confirmation emails with complete car data
      await sendBookingEmails(newBooking);
      
      toast.success('Booking created successfully');
      resolve(newBooking);
    }, 1500);
  });
};

// Get all bookings (admin)
export const getAllBookings = async (): Promise<Booking[]> => {
  // Simulating API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(bookings);
    }, 1000);
  });
};

// Get user bookings
export const getUserBookings = async (userId: string): Promise<Booking[]> => {
  // Simulating API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const userBookings = bookings.filter(booking => booking.userId === userId);
      resolve(userBookings);
    }, 1000);
  });
};

// Get booking by ID
export const getBookingById = async (id: string): Promise<Booking | undefined> => {
  // Simulating API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const booking = bookings.find(booking => booking.id === id);
      resolve(booking);
    }, 500);
  });
};

// Update booking status
export const updateBookingStatus = async (id: string, status: Booking['status']): Promise<Booking | undefined> => {
  // Simulating API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = bookings.findIndex(booking => booking.id === id);
      
      if (index !== -1) {
        bookings[index] = { ...bookings[index], status };
        toast.success(`Booking ${status.toLowerCase()} successfully`);
        resolve(bookings[index]);
      } else {
        toast.error('Booking not found');
        resolve(undefined);
      }
    }, 1000);
  });
};

// Cancel booking (user)
export const cancelBooking = async (id: string): Promise<boolean> => {
  // Simulating API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = bookings.findIndex(booking => booking.id === id);
      
      if (index !== -1) {
        bookings[index].status = 'Cancelled';
        toast.success('Booking cancelled successfully');
        resolve(true);
      } else {
        toast.error('Booking not found');
        resolve(false);
      }
    }, 1000);
  });
};

// Calculate estimated cost
export const calculateEstimatedCost = (distance: number, pricePerKm: number): number => {
  return Math.round(distance * pricePerKm);
};
