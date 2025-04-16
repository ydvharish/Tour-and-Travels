import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAllCars, filterCars } from '@/services/carService';
import type { Car } from '@/services/carService';
import CarCard from '@/components/CarCard';
import CarFilter from '@/components/CarFilter';

const CarsPage = () => {
  const [searchParams] = useSearchParams();
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get initial filters from URL parameters
  const getInitialFilters = () => {
    const location = searchParams.get('location');
    const date = searchParams.get('date');
    const seatingCapacity = searchParams.get('seatingCapacity');

    return {
      ...(seatingCapacity && { seatingCapacity: parseInt(seatingCapacity) })
    };
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setIsLoading(true);
        const initialFilters = getInitialFilters();
        
        if (Object.keys(initialFilters).length > 0) {
          const filteredCars = await filterCars(initialFilters);
          setCars(filteredCars);
        } else {
          const carsData = await getAllCars();
          setCars(carsData);
        }
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, [searchParams]);

  const handleFilter = async (filters: any) => {
    try {
      setIsLoading(true);
      const filteredCars = await filterCars(filters);
      setCars(filteredCars);
    } catch (error) {
      console.error('Error filtering cars:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Our Cars</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filter sidebar */}
        <div className="md:col-span-1 order-1">
          <CarFilter 
            onFilter={handleFilter}
            initialFilters={getInitialFilters()}
          />
        </div>

        {/* Car listings */}
        <div className="md:col-span-3 order-2">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange"></div>
            </div>
          ) : cars.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-600">No cars found</h2>
              <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarsPage;
