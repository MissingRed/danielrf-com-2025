"use client";
import React, { useEffect } from 'react';
import Dashboard from '../../components/analytics-dashboard';
import ThemeToggle from '../../components/theme-toggle';
import Chats from './chats';
import { useRouter } from 'next/navigation';
import app from '../../firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import LogoutButton from './logout-button';

export default function HomePage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(null);
  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setIsAuthenticated(false);
        router.replace("/");
      } else {
        setIsAuthenticated(true);
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (isAuthenticated === null) {
    // Opcional: puedes mostrar un loader aquí si lo prefieres
    return null;
  }
  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center p-6">
      <div className="w-full max-w-5xl">
        <header className="flex justify-between items-center py-4">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <ThemeToggle />
          <LogoutButton />
        </header>
        <section className="my-8">
          <Dashboard />
        </section>
        <section className="my-8">
          <Chats />
        </section>
      </div>
    </main>
  );
}
