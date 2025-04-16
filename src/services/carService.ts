
export interface Car {
  id: string;
  name: string;
  model: string;
  year: number;
  category: string;
  seatingCapacity: number;
  fuelType: string;
  transmission: string;
  pricePerKm: number;
  features: string[];
  images: string[];
  rating: number;
  reviews: number;
  isAvailable: boolean;
}

// Sample car data
let cars: Car[] = [
  {
    id: "car-1",
    name: "Force Traveller",
    model: "20 seater",
    year: 2022,
    category: "Minibus",
    seatingCapacity: 20,
    fuelType: "CNG",
    transmission: "Manual",
    pricePerKm: 30,
    isAvailable: true,
    features: ["Air Conditioning", "Power Steering", "Power Windows", "ABS", "Airbags", "4x4", "Touchscreen", "Roof Mounted Speakers"],
    images: [
      "/images/cars/traveller.webp"
    ],
    rating: 4.7,
    reviews: 92
  },
  {
    id: "car-2",
    name: "Toyota Innova",
    model: "Innova Crysta",
    year: 2022,
    category: "Suv",
    seatingCapacity: 7,
    fuelType: "Diesel",
    transmission: "Manual",
    pricePerKm: 25,
    isAvailable: true,
    features: ["Air Conditioning", "Power Steering", "Power Windows", "ABS", "Airbags", "Rear AC", "Music System"],
    images: [
      "/images/cars/crysta.png"
    ],
    rating: 4.7,
    reviews: 95
  },
  {
    id: "car-3",
    name: "Grand vitara",
    model: "Sigma",
    year: 2024,
    category: "SUV",
    seatingCapacity: 5,
    fuelType: "Petrol",
    transmission: "Manual",
    pricePerKm: 17,
    isAvailable: true,
    features: ["Air Conditioning", "Power Steering", "Power Windows", "ABS", "Airbags", "Sunroof", "Navigation", "360 Camera", "Leather Seats"],
    images: [
      "/images/cars/grandvitara.webp"
    ],
    rating: 4.8,
    reviews: 89
  },
  {
    id: "car-4",
    name: "Ertiga",
    model: " VXI",
    year: 2023,
    category: "SUV",
    seatingCapacity: 7,
    fuelType: "CNG",
    transmission: "Manual",
    pricePerKm: 18,
    isAvailable: true,
    features: ["Air Conditioning", "Power Steering", "Power Windows", "ABS", "Airbags", "Sunroof", "Navigation"],
    images: [
      "/images/cars/Ertiga.jpg"
    ],
    rating: 4.4,
    reviews: 105
  },
  {
    id: "car-5",
    name: "Maruti ",
    model: "Swift Dzire",
    year: 2022,
    category: "Economy",
    seatingCapacity: 5,
    fuelType: "Petrol",
    transmission: "Manual",
    pricePerKm: 15,
    isAvailable: true,
    features: ["Air Conditioning", "Power Steering", "Power Windows", "ABS", "Airbags"],
    images: [
      "/images/cars/switdzire.jpg"
    ],
    rating: 4.5,
    reviews: 128
  },
  {
    id: "car-6",
    name: "Honda City",
    model: "City ZX",
    year: 2023,
    category: "Luxury",
    seatingCapacity: 5,
    fuelType: "Petrol",
    transmission: "Manual",
    pricePerKm: 16,
    isAvailable: true,
    features: ["Air Conditioning", "Power Steering", "Power Windows", "ABS", "Airbags", "Sunroof", "Navigation"],
    images: [
      "/images/cars/honda-city4.png"
    ],
    rating: 4.6,
    reviews: 112
  },
  {
    id: "car-7",
    name: "Aura",
    model: "Sx",
    year: 2023,
    category: "Economy",
    seatingCapacity: 5,
    fuelType: "CNG",
    transmission: "Manual",
    pricePerKm: 15,
    isAvailable: true,
    features: ["Air Conditioning", "Power Steering", "Power Windows", "ABS", "Airbags", "Panoramic Sunroof", "Navigation", "360 Camera", "Leather Seats", "Memory Seats", "Ambient Lighting"],
    images: [
      "/images/cars/Aura.png"
    ],
    rating: 4.9,
    reviews: 62
  },
  {
    id: "car-8",
    name: "Ciaz",
    model: "zeta",
    year: 2023,
    category: "Luxury",
    seatingCapacity: 5,
    fuelType: "",
    transmission: "Manual",
    pricePerKm: 16,
    isAvailable: true,
    features: ["Air Conditioning", "Power Steering", "Power Windows", "ABS", "Airbags", "Panoramic Sunroof", "Navigation", "360 Camera", "Leather Seats", "Memory Seats", "Ambient Lighting", "Gesture Control"],
    images: [
      "/images/cars/ciaz.webp"
    ],
    rating: 4.8,
    reviews: 77
  },
  {
    id: "car-9",
    name: "Maruti Suzuki",
    model: "Swift",
    year: 2022,
    category: "Economy",
    seatingCapacity: 5,
    fuelType: "Petrol",
    transmission: "Manual",
    pricePerKm: 15,
    isAvailable: true,
    features: ["Air Conditioning", "Power Steering", "Power Windows", "ABS", "Airbags", "Navigation", "360 Camera", "Leather Seats",  ],
    images: [
      "/images/cars/Swift.jpeg"
    ],
    rating: 4.9,
    reviews: 85
  }
];

