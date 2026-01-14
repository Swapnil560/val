'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSnapshot } from 'valtio';
import { authStore, authActions } from '@/stores/authStore';

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const authSnap = useSnapshot(authStore);
  const [isInitialized, setIsInitialized] = useState(false);

  const publicRoutes = ['/login', '/register'];
  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    authActions.checkAuth();
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized && !authSnap.isAuthenticated && !isPublicRoute) {
      router.push('/login');
    }
  }, [authSnap.isAuthenticated, isPublicRoute, router, isInitialized]);

  if (!isInitialized) {
    return null;
  }

  if (!authSnap.isAuthenticated && !isPublicRoute) {
    return null;
  }

  return <>{children}</>;
}