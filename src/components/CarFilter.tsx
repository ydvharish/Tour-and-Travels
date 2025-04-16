import React, { useState, useEffect } from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

interface FilterProps {
  onFilter: (filters: {
    category?: string;
    seatingCapacity?: number;
    fuelType?: string;
    transmission?: string;
    priceRange?: { min: number; max: number };
  }) => void;
  initialFilters?: {
    category?: string;
    seatingCapacity?: number;
    fuelType?: string;
    transmission?: string;
    priceRange?: { min: number; max: number };
  };
}

const CarFilter: React.FC<FilterProps> = ({ onFilter, initialFilters }) => {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [category, setCategory] = useState<string>(initialFilters?.category || '');
  const [seatingCapacity, setSeatingCapacity] = useState<number | undefined>(initialFilters?.seatingCapacity);
  const [fuelType, setFuelType] = useState<string>(initialFilters?.fuelType || '');
  const [transmission, setTransmission] = useState<string>(initialFilters?.transmission || '');
  const [priceRange, setPriceRange] = useState<[number]>([initialFilters?.priceRange?.max || 25]);

  // Apply initial filters on mount
  useEffect(() => {
    if (initialFilters && Object.keys(initialFilters).length > 0) {
      handleApplyFilters();
    }
  }, []);

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  const handleApplyFilters = () => {
    onFilter({
      category: category || undefined,
      seatingCapacity: seatingCapacity,
      fuelType: fuelType || undefined,
      transmission: transmission || undefined,
      priceRange: { min: 0, max: priceRange[0] },
    });

    if (window.innerWidth < 768) {
      setFiltersVisible(false);
    }
  };

  const handleResetFilters = () => {
    setCategory('');
    setSeatingCapacity(undefined);
    setFuelType('');
    setTransmission('');
    setPriceRange([25]);

    onFilter({});
  };

  return (
    <div className="bg-white rounded-lg shadow-md mb-6">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold">Filter Cars</h3>
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={toggleFilters}
        >
          {filtersVisible ? <X className="h-4 w-4" /> : <Filter className="h-4 w-4" />}
        </Button>
      </div>

      <div className={`p-4 space-y-6 ${filtersVisible ? 'block' : 'hidden md:block'}`}>
        {/* Car Category */}
        <div>
          <h4 className="font-medium mb-3">Car Category</h4>
          <RadioGroup value={category} onValueChange={setCategory}>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Economy" id="economy" />
                <Label htmlFor="economy">Economy</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="SUV" id="suv" />
                <Label htmlFor="suv">SUV</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Luxury" id="luxury" />
                <Label htmlFor="luxury">Luxury</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Minibus" id="minibus" />
                <Label htmlFor="minibus">Minibus</Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        {/* Seating Capacity */}
        <div>
          <h4 className="font-medium mb-3">Seating Capacity</h4>
          <RadioGroup 
            value={seatingCapacity?.toString() || ''} 
            onValueChange={(value) => setSeatingCapacity(value ? parseInt(value) : undefined)}
          >
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="5" id="5-seater" />
                <Label htmlFor="5-seater">5 Seater</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="7" id="7-seater" />
                <Label htmlFor="7-seater">7 Seater</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="20" id="20-seater" />
                <Label htmlFor="20-seater">20 Seater</Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        {/* Fuel Type */}
        <div>
          <h4 className="font-medium mb-3">Fuel Type</h4>
          <RadioGroup value={fuelType} onValueChange={setFuelType}>
            <div className="space-y-2">
              <div className="flex items-center">
                <RadioGroupItem value="Petrol" id="petrol" />
                <Label htmlFor="petrol">Petrol</Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem value="Diesel" id="diesel" />
                <Label htmlFor="diesel">Diesel</Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem value="CNG" id="cng" />
                <Label htmlFor="cng">CNG</Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        {/* Transmission */}
        <div>
          <h4 className="font-medium mb-3">Transmission</h4>
          <RadioGroup value={transmission} onValueChange={setTransmission}>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Manual" id="manual" />
                <Label htmlFor="manual">Manual</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Automatic" id="automatic" />
                <Label htmlFor="automatic">Automatic</Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        {/* Price Range */}
        <div>
          <div className="flex justify-between mb-3">
            <h4 className="font-medium">Price Range</h4>
            <span className="text-sm">₹0 - ₹{priceRange[0]}/km</span>
          </div>
          <Slider
            value={priceRange}
            max={50}
            step={1}
            onValueChange={(value: number[]) => setPriceRange(value as [number])}
          />
        </div>

        {/* Filter Actions */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Button
            className="bg-blue-600 text-white hover:bg-blue-700 sm:flex-1"
            onClick={handleApplyFilters}
          >
            Apply Filters
          </Button>
          <Button
            variant="outline"
            className="sm:flex-1"
            onClick={handleResetFilters}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CarFilter;