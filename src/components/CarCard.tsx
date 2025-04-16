import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import type { Car } from '@/services/carService';
import { Car as CarIcon, Users, Fuel, Calendar } from 'lucide-react';

interface CarCardProps {
  car: Car;
}

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white/50 backdrop-blur-sm">
      <CardContent className="p-0">
        <div className="relative">
          {/* Price Badge */}
          <div className="absolute top-4 right-4 z-10">
            <Badge 
              className="bg-gradient-to-r from-orange-500 to-orange-300 text-white px-4 py-1.5 
                       shadow-lg backdrop-blur-sm rounded-full text-sm font-semibold
                       transform transition-transform duration-300 group-hover:scale-105"
            >
              ₹{car.pricePerKm}/km
            </Badge>
          </div>

          {/* Car Image with overlay gradient */}
          <div className="relative h-56 overflow-hidden">
            <img
              src={car.images[0]}
              alt={car.name}
              className="w-full h-full object-cover transition-transform 
                       duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
          </div>

          {/* Car Details */}
          <div className="p-6 space-y-4">
            <div>
              <h3 className="font-bold text-xl text-gray-800">{car.name}</h3>
              <p className="text-gray-600 font-medium">{car.model}</p>
            </div>

            {/* Car Features */}
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-100">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-orange-500" />
                <span className="text-sm text-gray-600">{car.seatingCapacity} Seats</span>
              </div>
              <div className="flex items-center gap-2">
                <Fuel className="w-5 h-5 text-orange-500" />
                <span className="text-sm text-gray-600">{car.fuelType}</span>
              </div>
              <div className="flex items-center gap-2">
                <CarIcon className="w-5 h-5 text-orange-500" />
                <span className="text-sm text-gray-600">{car.transmission}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-orange-500" />
                <span className="text-sm text-gray-600">{car.year}</span>
              </div>
            </div>

            {/* Action Button */}
            <Button 
              asChild 
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 
                       hover:to-orange-700 text-white font-semibold py-6 rounded-lg
                       transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            >
              <Link to={`/cars/${car.id}`} onClick={handleClick}>View Details</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarCard;
