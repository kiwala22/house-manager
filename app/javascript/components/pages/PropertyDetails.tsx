import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPropertyById } from '@components/Api';
import { PropertyProps, RouteParams } from '@components/Types';
import LoadingIndicator from '@components/LoadingIndicator';

const PropertyDetails = () => {
  const { propertyId } = useParams<RouteParams>();
  const [property, setProperty] = useState<PropertyProps | null>(null);

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

  if (!property) return (
    <div>
      <LoadingIndicator />
    </div>
  );

  return (
    <div className="block p-6 rounded-lg border">
      <div className="overflow-x-auto relative">
        <div className="flex justify-between py-3 px-6 uppercase font-semibold">
          <div>Property #{property.room_number}</div>
          <div>Branch: {property.branch}</div>
          <div>Status: {property.status}</div>
        </div>
        <div className="border rounded-lg shadow-sm overflow-hidden dark:border-neutral-700">
          <table className="w-full text-sm text-left text-gray-700 border">
            <thead className="bg-gray-100 dark:bg-neutral-800 uppercase text-xs">
              <tr>
                <th colSpan={2} className="py-3 px-6 font-semibold">
                  Tenant Details/Room Details
                </th>
              </tr>
            </thead>
            <tbody>
              {property.payments.map((payment) => (
                <React.Fragment key={payment.id}>
                  <tr className="bg-white border-b">
                    <td className="py-4 px-6 border-r border-gray-200 uppercase font-semibold">Rent Fee</td>
                    <td className="py-4 px-6">Ugx {property.price}</td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="py-4 px-6 border-r border-gray-200 uppercase font-semibold">Tenant Phone Number</td>
                    <td className="py-4 px-6">{payment.phone_number}</td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="py-4 px-6 border-r border-gray-200 uppercase font-semibold">Tenant NIN Number</td>
                    <td className="py-4 px-6">{payment.nin_number}</td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="py-4 px-6 border-r border-gray-200 uppercase font-semibold">Amount Paid</td>
                    <td className="py-4 px-6">Ugx {payment.amount}</td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="py-4 px-6 border-r border-gray-200 uppercase font-semibold">Pending Balance</td>
                    <td className="py-4 px-6">
                      {payment.amount === property.price ? 'NIL' : `Ugx ${property.price - payment.amount}`}
                    </td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="py-4 px-6 border-r border-gray-200 uppercase font-semibold">Period Paid For</td>
                    <td className="py-4 px-6">{payment.date_range.replace('...', ' to ')}</td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
