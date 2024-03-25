import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import CryptoData from './CryptoData';
import { useAuth } from '../contexts/AuthContext';

function Navigation() {
  const location = useLocation();
  const { isLoggedIn, logout } = useAuth();

  useEffect(() => {
    animatePageTransition();
  }, [location]);

  function animatePageTransition() {
    gsap.set('.page-container', { opacity: 0 });
    gsap.to('.page-container', { opacity: 0, duration: 0.5, onComplete: loadNewPage });
  }

  function loadNewPage() {
    gsap.to('.page-container', { opacity: 1, duration: 0.5 });
  }

  return (
    <nav className='bg-orange-400 text-white p-4'>
      <ul className='flex justify-between items-center text-center'>
        <li className='hover:bg-gray-700 p-2 rounded flex-1'>
          <Link to='/' className='text-white text-4xl block'>
            Home
          </Link>
        </li>
        <li className='hover:bg-gray-700 p-2 rounded flex-1'>
          <Link to='/about' className='text-white text-4xl block'>
            About
          </Link>
        </li>
        <li className='hover:bg-gray-700 p-2 rounded flex-1'>
          <Link to='/contact' className='text-white text-4xl block'>
            Contact
          </Link>
        </li>
        <li className='hover:bg-gray-700 p-2 rounded flex-1'>
          <Link to='/AI' className='text-white text-4xl block'>
            AI
          </Link>
        </li>
        {isLoggedIn ? (
          <>
            <li className='hover:bg-gray-700 p-2 rounded flex-1'>
              <Link to='/favorites' className='text-white text-4xl block'>
                Favorites
              </Link>
            </li>
            <li className='hover:bg-gray-700 p-2 rounded flex-1'>
              <button
                onClick={logout}
                className='bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded block w-full text-center'
              >
                Log Out
              </button>
            </li>
          </>
        ) : (
          <>
            <li className='hover:bg-gray-700 p-2 rounded flex-1'>
              <Link to='/login' className='text-white text-4xl block'>
                Log In
              </Link>
            </li>
            <li className='hover:bg-gray-700 p-2 rounded flex-1'>
              <Link to='/signup' className='text-white text-4xl block'>
                Sign Up
              </Link>
            </li>
          </>
        )}
        <li className='hover:bg-gray-700 p-2 rounded flex-1'>
          <CryptoData />
        </li>
        <li className='hover:bg-gray-700 p-2 rounded flex-1'>
          <Link to='/payment' className='text-white text-4xl block'>
            Payment
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
