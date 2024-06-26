import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import PageNotFound from "@components/pages/NotFoundPage";
import Dashboard from "@components/pages/Dashboard";
import Payment from "@components/pages/PaymentsPage";
import { CurrencyDollarIcon } from "@components/Icons/CurrencyDollarIcon";
import { Cog6ToothIcon } from "@components/Icons/Cog6ToothIcon";
import { HomeModernIcon } from "@components/Icons/HomeModernIcon";
import { ArrowRightCircleIcon } from "@components/Icons/ArrowRightCircleIcon";
import Settings from "@components/pages/SettingsPage";
import Properties from "@components/pages/PropertiesPage";
import Tenants from "@components/pages/TenantsPage";
import { UsersIcon } from "@components/Icons/UsersIcon";
import RentalDetails from "@components/pages/PropertyDetailsPage";
import { RectangleGroupIcon } from "@components/Icons/RectangleGroupIcon";
import RentalsPage from "./RentalsPage";

const HomePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const navigate = useNavigate();
  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 768)
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const logOut = async (): Promise<void> => {
    const response = await fetch('/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    if (response.ok) {
      navigate('/login');
    } else {
      console.log(response.statusText);
    }
  };

  const handleClickLogOut = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    logOut();
  };

  return (
    <main className="flex flex-col bg-gray-100 h-full min-h-screen">
      <nav className="fixed top-0 z-50 w-full bg-blue-700 border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="container mx-auto flex justify-between items-center">
          <div className="px-3 py-3 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-start">
                <button onClick={() => setSidebarOpen(!sidebarOpen)} type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 lg:hidden">
                  <span className="sr-only">Open sidebar</span>
                  <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                  </svg>
                </button>
                <a href="/" className="flex ml-2 md:mr-24">
                  <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="TechMinds Inc" />
                  <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white">TechMinds Inc</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="container mx-auto flex bg-white min-h-screen">
        <aside id="logo-sidebar" className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed top-0 bottom-0 z-40 w-64 h-full pt-20 transition-transform bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700`} aria-label="Sidebar">
          <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              <li onClick={() => navigate('/')}>
                <div className="flex  items-center p-2 text-black hover:text-blue-600 text-[15px] hover:bg-blue-50 rounded px-4 py-2.5 transition-all cursor-pointer">
                  <RectangleGroupIcon />
                  <span className="ml-3">Dashboard</span>
                </div>
              </li>
              <li onClick={() => navigate('/Payments')}>
                <div className="flex items-center p-2 text-black hover:text-blue-600 text-[15px]  hover:bg-blue-50 rounded px-4 py-2.5 transition-all cursor-pointer">
                  <CurrencyDollarIcon />
                  <span className="flex-1 ml-3 whitespace-nowrap">Payments</span>
                </div>
              </li>
              <li onClick={() => navigate('/rooms')}>
                <div className="flex items-center p-2 text-black hover:text-blue-600 text-[15px] hover:bg-blue-50 rounded px-4 py-2.5 transition-all cursor-pointer">
                  <HomeModernIcon />
                  <span className="flex-1 ml-3 whitespace-nowrap">Properties</span>
                </div>
              </li>
              <li onClick={() => navigate('/Tenants')}>
                <div className="flex items-center p-2 text-black hover:text-blue-600 text-[15px] hover:bg-blue-50 rounded px-4 py-2.5 transition-all cursor-pointer">
                  <UsersIcon />
                  <span className="flex-1 ml-3 whitespace-nowrap">Tenants</span>
                </div>
              </li>
              <li onClick={() => navigate('/Rentals')}>
                <div className="flex items-center p-2 text-black hover:text-blue-600 text-[15px] hover:bg-blue-50 rounded px-4 py-2.5 transition-all cursor-pointer">
                  <UsersIcon />
                  <span className="flex-1 ml-3 whitespace-nowrap">Rentals</span>
                </div>
              </li>
              <li onClick={() => navigate('/settings')}>
                <div className="flex items-center p-2 text-black hover:text-blue-600 text-[15px] hover:bg-blue-50 rounded px-4 py-2.5 transition-all cursor-pointer">
                  <Cog6ToothIcon />
                  <span className="flex-1 ml-3 whitespace-nowrap">Settings</span>
                </div>
              </li>
              <li>
                <div className="flex items-center p-2 text-black hover:text-blue-600 text-[15px]  hover:bg-blue-50 rounded px-4 py-2.5 transition-all cursor-pointer"
                  onClick={handleClickLogOut}>
                  <ArrowRightCircleIcon />
                  <span className="flex-1 ml-3 whitespace-nowrap">Sign Out</span>
                </div>
              </li>
            </ul>
          </div>
        </aside>
        <main className="flex-grow p-4">
          <div className="p-4 sm:ml-64 my-10">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/Payments" element={<Payment />} />
              <Route path="/rooms" element={<Properties />} />
              <Route path="/Tenants" element={<Tenants />} />
              <Route path="/Rentals" element={<RentalsPage />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/details/:propertyId" element={<RentalDetails />} />

              <Route path="/*" element={<PageNotFound />} />
            </Routes>
          </div>
        </main>
      </div>
      <footer className="fixed bg-blue-800 text-white py-4 z-50 w-full bottom-0">
        <div className="container mx-auto flex justify-center items-center">
          <p>&copy; 2024 TechMinds Inc </p>
        </div>
      </footer>
    </main>
  )
}
export default HomePage;
