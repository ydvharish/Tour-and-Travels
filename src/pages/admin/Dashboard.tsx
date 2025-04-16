
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Car, 
  CalendarRange, 
  Users, 
  LogOut 
} from 'lucide-react';

const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  
  const isActive = (path: string) => {
    return currentPath.includes(path);
  };
  
  const handleTabChange = (value: string) => {
    navigate(`/admin/${value}`);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>
              <span className="text-2xl font-bold">Admin Dashboard</span>
            </CardTitle>
            <button className="flex items-center text-red-500 text-sm font-medium">
              <LogOut size={16} className="mr-1" />
              <span>Logout</span>
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs 
            defaultValue="dashboard" 
            value={
              isActive('/admin/cars') ? 'cars' : 
              isActive('/admin/bookings') ? 'bookings' : 
              'dashboard'
            }
            onValueChange={handleTabChange}
            className="w-full"
          >
            <TabsList className="grid grid-cols-4 w-full md:w-auto">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <LayoutDashboard size={16} />
                <span className="hidden md:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="cars" className="flex items-center gap-2">
                <Car size={16} />
                <span className="hidden md:inline">Cars</span>
              </TabsTrigger>
              <TabsTrigger value="bookings" className="flex items-center gap-2">
                <CalendarRange size={16} />
                <span className="hidden md:inline">Bookings</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users size={16} />
                <span className="hidden md:inline">Users</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>
      
      <Outlet />
    </div>
  );
};

export default AdminDashboardPage;
