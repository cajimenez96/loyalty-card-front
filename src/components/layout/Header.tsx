// ============================================
// Header Component
// ============================================

import { useAuth } from '@/hooks';
import { Button } from '@/components/common';
import { ROLE_COLORS } from '@/constants';

export function Header() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  if (!user) return null;

  const roleColor = user ? ROLE_COLORS[user.role as keyof typeof ROLE_COLORS] : 'blue';

  return (
    <header className={`bg-${roleColor}-600 text-white shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">Sistema de Lealtad</h1>
            <span className="ml-4 px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm">{user.name}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="text-white border-white hover:bg-white hover:text-gray-900"
            >
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
