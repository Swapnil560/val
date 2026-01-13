'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSnapshot } from 'valtio';
import { authStore, authActions } from '@/stores/authStore';

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const authSnap = useSnapshot(authStore);

  const publicRoutes = ['/login', '/register'];
  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    authActions.checkAuth();
  }, []);

  useEffect(() => {
    if (!authSnap.isAuthenticated && !isPublicRoute) {
      router.push('/login');
    }
  }, [authSnap.isAuthenticated, isPublicRoute, router]);

  if (!authSnap.isAuthenticated && !isPublicRoute) {
    return null;
  }

  return <>{children}</>;
}