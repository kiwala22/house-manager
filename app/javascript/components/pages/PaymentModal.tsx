import React, { useState, useEffect } from 'react';
import axios from "axios";
import { getCSRFToken } from '../Headers'

interface Property {
  id: number;
  room_number: string;
}

const Modal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [tenant_name, setTenant_name] = useState('');
  const [amount, setAmount] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [property_id, setPropertyId] = useState('');
  const [date_range, setDate_range] = useState('')////this date is not a string
  const [nin_number, setNin_number] = useState('');

  //querring properties
  useEffect(() => {
    fetch('/properties') // Adjust the URL based on your routes
      .then(response => response.json())
      .then((data: Property[]) => setProperties(data))
      .catch(error => console.error('Error fetching properties:', error));
  }, []);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let path = `/properties/${property_id}/payments`
    try {
      const response = await axios.post(path, {
        payment: {
          tenant_name,
          amount,
          phone_number,
          // date_range,
          nin_number,
        }
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-Token': getCSRFToken() || '', // Add the CSRF token to the request headers
        }
      });

      if (response.status === 200) {
        // Handle successful login, e.g., redirect to the home page
        // navigate('/');
      } else {
        console.log(response.statusText);
      }
    } catch (error) {
      console.error("Error adding book:", error);
      // Handle any errors here
    }
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle clicking outside the modal
  const handleOutsideClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (e.currentTarget === target) {
      setIsOpen(false);
    }
  };

  //closing the modal with Esc key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <button
        onClick={toggleModal}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Make payment
      </button>

      {isOpen && (
        <div
          onClick={handleOutsideClick}
          tabIndex={-1}
          aria-hidden="true"
          className="bg-black bg-opacity-50 backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex"
        >
          <div className=" relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Create New Payment
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={toggleModal}
                >
                  <svg className="w-3 h-3" aria-hidden="true" fill="none" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* modal content */}
              <form
                onSubmit={handleSubmit}
                className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label htmlFor="tenant_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full names</label>
                    <input
                      type="text"
                      name="tenant_name"
                      id="tenant_name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Tenant names"
                      required
                      value={tenant_name}
                      onChange={(e) => setTenant_name(e.target.value)}
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label>
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="shs.100000"
                      required
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="Room number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Room Number</label>
                    <select
                      id="property_id"
                      name='property_id'
                      onChange={(e) => setPropertyId(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option value="">Select a Property</option>
                      {properties.map(property => (
                        <option key={property.id} value={property.id}>
                          {property.room_number}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="phone_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                    <input
                      type="tel"
                      name="phone_number"
                      id="phone_number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="+2567"
                      required
                      value={phone_number}
                      onChange={(e) => setPhone_number(e.target.value)}
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="nin_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nin Number</label>
                    <input
                      type="text"
                      name="nin_number"
                      id="nin_number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="456lrt4tyh6yt7"
                      required
                      value={nin_number}
                      onChange={(e) => setNin_number(e.target.value)}
                    />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="date_range" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                    <input
                      type='date'
                      name='date_range'
                      value={date_range}
                      onChange={(e) => setDate_range(e.target.value)}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Add new payment
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
