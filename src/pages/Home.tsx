// ============================================
// Home/Dashboard Redirect Page
// ============================================

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks';
import { Spinner } from '@/components/common';

export function Home() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Redirect según rol
    switch (user?.role) {
      case 'cajero':
        navigate('/cajero');
        break;
      case 'admin':
        navigate('/admin');
        break;
      case 'marketing':
        navigate('/marketing');
        break;
      default:
        navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
}
