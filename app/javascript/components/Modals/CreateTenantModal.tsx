import axiosInstance from "@components/Api/axiosInstance.tsaxiosInstance";
import { CreateTenantModalProps } from "@components/Types";
import { useState } from "react";

const CreateTenant: React.FC<CreateTenantModalProps> = ({ addTenant }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [ninNumber, setNinNumber] = useState('');
  const [status, setStatus] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Define static options for status
  const statusOptions = ['Active', 'Inactive'];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const path = '/tenants';
    try {
      const response = await axiosInstance.post(path, {
        tenant: {
          name,
          phone,
          ninNumber,
          status
        },
      });
      if (response.status === 201) {
        setIsOpen(false);
        addTenant(response.data);
        console.log(response.data);
      } else {
        console.log(response.statusText);
      }
    } catch (error) {
      console.error("Error creating tenant:", error);
    }
  };

  // Toggle the modal's visibility
  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleModal}
        className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 transition duration-150 ease-in-out dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700" type="button">
        Add Tenant
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]"
        >
          <div className="w-full max-w-lg bg-white shadow-lg rounded-md p-6 relative">
            <div className="flex items-center pb-3 border-b text-black">
              <h3 className="text-xl font-bold flex-1">Create Tenant</h3>
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
                    <label htmlFor="tenant-name" className="text-sm font-medium text-gray-900 block mb-2">Tenant-name</label>
                    <input
                      id="tenant-name"
                      type="text"
                      value={name}
                      name="tenant-name"
                      onChange={(e) => setName(e.target.value)}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Name" required />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="nin_number" className="text-sm font-medium text-gray-900 block mb-2">Nin-number</label>
                    <input
                      id="nin_number"
                      type="text"
                      value={ninNumber}
                      name="nin_number"
                      onChange={(e) => setNinNumber(e.target.value)}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="NIN Number" required />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="status" className="text-sm font-medium text-gray-900 block mb-2">Status</label>
                    <select
                      required
                      id="status"
                      name="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                      <option value="">Select Status</option>
                      {statusOptions.map((status, index) => (
                        <option key={index} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="phone" className="text-sm font-medium text-gray-900 block mb-2">Phone-number</label>
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      name="phone"
                      onChange={(e) => setPhone(e.target.value)}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Phone" required />
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

export default CreateTenant;
