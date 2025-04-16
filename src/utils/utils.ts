// Format currency (INR)
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

// Format date for display
export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString('en-IN', options);
};

// Format time for display
export const formatTime = (timeString: string): string => {
  // Parse time string (HH:MM)
  const [hours, minutes] = timeString.split(':').map(Number);
  
  // Format with AM/PM
  const period = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
  
  return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

// Generate a random number between min and max
export const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Format phone number as XXX-XXX-XXXX
export const formatPhoneNumber = (phone: string): string => {
  // Remove any non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Check if the input is valid
  if (cleaned.length !== 10) {
    return phone; // Return original if not valid
  }
  
  // Format as XXX-XXX-XXXX
  return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
};

// Get status badge color based on booking status
export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'Confirmed':
      return 'bg-blue-100 text-blue-800';
    case 'Completed':
      return 'bg-green-100 text-green-800';
    case 'Cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Truncate text with ellipsis
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

// Get current date in YYYY-MM-DD format for form inputs
export const getCurrentDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Get tomorrow's date in YYYY-MM-DD format for form inputs
export const getTomorrowDate = (): string => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const day = String(tomorrow.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Calculate distance between two locations
// This is a mock function - in a real app, you'd use Google Maps API
export const calculateDistance = (pickup: string, drop: string): number => {
  // Mock distances for demo purposes
  const mockDistances: Record<string, Record<string, number>> = {
    'Bangalore Airport': {
      'Mysore Palace': 145,
      'Coorg': 265,
      'Electronic City': 55,
      'MG Road': 40
    },
    'Chennai Central': {
      'Pondicherry': 170,
      'Mahabalipuram': 60,
      'T Nagar': 10
    },
    'Mumbai Airport': {
      'Pune': 148,
      'Lonavala': 83,
      'Marine Drive': 25
    }
  };
  
  // If we have data for this route, return it
  if (mockDistances[pickup]?.[drop]) {
    return mockDistances[pickup][drop];
  }
  
  // Otherwise return a random distance between 10 and 300 km
  return getRandomNumber(10, 300);
};
