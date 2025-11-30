// ============================================
// Protected Route Component
// ============================================

import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks';
import type { Role } from '@/types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Role[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect to home or unauthorized page
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
