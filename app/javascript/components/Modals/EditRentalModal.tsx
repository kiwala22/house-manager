import axiosInstance from "@components/Api/axiosInstance.tsaxiosInstance";
import { fetchProperties, getAllTenants } from "@components/Api";
import { UpdateRentalModalProps, Property, Tenant } from "@components/Types";
import { useState, useEffect } from "react";

const UpdateRental: React.FC<UpdateRentalModalProps> = ({ rental, updateRental }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [propertyId, setPropertyId] = useState<number>(rental.property.id);
  const [tenantId, setTenantId] = useState<number>(rental.tenant.id);
  const [properties, setProperties] = useState<Property[]>([]);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [startDate, setStartDate] = useState(rental.start_date);
  const [endDate, setEndDate] = useState(rental.end_date);
  const [deposit, setDeposit] = useState(rental.deposit);
  const [active, setActive] = useState(rental.active);

  useEffect(() => {
    const getTenants = async () => {
      try {
        const fetchedTenants = await getAllTenants();
        setTenants(fetchedTenants);
      } catch (error) {
        console.error('Failed to fetch tenants:', error);
      }
    };

    const getProperties = async () => {
      try {
        const fetchedProperties = await fetchProperties();
        setProperties(fetchedProperties);
      } catch (error) {
        console.error('Failed to fetch properties:', error);
      }
    };

    getTenants();
    getProperties();
  }, []);

  const toggleModal = () => setIsOpen(!isOpen);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let path = `/rentals/${rental.id}`;
    try {
      const response = await axiosInstance.patch(path, {
        rental: {
          property_id: propertyId,
          tenant_id: tenantId,
          start_date: startDate,
          end_date: endDate,
          deposit,
          active
        }
      });
      if (response.status === 200) {
        updateRental(response.data);
        setIsOpen(false);
      } else {
        console.log(response.statusText);
      }
    } catch (error) {
      console.error("Error updating rental:", error);
    }
  };

  return (
    <>
      <button className="mr-4" title="Edit" onClick={toggleModal}>
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-blue-500 hover:fill-blue-700"
          viewBox="0 0 348.882 348.882">
          <path
            d="M333.988 11.758l-.42-.383A43.363 43.363 0 0 0 304.258 0a43.579 43.579 0 0 0-32.104 14.153L116.803 184.231a14.993 14.993 0 0 0-3.154 5.37l-18.267 54.762c-2.112 6.331-1.052 13.333 2.835 18.729 3.918 5.438 10.23 8.685 16.886 8.685h.001c2.879 0 5.693-.592 8.362-1.76l52.89-23.138a14.985 14.985 0 0 0 5.063-3.626L336.771 73.176c16.166-17.697 14.919-45.247-2.783-61.418zM130.381 234.247l10.719-32.134.904-.99 20.316 18.556-.904.99-31.035 13.578zm184.24-181.304L182.553 197.53l-20.316-18.556L294.305 34.386c2.583-2.828 6.118-4.386 9.954-4.386 3.365 0 6.588 1.252 9.082 3.53l.419.383c5.484 5.009 5.87 13.546.861 19.03z"
            data-original="#000000" />
          <path
            d="M303.85 138.388c-8.284 0-15 6.716-15 15v127.347c0 21.034-17.113 38.147-38.147 38.147H68.904c-21.035 0-38.147-17.113-38.147-38.147V100.413c0-21.034 17.113-38.147 38.147-38.147h131.587c8.284 0 15-6.716 15-15s-6.716-15-15-15H68.904C31.327 32.266.757 62.837.757 100.413v180.321c0 37.576 30.571 68.147 68.147 68.147h181.798c37.576 0 68.147-30.571 68.147-68.147V153.388c.001-8.284-6.715-15-14.999-15z"
            data-original="#000000" />
        </svg>
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]"
        >
          <div className="w-full max-w-lg bg-white shadow-lg rounded-md p-6 relative">
            <div className="flex items-center pb-3 border-b text-black">
              <h3 className="text-xl font-bold flex-1">Edit Rental</h3>
              <svg onClick={() => setIsOpen(false)} xmlns="http://www.w3.org/2000/svg" className="w-3.5 ml-2 cursor-pointer shrink-0 fill-black hover:fill-red-500"
                viewBox="0 0 320.591 320.591">
                <path
                  d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                ></path>
                <path
                  d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146 11.369 9.736 28.136 9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                ></path>
              </svg>
            </div>
            <div className="my-6">
              <form
                id="form"
                onSubmit={handleSubmit}>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="property_id" className="text-sm font-medium text-gray-900 block mb-2">Room Number</label>
                    <select
                      required
                      id="property_id"
                      name='property_id'
                      value={propertyId}
                      onChange={(e) => setPropertyId(Number(e.target.value))}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                      <option value="">Select Property</option>
                      {properties.map((property) => (
                        <option key={property.id} value={property.id}>{property.roomNumber}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="tenant_id" className="text-sm font-medium text-gray-900 block mb-2">Tenant</label>
                    <select
                      required
                      id="tenant_id"
                      name='tenant_id'
                      value={tenantId}
                      onChange={(e) => setTenantId(Number(e.target.value))}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                      <option value="">Select Tenant</option>
                      {tenants.map((tenant) => (
                        <option key={tenant.id} value={tenant.id}>{tenant.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="start_date" className="text-sm font-medium text-gray-900 block mb-2">Start Date</label>
                    <input
                      type="date"
                      id="start_date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                      required
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="end_date" className="text-sm font-medium text-gray-900 block mb-2">End Date</label>
                    <input
                      type="date"
                      id="end_date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                      required
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="deposit" className="text-sm font-medium text-gray-900 block mb-2">Deposit</label>
                    <input
                      type="number"
                      id="deposit"
                      value={deposit}
                      onChange={(e) => setDeposit(Number(e.target.value))}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                      placeholder="Deposit amount"
                      required
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="active" className="text-sm font-medium text-gray-900 block mb-2">Active</label>
                    <select
                      required
                      id="active"
                      name="active"
                      value={String(active)}  // Ensure the value is a string
                      onChange={(e) => setActive(e.target.value === "true")}  // Convert back to boolean
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                      <option value="">Select Tenant Status</option>
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
            <div className="border-t flex justify-end pt-6 space-x-4">
              <button type="button"
                onClick={() => setIsOpen(false)}
                className="px-6 py-2 rounded-md text-black text-sm border-none outline-none bg-gray-200 hover:bg-gray-300 active:bg-gray-200">Cancel</button>
              <button type="submit" form="form"
                className="px-6 py-2 rounded-md text-white text-sm border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600">Submit</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateRental;
