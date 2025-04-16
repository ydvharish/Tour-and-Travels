import { useToast } from "@/hooks/use-toast";
import { sendBookingNotification } from "@/services/emailService";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface BookingFormProps {
  car: {
    name: string;
  };
}

const BookingForm: React.FC<BookingFormProps> = ({ car }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    contactNumber: '',
    bookingDate: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Send email notification
      await sendBookingNotification({
        carName: car.name,
        customerName: formData.customerName,
        bookingDate: formData.bookingDate,
        customerEmail: formData.customerEmail,
        contactNumber: formData.contactNumber
      });

      toast({
        title: "Booking Successful",
        description: "You will receive a confirmation email shortly.",
      });
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Customer Name"
        value={formData.customerName}
        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
      />
      <input
        type="email"
        placeholder="Customer Email"
        value={formData.customerEmail}
        onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
      />
      <input
        type="text"
        placeholder="Contact Number"
        value={formData.contactNumber}
        onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
      />
      <input
        type="date"
        placeholder="Booking Date"
        value={formData.bookingDate}
        onChange={(e) => setFormData({ ...formData, bookingDate: e.target.value })}
      />
      <Button 
        type="submit"
        variant="default"
        className="w-full bg-[#1e3a8a] hover:bg-[#1e4620] text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
      >
        Book Now
      </Button>
    </form>
  );
};

export default BookingForm;
