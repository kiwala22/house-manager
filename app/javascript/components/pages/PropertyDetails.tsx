import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPropertyById } from '@components/Api';
import { PropertyProps, RouteParams } from '@components/Types';
import LoadingIndicator from '@components/LoadingIndicator';
import Modal from '@components/pages/UpdateStatus';

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

  const updateProperty = (updatedProperty: PropertyProps) => {
    if (propertyId) {
      setProperty(updatedProperty);
    }
  }

  if (!property) return <div><LoadingIndicator /></div>;

  return (
    <div className="block p-6 rounded-lg border">
      <div className="overflow-x-auto relative">
        <div className="flex justify-between py-3 px-6 uppercase font-semibold">
          <div>Property #{property.room_number}</div>
          <Modal property={property} updateProperty={updateProperty} />
        </div>
        <div className="border rounded-lg shadow-lg overflow-hidden dark:border-neutral-700">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 dark:bg-neutral-800 uppercase text-xs">
              <tr>
                <th colSpan={2} className="py-3 px-6 font-semibold">Property Details</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <td className="py-4 px-6 border-r border-gray-200 uppercase font-semibold">Rent Fee</td>
                <td className="py-4 px-6">Ugx {property.price}</td>
              </tr>
              <tr className="bg-white">
                <td className="py-4 px-6 border-r border-gray-200 uppercase font-semibold">Room Status</td>
                <td className="py-4 px-6">{property.status}</td>
              </tr>
              <tr className="bg-white">
                <td className="py-4 px-6 border-r border-gray-200 uppercase font-semibold">Property Branch</td>
                <td className="py-4 px-6">{property.branch}</td>
              </tr>
              {property.payments.map((payment, index) => (
                <React.Fragment key={index}>
                  <tr className="bg-gray-50">
                    <th colSpan={2} className="py-2 px-4 font-semibold text-xs">Payment #{index + 1}</th>
                  </tr>
                  <tr className="bg-white">
                    <td className="py-2 px-4 border-r border-gray-200">Tenant Name</td>
                    <td className="py-2 px-4">{payment.tenant_name}</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="py-2 px-4 border-r border-gray-200">Phone Number</td>
                    <td className="py-2 px-4">{payment.phone_number}</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="py-2 px-4 border-r border-gray-200">NIN Number</td>
                    <td className="py-2 px-4">{payment.nin_number}</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="py-2 px-4 border-r border-gray-200">Amount Paid</td>
                    <td className="py-2 px-4">Ugx {payment.amount}</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="py-2 px-4 border-r border-gray-200">Pending Balance</td>
                    <td className="py-2 px-4">{payment.amount === property.price ? 'NIL' : `Ugx ${property.price - payment.amount}`}</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="py-2 px-4 border-r border-gray-200">Period Paid For</td>
                    <td className="py-2 px-4">{payment.date_range.replace('...', ' to ')}</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="py-2 px-4 border-r border-gray-200">Payment Date</td>
                    <td className="py-2 px-4">
                      {new Date(payment.created_at)
                        .toLocaleDateString()
                        .replace(/\//g, '-')
                      }
                    </td>
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