// Get all cars
export const getAllCars = async (): Promise<Car[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(cars), 500);
  });
};

// Add a new car
export const addCar = async (newCar: Omit<Car, 'id'>): Promise<Car> => {
  return new Promise((resolve) => {
    const car: Car = {
      ...newCar,
      id: `car-${Date.now()}`, // Generate unique ID
    };
    cars.push(car);
    setTimeout(() => resolve(car), 500);
  });
};

// Update an existing car
export const updateCar = async (id: string, updatedCar: Car): Promise<Car> => {
  return new Promise((resolve, reject) => {
    const index = cars.findIndex(car => car.id === id);
    if (index === -1) {
      reject(new Error('Car not found'));
      return;
    }
    cars[index] = { ...updatedCar };
    setTimeout(() => resolve(cars[index]), 500);
  });
};

// Delete a car
export const deleteCar = async (id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const index = cars.findIndex(car => car.id === id);
    if (index === -1) {
      reject(new Error('Car not found'));
      return;
    }
    cars = cars.filter(car => car.id !== id);
    setTimeout(resolve, 500);
  });
};

// Get car by ID
export const getCarById = async (id: string): Promise<Car | undefined> => {
  return new Promise((resolve) => {
    const car = cars.find(car => car.id === id);
    setTimeout(() => resolve(car), 500);
  });
};

// Filter cars based on criteria
export const filterCars = async (filters: {
  category?: string;
  seatingCapacity?: number;
  fuelType?: string;
  transmission?: string;
  priceRange?: { min: number; max: number };
}): Promise<Car[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredCars = [...cars];

      if (filters.category) {
        filteredCars = filteredCars.filter(car => car.category === filters.category);
      }
      if (filters.seatingCapacity) {
        filteredCars = filteredCars.filter(car => car.seatingCapacity === filters.seatingCapacity);
      }
      if (filters.fuelType) {
        filteredCars = filteredCars.filter(car => car.fuelType === filters.fuelType);
      }
      if (filters.transmission) {
        filteredCars = filteredCars.filter(car => car.transmission === filters.transmission);
      }
      if (filters.priceRange) {
        filteredCars = filteredCars.filter(car => 
          car.pricePerKm >= filters.priceRange!.min && 
          car.pricePerKm <= filters.priceRange!.max
        );
      }

      resolve(filteredCars);
    }, 800);
  });
};
