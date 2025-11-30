// ============================================
// Sidebar Component
// ============================================

import { NavLink } from 'react-router-dom';
import { useAuth } from '@/hooks';
import type { Role } from '@/types';

interface NavItem {
  to: string;
  label: string;
  icon: string;
  roles: Role[];
}

const navigationItems: NavItem[] = [
  {
    to: '/cajero',
    label: 'Registro de Ventas',
    icon: '🛒',
    roles: ['cajero'],
  },
  {
    to: '/admin',
    label: 'Dashboard',
    icon: '📊',
    roles: ['admin'],
  },
  {
    to: '/admin/campaigns',
    label: 'Campañas',
    icon: '🎯',
    roles: ['admin'],
  },
  {
    to: '/admin/redemption',
    label: 'Canjear Premio',
    icon: '🎁',
    roles: ['admin'],
  },
  {
    to: '/marketing',
    label: 'Envíos Masivos',
    icon: '📧',
    roles: ['marketing'],
  },
];

export function Sidebar() {
  const { user } = useAuth();

  if (!user) return null;

  const filteredItems = navigationItems.filter(item =>
    item.roles.includes(user.role)
  );

  return (
    <aside className="w-64 bg-white shadow-lg min-h-screen">
      <nav className="p-4">
        <ul className="space-y-2">
          {filteredItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <span className="text-2xl mr-3">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
