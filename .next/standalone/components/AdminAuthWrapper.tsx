"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

export default function AdminAuthWrapper({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  // Wait for client-side mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isLoginPage = pathname === '/hzn-ctrl-x9k2/login';

  useEffect(() => {
    // Skip auth check for login page
    if (isLoginPage) {
      return;
    }

    if (!isLoading && (!user || user.role !== 'admin')) {
      router.push('/hzn-ctrl-x9k2/login');
    }
  }, [user, isLoading, router, isLoginPage]);

  // Don't show auth UI for login page
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Show loading while checking auth (skip for login page)
  if (!isMounted || isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #111827, #000000, #111827)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ color: '#ffffff', fontSize: '1.25rem' }}>Loading...</div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  return <>{children}</>;
}
