import { getCSRFToken } from '../Headers'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

export const HomePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const logOut = async (): Promise<void> => {
    const response = await fetch('/logout', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-CSRF-Token': getCSRFToken() || '', // Add the CSRF token to the request headers
      },
    });

    if (response.ok) {
      // Handle successful login, e.g., redirect to the home page
      navigate('/login');
    } else {
      console.log(response.statusText);
    }
  };

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    logOut();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-500 hover:text-gray-600 focus:outline-none"
              >
                {/* <i className="fas fa-bars"></i> */}
                Menu
              </button>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {/* Navigation links can be added here */}
                  <a href="#" className="text-gray-700 hover:text-gray-900">
                    Dashboard
                  </a>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <button onClick={handleClick} className="ml-3 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md">
                Log out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        <aside
          className={`${
            sidebarOpen ? 'w-64' : 'w-0'
          } bg-gray-200 h-screen p-4 transition-all duration-300 ease-in-out overflow-hidden`}
        >
          {/* Sidebar content can be added here */}
          {/* <p>Sidebar content...</p> */}
        </aside>
        <main className="flex-grow p-4">
          <h2 className="text-3xl font-extrabold text-gray-900">Welcome to your dashboard</h2>
          <p className="mt-4 text-gray-600">
            You are now logged in. Explore your application and feel free to make changes to your account.
          </p>
        </main>
      </div>
    </div>
  )
}