import { useState } from 'react';
import { UpdatePropertyModalProps } from "@components/Types";
import axiosInstance from '@components/Api/axiosInstance.tsaxiosInstance';


const Modal: React.FC<UpdatePropertyModalProps> = ({ property, updateProperty }) => {
  const [status, setStatus] = useState(property.status || '');
  const [isModalOpen, setIsModalOpen] = useState(false);

  /// Define static options for status
  const statusOptions = ['vacant', 'occupied'];

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let path = `/properties/${property.id}`
    try {
      const response = await axiosInstance.patch(path, {
        property: {
          status
        }
      });

      if (response.status === 200) {
        updateProperty(response.data);
        closeModal();
      } else {
        console.log(response.statusText);
      }
    } catch (error) {
      console.error("Error updating room status:", error);
    }
  };

  return (
    <>
      <button onClick={openModal} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Update Status
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center">
          <div className="bg-slate-100 p-4 rounded-md border border-gray-300 max-w-lg">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Change Room Status
                </h3>
                <button onClick={closeModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label htmlFor="room_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Room#</label>
                    <input
                      type="text"
                      name="room_number"
                      id="room_number"
                      value={property.roomNumber}
                      disabled
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User-name</label>
                    <input
                      value={property.user.username}
                      type="text"
                      name="username"
                      id="username"
                      disabled
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Room Status</label>
                    <select
                      required
                      id="status"
                      name="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                      <option value="">Select Room Status</option>
                      {statusOptions.map((status, index) => (
                        <option key={index} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className='flex justify-end'>
                  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                  <button type="button" onClick={closeModal} className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
