import { fetchProperties } from "@components/Api";
import { PropertyProps } from "@components/Types";
import { useEffect, useState } from "react";

const Houses = () => {
  const [properties, setProperties] = useState<PropertyProps[]>([]);

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

  return (
    <div className="py-4 px-6 bg-slate-50 border border-gray-200 rounded-lg shadow dark:border-gray-700">
      {/* Responsive Header */}
      <div className="text-xs text-gray-700 uppercase dark:text-gray-400 mb-4">
        <div className="flex justify-between">
          <div>Room type</div>
          <div>Filter by</div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {properties.map((property) => (
          <div key={property.id} className="border p-4 rounded-lg shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700">
            <h3 className="font-semibold text-lg dark:text-white">{`Room ${property.room_number}`}</h3>
            <p className="text-gray-600 dark:text-gray-400">Details about the property...</p>
            <p className="text-gray-600 dark:text-gray-400">{`Status : ${property.status}`}</p>

            {/* Add more details about the property here */}
          </div>
        ))}
      </div>

      {/* Footer Statistics */}
      <div className="mt-6">
        <div className="flex justify-around">
          <button type="button" className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-md">Occupied: 10</button>
          <button type="button" className="px-4 py-2 text-sm font-medium text-white bg-green-700 rounded-md">Vacant: 5</button>
        </div>
      </div>
    </div>
  );
};

export default Houses;