import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Pencil, 
  Trash, 
  Plus, 
  Car, 
  Users, 
  Fuel 
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { getAllCars, updateCar, deleteCar, addCar } from '@/services/carService';
import type { Car as CarType } from '@/services/carService';

const AdminCarsPage: React.FC = () => {
  const [cars, setCars] = useState<CarType[]>([]);
  const [loading, setLoading] = useState(true);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedCar, setSelectedCar] = useState<CarType | null>(null);
  const [newCar, setNewCar] = useState<Partial<CarType>>({
    name: '',
    model: '',
    year: new Date().getFullYear(),
    category: 'Economy',
    seatingCapacity: 5,
    fuelType: 'Petrol',
    transmission: 'Manual',
    pricePerKm: 10,
    features: [],
    images: [],
    rating: 0,
    reviews: 0,
    isAvailable: true,
  });
  
  const { toast } = useToast();

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const data = await getAllCars();
      setCars(data);
    } catch (error) {
      console.error('Error fetching cars:', error);
      toast({
        title: "Error",
        description: "Failed to load cars. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddCar = async () => {
    if (!newCar.name || !newCar.model) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      await addCar(newCar as Omit<CarType, 'id'>);
      fetchCars();
      setOpenAddDialog(false);
      resetNewCar();
    } catch (error) {
      console.error('Error adding car:', error);
      toast({
        title: "Error",
        description: "Failed to add car. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEditCar = async () => {
    if (!selectedCar) return;

    try {
      await updateCar(selectedCar.id, selectedCar);
      fetchCars();
      setOpenEditDialog(false);
    } catch (error) {
      console.error('Error updating car:', error);
      toast({
        title: "Error",
        description: "Failed to update car. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCar = async () => {
    if (!selectedCar) return;

    try {
      await deleteCar(selectedCar.id);
      fetchCars();
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error('Error deleting car:', error);
      toast({
        title: "Error",
        description: "Failed to delete car. Please try again.",
        variant: "destructive",
      });
    }
  };

  const resetNewCar = () => {
    setNewCar({
      name: '',
      model: '',
      year: new Date().getFullYear(),
      category: 'Economy',
      seatingCapacity: 5,
      fuelType: 'Petrol',
      transmission: 'Manual',
      pricePerKm: 10,
      features: [],
      images: [],
      rating: 0,
      reviews: 0,
      isAvailable: true,
    });
  };

  const formatPrice = (price: number) => {
    return `₹${price}/km`;
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="spinner mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading cars...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Cars</h1>
        <Button 
          onClick={() => setOpenAddDialog(true)}
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          <span>Add New Car</span>
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>All Cars ({cars.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Car Details</TableHead>
                <TableHead>Features</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cars.map((car) => (
                <TableRow key={car.id}>
                  <TableCell>
                    <div className="flex items-start gap-3">
                      <img 
                        src={car.images[0]} 
                        alt={car.name} 
                        className="w-16 h-16 object-cover rounded" 
                      />
                      <div>
                        <p className="font-medium">{car.name}</p>
                        <p className="text-sm text-gray-500">{car.model} • {car.year}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-600">
                          <span className="flex items-center">
                            <Users size={12} className="mr-1" />
                            {car.seatingCapacity}
                          </span>
                          <span className="flex items-center">
                            <Fuel size={12} className="mr-1" />
                            {car.fuelType}
                          </span>
                          <span>{car.transmission}</span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {car.features.slice(0, 3).map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {car.features.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{car.features.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {formatPrice(car.pricePerKm)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={car.isAvailable ? "default" : "destructive"}>
                      {car.isAvailable ? "Available" : "Unavailable"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => {
                          setSelectedCar(car);
                          setOpenEditDialog(true);
                        }}
                      >
                        <Pencil size={16} className="text-blue-600" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => {
                          setSelectedCar(car);
                          setOpenDeleteDialog(true);
                        }}
                      >
                        <Trash size={16} className="text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Add Car Dialog */}
      <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Car</DialogTitle>
            <DialogDescription>
              Enter details to add a new car to the inventory.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="car-name">Car Name</Label>
                <Input 
                  id="car-name"
                  value={newCar.name} 
                  onChange={(e) => setNewCar({...newCar, name: e.target.value})}
                  placeholder="e.g. Toyota Innova" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="car-model">Model</Label>
                <Input 
                  id="car-model"
                  value={newCar.model} 
                  onChange={(e) => setNewCar({...newCar, model: e.target.value})}
                  placeholder="e.g. Crysta" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="car-year">Year</Label>
                <Input 
                  id="car-year"
                  type="number"
                  value={newCar.year} 
                  onChange={(e) => setNewCar({...newCar, year: parseInt(e.target.value)})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="car-category">Category</Label>
                <Select 
                  value={newCar.category} 
                  onValueChange={(value) => setNewCar({...newCar, category: value as any})}
                >
                  <SelectTrigger id="car-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Economy">Economy</SelectItem>
                    <SelectItem value="SUV">SUV</SelectItem>
                    <SelectItem value="Luxury">Luxury</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="car-seats">Seating Capacity</Label>
                <Input 
                  id="car-seats"
                  type="number"
                  min="2"
                  max="10"
                  value={newCar.seatingCapacity} 
                  onChange={(e) => setNewCar({...newCar, seatingCapacity: parseInt(e.target.value)})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="car-fuelType">Fuel Type</Label>
                <Select 
                  value={newCar.fuelType} 
                  onValueChange={(value) => setNewCar({...newCar, fuelType: value as any})}
                >
                  <SelectTrigger id="car-fuelType">
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Petrol">Petrol</SelectItem>
                    <SelectItem value="Diesel">Diesel</SelectItem>
                    <SelectItem value="CNG">CNG</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="car-transmission">Transmission</Label>
                <Select 
                  value={newCar.transmission} 
                  onValueChange={(value) => setNewCar({...newCar, transmission: value as any})}
                >
                  <SelectTrigger id="car-transmission">
                    <SelectValue placeholder="Select transmission" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Manual">Manual</SelectItem>
                    <SelectItem value="Automatic">Automatic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="car-price">Price per km (₹)</Label>
                <Input 
                  id="car-price"
                  type="number"
                  min="1"
                  value={newCar.pricePerKm} 
                  onChange={(e) => setNewCar({...newCar, pricePerKm: parseInt(e.target.value)})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="car-image">Image URL</Label>
                <Input 
                  id="car-image"
                  placeholder="https://example.com/car-image.jpg"
                  value={newCar.images && newCar.images[0] || ''} 
                  onChange={(e) => setNewCar({...newCar, images: [e.target.value]})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="car-features">Features (comma separated)</Label>
                <Input 
                  id="car-features"
                  placeholder="AC, Power Steering, ABS, etc."
                  value={newCar.features?.join(', ') || ''} 
                  onChange={(e) => setNewCar({...newCar, features: e.target.value.split(',').map(f => f.trim())})}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAddDialog(false)}>Cancel</Button>
            <Button onClick={handleAddCar}>Add Car</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Car Dialog */}
      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Car</DialogTitle>
            <DialogDescription>
              Update car details.
            </DialogDescription>
          </DialogHeader>
          {selectedCar && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-car-name">Car Name</Label>
                  <Input 
                    id="edit-car-name"
                    value={selectedCar.name} 
                    onChange={(e) => setSelectedCar({...selectedCar, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-car-model">Model</Label>
                  <Input 
                    id="edit-car-model"
                    value={selectedCar.model} 
                    onChange={(e) => setSelectedCar({...selectedCar, model: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-car-price">Price per km (₹)</Label>
                  <Input 
                    id="edit-car-price"
                    type="number"
                    min="1"
                    value={selectedCar.pricePerKm} 
                    onChange={(e) => setSelectedCar({...selectedCar, pricePerKm: parseInt(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-car-status">Availability</Label>
                  <Select 
                    value={selectedCar.isAvailable ? "true" : "false"} 
                    onValueChange={(value) => setSelectedCar({...selectedCar, isAvailable: value === "true"})}
                  >
                    <SelectTrigger id="edit-car-status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Available</SelectItem>
                      <SelectItem value="false">Unavailable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-car-category">Category</Label>
                  <Select value={selectedCar.category || ''} onValueChange={(value) => setSelectedCar({ ...selectedCar!, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Economy">Economy</SelectItem>
                      <SelectItem value="SUV">SUV</SelectItem>
                      <SelectItem value="Luxury">Luxury</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenEditDialog(false)}>Cancel</Button>
            <Button onClick={handleEditCar}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Car Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedCar?.name} {selectedCar?.model}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteCar}>Delete Car</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCarsPage;
