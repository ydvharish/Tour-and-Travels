
import React, { useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { User, Calendar, LogOut, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const DashboardPage: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location } });
    }
  }, [isAuthenticated, navigate, location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <div className="mb-6 text-center">
              <div className="w-20 h-20 bg-brand-blue-100 rounded-full flex items-center justify-center text-brand-blue-600 text-2xl font-bold mx-auto mb-3">
                {user.name.charAt(0)}
              </div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-600 text-sm">{user.email}</p>
            </div>
            
            <div className="space-y-2 mb-6">
              <Link 
                to="/dashboard/profile" 
                className={`flex items-center justify-between p-3 rounded-md ${
                  location.pathname === '/dashboard/profile' 
                    ? 'bg-brand-blue-50 text-brand-blue-600' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <User size={18} className="mr-2" />
                  <span>My Profile</span>
                </div>
                <ChevronRight size={16} />
              </Link>
              
              <Link 
                to="/dashboard/bookings" 
                className={`flex items-center justify-between p-3 rounded-md ${
                  location.pathname === '/dashboard/bookings' 
                    ? 'bg-brand-blue-50 text-brand-blue-600' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <Calendar size={18} className="mr-2" />
                  <span>My Bookings</span>
                </div>
                <ChevronRight size={16} />
              </Link>
            </div>
            
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </Button>
          </div>
        </div>
        
        {/* Content Area */}
        <div className="lg:col-span-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
