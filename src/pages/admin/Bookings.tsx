
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
import { Check, X, Eye, ArrowUpDown } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Sample booking data
const sampleBookings = [
  {
    id: "booking-1",
    customer: {
      name: "John Doe",
      email: "john@example.com",
      phone: "9876543210"
    },
    car: {
      id: 1,
      name: "Honda City",
      model: "2022"
    },
    pickup: "Mumbai Airport",
    dropoff: "Pune City Center",
    date: "2023-12-10",
    time: "10:30",
    status: "confirmed" as const,
    amount: 1740,
    paymentStatus: "paid" as const,
    createdAt: "2023-12-05"
  },
  {
    id: "booking-2",
    customer: {
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "8765432109"
    },
    car: {
      id: 2,
      name: "Maruti Swift",
      model: "2021"
    },
    pickup: "Delhi Railway Station",
    dropoff: "Agra Taj Mahal",
    date: "2023-12-15",
    time: "09:00",
    status: "pending" as const,
    amount: 2380,
    paymentStatus: "pending" as const,
    createdAt: "2023-12-07"
  },
  {
    id: "booking-3",
    customer: {
      name: "Robert Johnson",
      email: "robert@example.com",
      phone: "7654321098"
    },
    car: {
      id: 3,
      name: "Toyota Innova",
      model: "2023"
    },
    pickup: "Bangalore Airport",
    dropoff: "Mysore Palace",
    date: "2023-12-20",
    time: "11:00",
    status: "completed" as const,
    amount: 3450,
    paymentStatus: "paid" as const,
    createdAt: "2023-12-01"
  },
];

// Types
interface Customer {
  name: string;
  email: string;
  phone: string;
}

interface BookingCar {
  id: number;
  name: string;
  model: string;
}

interface Booking {
  id: string;
  customer: Customer;
  car: BookingCar;
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  amount: number;
  paymentStatus: 'paid' | 'pending' | 'failed';
  createdAt: string;
}

const AdminBookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>(sampleBookings);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>(sampleBookings);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [paymentFilter, setPaymentFilter] = useState<string>("all");
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  const { toast } = useToast();

  // View booking details
  const viewBookingDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setOpenDetailDialog(true);
  };

  // Update booking status
  const updateBookingStatus = (id: string, newStatus: 'confirmed' | 'pending' | 'cancelled' | 'completed') => {
    const updatedBookings = bookings.map(booking => 
      booking.id === id ? { ...booking, status: newStatus } : booking
    );
    
    setBookings(updatedBookings);
    applyFilters(updatedBookings);
    
    toast({
      title: "Status Updated",
      description: `Booking #${id} status changed to ${newStatus}.`,
    });
  };

  // Apply filters
  const applyFilters = (bookingsToFilter = bookings) => {
    let filtered = [...bookingsToFilter];
    
    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }
    
    // Apply payment filter
    if (paymentFilter !== "all") {
      filtered = filtered.filter(booking => booking.paymentStatus === paymentFilter);
    }
    
    // Sort by date
    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });
    
    setFilteredBookings(filtered);
  };

  // Handle filter changes
  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    applyFilters(bookings);
  };

  const handlePaymentFilterChange = (value: string) => {
    setPaymentFilter(value);
    applyFilters(bookings);
  };

  // Toggle sort direction
  const toggleSortDirection = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newDirection);
    applyFilters(bookings);
  };

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Manage Bookings</h1>
      
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <Label htmlFor="status-filter">Booking Status:</Label>
              <Select 
                value={statusFilter} 
                onValueChange={handleStatusFilterChange}
              >
                <SelectTrigger id="status-filter" className="w-[160px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Label htmlFor="payment-filter">Payment Status:</Label>
              <Select 
                value={paymentFilter} 
                onValueChange={handlePaymentFilterChange}
              >
                <SelectTrigger id="payment-filter" className="w-[160px]">
                  <SelectValue placeholder="Filter by payment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Payments</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={toggleSortDirection}
            className="flex items-center gap-2"
          >
            <span>Sort by Date</span>
            <ArrowUpDown size={16} />
            <span className="text-xs">({sortDirection === 'asc' ? 'Oldest' : 'Newest'} first)</span>
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>All Bookings ({filteredBookings.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredBookings.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Car</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{booking.customer.name}</p>
                        <p className="text-sm text-gray-500">{booking.customer.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>{`${booking.car.name} (${booking.car.model})`}</TableCell>
                    <TableCell>
                      <div>
                        <p>{booking.date}</p>
                        <p className="text-sm text-gray-500">{booking.time}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p>₹{booking.amount}</p>
                        <Badge 
                          variant={
                            booking.paymentStatus === 'paid' 
                              ? 'default' 
                              : booking.paymentStatus === 'pending' 
                                ? 'outline' 
                                : 'destructive'
                          }
                          className="text-xs mt-1"
                        >
                          {booking.paymentStatus}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={`
                          ${booking.status === 'confirmed' ? 'bg-blue-100 text-blue-800 border-blue-300' : ''}
                          ${booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' : ''}
                          ${booking.status === 'cancelled' ? 'bg-red-100 text-red-800 border-red-300' : ''}
                          ${booking.status === 'completed' ? 'bg-green-100 text-green-800 border-green-300' : ''}
                        `}
                      >
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => viewBookingDetails(booking)}
                        >
                          <Eye size={16} className="text-blue-600" />
                        </Button>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">Update Status</Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem 
                              onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                              disabled={booking.status === 'confirmed'}
                            >
                              <Check size={16} className="mr-2 text-green-600" />
                              <span>Confirm</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => updateBookingStatus(booking.id, 'completed')}
                              disabled={booking.status === 'completed'}
                            >
                              <Check size={16} className="mr-2 text-blue-600" />
                              <span>Mark as Completed</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                              disabled={booking.status === 'cancelled'}
                              className="text-red-600"
                            >
                              <X size={16} className="mr-2" />
                              <span>Cancel Booking</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No bookings found matching your filters.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setStatusFilter('all');
                  setPaymentFilter('all');
                  applyFilters();
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Booking Detail Dialog */}
      {selectedBooking && (
        <Dialog open={openDetailDialog} onOpenChange={setOpenDetailDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Booking Details</DialogTitle>
              <DialogDescription>
                Complete information about this booking.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Booking Information</h3>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <p className="text-sm text-gray-500">Booking ID</p>
                    <p className="font-medium">{selectedBooking.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Created On</p>
                    <p className="font-medium">{formatDate(selectedBooking.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <Badge 
                      variant="outline"
                      className={`
                        ${selectedBooking.status === 'confirmed' ? 'bg-blue-100 text-blue-800 border-blue-300' : ''}
                        ${selectedBooking.status === 'pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' : ''}
                        ${selectedBooking.status === 'cancelled' ? 'bg-red-100 text-red-800 border-red-300' : ''}
                        ${selectedBooking.status === 'completed' ? 'bg-green-100 text-green-800 border-green-300' : ''}
                      `}
                    >
                      {selectedBooking.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Payment</p>
                    <Badge 
                      variant={
                        selectedBooking.paymentStatus === 'paid' 
                          ? 'default' 
                          : selectedBooking.paymentStatus === 'pending' 
                            ? 'outline' 
                            : 'destructive'
                      }
                    >
                      {selectedBooking.paymentStatus}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Customer Details</h3>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{selectedBooking.customer.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{selectedBooking.customer.phone}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{selectedBooking.customer.email}</p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Trip Details</h3>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <p className="text-sm text-gray-500">Car</p>
                    <p className="font-medium">{`${selectedBooking.car.name} (${selectedBooking.car.model})`}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Amount</p>
                    <p className="font-medium">₹{selectedBooking.amount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{selectedBooking.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="font-medium">{selectedBooking.time}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500">Pickup Location</p>
                    <p className="font-medium">{selectedBooking.pickup}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500">Drop-off Location</p>
                    <p className="font-medium">{selectedBooking.dropoff}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between mt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setOpenDetailDialog(false)}
                >
                  Close
                </Button>
                
                {selectedBooking.status !== 'cancelled' && selectedBooking.status !== 'completed' && (
                  <div className="space-x-2">
                    <Button 
                      variant="outline" 
                      className="border-green-500 text-green-600 hover:bg-green-50"
                      onClick={() => {
                        updateBookingStatus(selectedBooking.id, 'completed');
                        setOpenDetailDialog(false);
                      }}
                    >
                      Mark Completed
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-red-500 text-red-600 hover:bg-red-50"
                      onClick={() => {
                        updateBookingStatus(selectedBooking.id, 'cancelled');
                        setOpenDetailDialog(false);
                      }}
                    >
                      Cancel Booking
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdminBookingsPage;
