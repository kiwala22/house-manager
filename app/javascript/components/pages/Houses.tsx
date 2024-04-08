import { fetchProperties } from "@components/Api";
import { PropertyProps } from "@components/Types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "@components/pages/UpdateStatus";

const Houses = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<PropertyProps[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<PropertyProps | null>(null);

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

  const openModal = (property: PropertyProps) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  }

  const updateProperty = (updatedProperty: PropertyProps) => {
    setProperties((prevProperties) => prevProperties.map(property => property.id === updatedProperty.id ? updatedProperty : property));
  };

  return (
    <div className="py-4 px-6 bg-slate-50 border border-gray-200 rounded-lg shadow dark:border-gray-700">
      <div className="text-xs text-gray-700 uppercase dark:text-gray-400 mb-4">
        <div className="flex justify-between">
          <div>Room type</div>
          <div>Filter by</div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {properties.map((property) => (
          <>
            <div
              onContextMenu={(e) => {
                e.preventDefault();
                openModal(property);
              }}
              onDoubleClick={() => navigate(`/details/${property.id}`)}
              key={property.id}
              className="cursor-pointer border p-4 rounded-lg shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700">
              <h3 className="font-semibold text-lg dark:text-white">{`Room ${property.room_number}`}</h3>
              <p className="text-gray-600 dark:text-gray-400">Details about the property...</p>
              <p className="text-gray-600 dark:text-gray-400">{`Status : ${property.status}`}</p>
            </div>
            {isModalOpen && selectedProperty && (
              <Modal property={selectedProperty} onClose={() => setIsModalOpen(false)} updateProperty={updateProperty} />
            )}
          </>

        ))}
      </div>

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