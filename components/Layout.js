"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

const Layout = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-gray-600 text-white py-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <p className="text-1xl font-bold">
            {user ? (
              <span className="flex items-center">
                <span className="mr-2 text-xl">👋</span>
                <span className="text-l font-sans">Welcome, {user.email.split('@')[0]}!</span>

              </span>
            ) : (
              'Shipment Management'
            )}
          </p>
          <nav>
            <ul className="flex space-x-6">
              <li>

              </li>
              <li>

              </li>
              {user ? (
                <li>
                  <button onClick={handleLogout} className="hover:text-gray-300 transition duration-300">
                  </button>
                </li>
              ) : (
                <li>
                  <Link legacyBehavior href="/login">
                    <a className="hover:text-gray-300 transition duration-300">Login</a>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>
      <main className="flex-1 flex">
        {children}
      </main>
      <footer className="bg-gray-600 text-white py-4 mt-auto">
        <div className="container mx-auto text-center">
          &copy; Shipment Management
        </div>
      </footer>
    </div>
  );
};

export default Layout;
