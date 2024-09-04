import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Property, RouteParams } from '@components/Types';
import LoadingIndicator from '@components/LoadingIndicator';
import { getPropertyById } from '@components/Api';
import axiosInstance from '@components/Api/axiosInstance.tsaxiosInstance';

const RentalDetails = () => {
  const { propertyId } = useParams<RouteParams>();
  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      if (propertyId) {
        try {
          const fetchedProperty = await getPropertyById(parseInt(propertyId));
          setProperty(fetchedProperty);
        } catch (error) {
          console.error('Failed to load data:', error);
        }
      }
    };

    fetchProperty();
  }, [propertyId]);

  if (!property) return <div><LoadingIndicator /></div>;

  const rental = property.rental;

  // Function to handle checkout
  const handleCheckout = async () => {
    if (!rental) return;

    try {
      // Mark rental as inactive
      await axiosInstance.patch(`/properties/${propertyId}/rentals/${rental.id}`, { active: false });

      // Update the state of property
      if (propertyId) {
        const fetchedProperty: Property = await getPropertyById(parseInt(propertyId));
        setProperty(fetchedProperty);
      }
    } catch (error) {
      console.error('Error checking out tenant:', error);
    }
  };

  return (
    <div className="block p-6 rounded-lg bg-gray-100 dark:bg-gray-800">
      <div className="flex flex-wrap justify-between items-center px-4 py-3 bg-white shadow-sm border-b border-gray-200">
        <h1 className="text-base font-medium text-gray-900">Room# {property.roomNumber}</h1>
        <h1 className="text-base font-medium text-gray-900">Room-branch: {property.branch}</h1>
        <h1 className="text-base font-medium text-gray-900">Room-status: {property.status}</h1>

        {rental?.active && (
          <button
            type="button"
            className="px-3 py-1.5 mt-2 md:mt-0 rounded-lg text-white text-sm tracking-wider font-medium border border-current outline-none bg-blue-700 hover:bg-blue-800 active:bg-blue-700"
            onClick={handleCheckout}
          >
            Check Out
          </button>
        )}
      </div>
      <div className="font-sans overflow-x-auto">

        <table className="min-w-full bg-white mt-4">
          <thead className="whitespace-nowrap">
            <tr>
              <th className="p-4 text-left text-sm font-medium text-black border-r-4 border-gray-200">
                Tenant Types
              </th>
              <th className="p-4 text-left text-sm font-medium text-black">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-blue-50">
              <td className="p-4 text-sm text-black">Tenant-name</td>
              <td className="p-4 text-sm text-black">{rental?.tenant.name || ''}</td>
            </tr>
            <tr className="odd:bg-blue-50">
              <td className="p-4 text-sm text-black">Phone-number</td>
              <td className="p-4 text-sm text-black">{rental?.tenant.phone || ''}</td>
            </tr>
            <tr className="odd:bg-blue-50">
              <td className="p-4 text-sm text-black">Nin-number</td>
              <td className="p-4 text-sm text-black">{rental?.tenant.ninNumber || ''}</td>
            </tr>
            <tr className="odd:bg-blue-50">
              <td className="p-4 text-sm text-black">Tenant-status</td>
              <td className="p-4 text-sm text-black">{rental?.tenant.status || ''}</td>
            </tr>
            <tr className="odd:bg-blue-50">
              <td className="p-4 text-sm text-black">Deposit</td>
              <td className="p-4 text-sm text-black">{rental?.deposit || ''}</td>
            </tr>
            <tr className="odd:bg-blue-50">
              <td className="p-4 text-sm text-black">StartDate/EndDate</td>
              <td className="p-4 text-sm text-black">
                {rental ? `${new Date(rental.start_date).toLocaleDateString()} - ${new Date(rental.end_date).toLocaleDateString()}` : ''}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RentalDetails;
