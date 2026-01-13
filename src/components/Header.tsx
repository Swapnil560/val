'use client';

import { useSnapshot } from 'valtio';
import { cartStore } from '@/stores/cartStore';
import { authStore, authActions } from '@/stores/authStore';
import { proxy } from 'valtio';
import { Button, Badge, Dropdown } from 'antd';
import { ShoppingCartOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

// Client-side mounting state
const mountState = proxy({ mounted: false });

interface HeaderProps {
  onCartClick: () => void;
}

export default function Header({ onCartClick }: HeaderProps) {
  const cartSnap = useSnapshot(cartStore);
  const authSnap = useSnapshot(authStore);
  const mountSnap = useSnapshot(mountState);
  
  // Set mounted after hydration
  if (typeof window !== 'undefined' && !mountSnap.mounted) {
    mountState.mounted = true;
  }
  
  const itemCount = mountSnap.mounted 
    ? cartSnap.items.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
      onClick: () => window.location.href = '/profile'
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: authActions.logout
    },
  ];

  return (
    <header style={{ 
      background: 'rgba(255, 255, 255, 0.1)', 
      backdropFilter: 'blur(20px)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)', 
      position: 'sticky', 
      top: 0, 
      zIndex: 1000,
      border: '1px solid rgba(255, 255, 255, 0.2)'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '20px 24px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: '800', 
          color: '#fff', 
          margin: 0, 
          textShadow: '0 2px 10px rgba(0,0,0,0.3)',
          letterSpacing: '1px'
        }}>
          Ecommerce
        </h1>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {authSnap.isAuthenticated && authSnap.currentUser && (
            <span style={{ 
              color: 'rgba(255, 255, 255, 0.9)', 
              fontWeight: '500',
              fontSize: '16px'
            }}>
              Welcome, {authSnap.currentUser}
            </span>
          )}
          
          <Badge count={mountSnap.mounted && itemCount > 0 ? itemCount : 0} style={{ backgroundColor: '#FF4D4F' }}>
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              size="large"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.location.href = '/cart';
                }
              }}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderColor: 'rgba(255, 255, 255, 0.3)',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
                color: '#fff',
                fontWeight: '600',
                height: '48px',
                padding: '0 20px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Cart
            </Button>
          </Badge>

          {authSnap.isAuthenticated ? (
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Button
                icon={<UserOutlined />}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  color: '#fff',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)',
                  height: '48px'
                }}
              >
                {authSnap.currentUser}
              </Button>
            </Dropdown>
          ) : (
            <Button
              onClick={() => window.location.href = '/login'}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderColor: 'rgba(255, 255, 255, 0.3)',
                color: '#fff',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
                height: '48px',
                fontWeight: '600'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}