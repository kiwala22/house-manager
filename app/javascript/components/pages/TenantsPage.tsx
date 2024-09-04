import { getAllTenants } from "@components/Api";
import { Tenant } from "@components/Types";
import { useState, useEffect } from "react";
import axiosInstance from "@components/Api/axiosInstance.tsaxiosInstance";
import UpdateTenant from "@components/Modals/EditTenantModal";
import CreateTenant from "@components/Modals/CreateTenantModal";
import LoadingIndicator from "@components/LoadingIndicator";

const Tenants = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tenantsPerPage, setTenantsPerPage] = useState(10);
  const [IsLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getTenants = async () => {
      try {
        const fetchedTenants = await getAllTenants();
        setTenants(fetchedTenants);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        setIsLoading(false);
        console.error('Failed to fetch tenants:', error);
      }
    };

    getTenants();
  }, []);

  // Get current tenants
  const indexOfLastTenant = currentPage * tenantsPerPage;
  const indexOfFirstTenant = indexOfLastTenant - tenantsPerPage;
  const currentTenants = tenants.slice(indexOfFirstTenant, indexOfLastTenant

  );

  // Handle Previous and Next page buttons
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(tenants.length / tenantsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const deleteTenant = async (id: number) => {
    try {
      await axiosInstance.delete(`/tenants/${id}`);
      setTenants((currentTenants) => currentTenants.filter((tenant) => tenant.id !== id));
    } catch (error) {
      console.error('Error deleting tenant:', error);
    }
  };

  const updateTenant = (updatedTenant: Tenant) => {
    setTenants((prevTenants) => prevTenants.map(tenant => tenant.id === updatedTenant.id ? updatedTenant : tenant));
  };

  // Function to add a new payment to the local state, triggered after a payment is successfully created in the Modal.
  const addTenant = (newTenant: Tenant) => {
    setTenants((prevTenants) => [newTenant, ...prevTenants]);
  };

  return (
    <>
      {!IsLoading && (
        <div className="block p-6 rounded-lg bg-gray-100 dark:bg-gray-800">
          <div className="relative overflow-hidden sm:rounded-lg">
            <div className="flex-row items-center justify-between p-4 space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
              <div>
                <h5 className="mr-3 font-semibold dark:text-white">Tenants</h5>
                <p className="text-gray-500 dark:text-gray-400">Manage all your existing tenants or add a new one</p>
              </div>
              <div>
                <CreateTenant addTenant={addTenant} />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white font-[sans-serif]">
              <thead className="whitespace-nowrap">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-black">Tenant-name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-black">Nin-number</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-black">Phone-number</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-black">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-black">Actions</th>
                </tr>
              </thead>
              <tbody className="whitespace-nowrap">
                {currentTenants.map(tenant => (
                  <tr className="odd:bg-blue-50">
                    <td className="px-6 py-4 text-sm">{tenant.name}</td>
                    <td className="px-6 py-4 text-sm">{tenant.ninNumber}</td>
                    <td className="px-6 py-4 text-sm">{tenant.phone}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block ${tenant.status === 'Inactive' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'} rounded-full px-3 py-1 text-center shadow-md text-xs`}>
                        {tenant.status}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <UpdateTenant tenant={tenant} updateTenant={updateTenant} />
                      <button onClick={() => deleteTenant(tenant.id)} className="mr-4" title="Delete">
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
          </div>
          <div className="md:flex mt-4 px-6">
            <p className="text-sm text-gray-400 flex-1">Showing {indexOfFirstTenant + 1} to {Math.min(indexOfLastTenant, tenants.length)} of {tenants.length} tenants</p>
            <div className="flex items-center max-md:mt-4">
              <p className="text-sm text-gray-400">Display</p>
              <select className="text-sm text-gray-400 border border-gray-400 rounded h-7 mx-4 outline-none" value={tenantsPerPage} onChange={(e) => setTenantsPerPage(Number(e.target.value))}>
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
        </div >
      )}
      {IsLoading && <LoadingIndicator />}
    </>
  );
}

export default Tenants;
