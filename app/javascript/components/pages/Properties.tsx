import { fetchProperties } from "@components/Api";
import axiosInstance from "@components/Api/axiosInstance.tsaxiosInstance";
import { PropertyProps } from "@components/Types";
import { useState, useEffect } from "react";
import UpdateProperty from "@components/pages/EditProperty";
import CreateRoom from "@components/pages/CreateRoom";

const Properties = () => {
  const [properties, setProperties] = useState<PropertyProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage, setPropertiesPerPage] = useState(10);

  useEffect(() => {
    const getProperties = async () => {
      try {
        const fetchedProperties = await fetchProperties();
        setProperties(fetchedProperties);
      } catch (error) {
        console.error('Failed to fetch properties:', error);
      }
    };

    getProperties();
  }, []);

  // Get current properties
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);

  // Handle Previous and Next page buttons
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(properties.length / propertiesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const deleteProperty = async (id: number) => {
    try {
      await axiosInstance.delete(`/properties/${id}`);
      setProperties((currentProperties) => currentProperties.filter((property) => property.id !== id));
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  const updateProperty = (updatedProperty: PropertyProps) => {
    setProperties((prevProperties) => prevProperties.map(property => property.id === updatedProperty.id ? updatedProperty : property));
  };

  // Function to add a new payment to the local state, triggered after a payment is successfully created in the Modal.
  const addProperty = (newProperty: PropertyProps) => {
    setProperties((prevProperties) => [...prevProperties, newProperty]);
  };

  return (
    <div className="block p-6 rounded-lg bg-gray-100 dark:bg-gray-800">
      <div className="overflow-x-auto">
        <div className="flex justify-between items-center px-4 py-3 bg-white shadow-sm border-b border-gray-200">
          <h1 className="text-lg font-semibold text-gray-900">Properties</h1>
          <CreateRoom addProperty={addProperty} />
        </div>
        <table className="min-w-full bg-white font-[sans-serif]">
          <thead className="whitespace-nowrap">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-black">Property Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-black">Branch</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-black">Rent Fee</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-black">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-black">Actions</th>
            </tr>
          </thead>
          <tbody className="whitespace-nowrap">
            {currentProperties.map(property => (
              <tr className="odd:bg-blue-50">
                <td className="px-6 py-4 text-sm">{property.room_number}</td>
                <td className="px-6 py-4 text-sm">{property.branch}</td>
                <td className="px-6 py-4 text-sm">Ugx {property.price}</td>
                <td className="px-6 py-4">
                  <span className={`inline-block ${property.status === 'occupied' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'} rounded-full px-3 py-1 text-center shadow-md text-xs`}>
                    {property.status}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <UpdateProperty property={property} updateProperty={updateProperty} />
                  <button onClick={() => deleteProperty(property.id)} className="mr-4" title="Delete">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-red-500 hover:fill-red-700" viewBox="0 0 24 24">
                      <path
                        d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                        data-original="#000000" />
                      <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                        data-original="#000000" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="md:flex mt-4 px-6">
          <p className="text-sm text-gray-400 flex-1">Showing {indexOfFirstProperty + 1} to {Math.min(indexOfLastProperty, properties.length)} of {properties.length} properties</p>
          <div className="flex items-center max-md:mt-4">
            <p className="text-sm text-gray-400">Display</p>
            <select className="text-sm text-gray-400 border border-gray-400 rounded h-7 mx-4 outline-none" value={propertiesPerPage} onChange={(e) => setPropertiesPerPage(Number(e.target.value))}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
            <div className="border flex rounded divide-x-2">
              <button type="button" className="px-4 py-2 hover:bg-gray-200 text-sm" onClick={handlePrevious}>Previous</button>
              <button type="button" className="px-4 py-2 hover:bg-gray-200 text-sm" onClick={handleNext}>Next</button>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Properties;
