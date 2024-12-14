import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-scroll';
import { useAuth } from '../components/Auth';
import { signOut } from 'firebase/auth';
import { auth } from '../service/firebase2';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();  // Mendapatkan user dari AuthContext

  const links = [
    { id: 'home', name: 'Home' },
    { id: 'about', name: 'About' },
    { id: 'skills', name: 'Skills' },
    { id: 'projects', name: 'Projects' },
    { id: 'contact', name: 'Contact' },
  ];

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);  // Logout pengguna
      navigate("/");  // Redirect ke halaman utama setelah logout
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="fixed w-full bg-white dark:bg-gray-800 shadow-md z-50">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <h1 className="text-xl font-bold ">Affandi..</h1>
        <ul className="flex space-x-4 items-center">
          {links.map(link => (
            <li key={link.id}>
              <Link
                to={link.id}
                smooth={true}
                duration={500}
                className="cursor-pointer hover:text-blue-500 hover:underline hover:underline-offset-4 dark:hover:text-blue-300"
              >
                {link.name}
              </Link>
            </li>
          ))}
          {/* Menampilkan tombol login atau logout berdasarkan status login */}
          {user ? (
            <button onClick={handleLogout} className="bg-red-500 hover:text-black text-white px-4 py-2 rounded-lg hover:bg-red-300">
              Logout
            </button>
          ) : (
            <button onClick={handleLogin} className="bg-blue-500 hover:text-black hover:bg-blue-300 text-white px-4 py-2 rounded-lg">
              Login
            </button>
          )}
          <ThemeToggle />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
