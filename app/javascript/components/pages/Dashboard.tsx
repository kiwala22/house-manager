import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProperties } from "@components/Api";
import { Property } from "@components/Types";
import LoadingIndicator from "@components/LoadingIndicator";

const Dashboard = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [branchFilter, setBranchFilter] = useState('');
  const [occupiedCount, setOccupiedCount] = useState(0);
  const [vacantCount, setVacantCount] = useState(0);
  const [IsLoading, setIsLoading] = useState(true);

  // Define static options for branch and status
  const branchOptions = ['makindye', 'entebbe'];

  useEffect(() => {
    const getProperties = async () => {
      try {
        const fetchedProperties = await fetchProperties();
        setProperties(fetchedProperties);
        setOccupiedCount(fetchedProperties.filter(p => p.status === 'occupied').length);
        setVacantCount(fetchedProperties.filter(p => p.status === 'vacant').length);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        setIsLoading(false);
        console.error('Failed to fetch properties:', error);
      }
    };

    getProperties();
  }, []);

  return (
    <>
      {!IsLoading && (
        <div className="py-4 px-6 bg-slate-50 border border-gray-200 rounded-lg shadow dark:border-gray-700">
          <div className="text-xs text-gray-700 uppercase dark:text-gray-400 mb-4">
            <div className="flex justify-between">
              <div>
                Room Type:
                <select
                  className="ml-2 p-2 border rounded"
                  value=""
                >
                  <option value="">All Rooms</option>
                  <option value="">double</option>
                  <option value="">single</option>
                </select>
              </div>
              <div>
                Filter by branch:
                <select
                  className="ml-2 p-2 border rounded"
                  value={branchFilter}
                  onChange={e => setBranchFilter(e.target.value)}
                >
                  <option value="">All Branches</option>
                  {branchOptions.map((branch, index) => (
                    <option key={index} value={branch}>{branch}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {properties
              .filter(property => branchFilter === '' || property.branch === branchFilter)
              .map((property) => (
                <div
                  onDoubleClick={() => navigate(`/details/${property.id}`)}
                  key={property.id}
                  className={`cursor-pointer border p-4 rounded-lg shadow-sm ${property.status === 'occupied' ? 'bg-red-500' : 'bg-green-500'} dark:bg-gray-800 dark:border-gray-700`}>
                  <h3 className="font-semibold text-lg text-white">{`Room ${property.roomNumber}`}</h3>
                  <p className="text-white">{`Branch :${property.branch}`}</p>
                  <p className="text-white">{`Status: ${property.status}`}</p>
                </div>
              ))}
          </div>

          <div className="mt-6">
            <div className="flex space-x-4">
              <button type="button" className="px-4 py-2 text-sm font-medium text-white bg-red-700 rounded-md">Occupied: {occupiedCount}</button>
              <button type="button" className="px-4 py-2 text-sm font-medium text-white bg-green-700 rounded-md">Vacant: {vacantCount}</button>
            </div>
          </div>
        </div>
      )}
      {IsLoading && <LoadingIndicator />}
    </>
  );
};

export default Dashboard;
