import Modal from "./PaymentModal"

export const Dashboard = () => {

  return (
    <section>
      <div className="block p-6 border border-gray-200 rounded-lg bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div className="relative overflow-x-auto">
          <div className="pt-4 mb-8">
            <div className="flex justify-between items-center">
              <div className="">
                <p className=" text-lg mb-4 font-semibold text-left rtl:text-right text-gray-900 bg-gray-100 dark:text-white dark:bg-gray-800">
                  Payment Details
                </p>
                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">    Tenant Payment History Overview</p>
              </div>
              <Modal />
            </div>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="border-b text-xs text-white uppercase bg-blue-600 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">Names</th>
                  <th scope="col" className="py-3 px-6">Phone Number</th>
                  <th scope="col" className="py-3 px-6">Amount Paid</th>
                  <th scope="col" className="py-3 px-6">Nin number</th>
                  <th scope="col" className="py-3 px-6">Room number</th>
                  <th scope="col" className="py-3 px-6">Date</th>
                  <th scope="col" colSpan={2} className="py-3 px-6">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="py-4 px-6">Mutebi Godfrey</td>
                  <td className="py-4 px-6">0780140670</td>
                  <td className="py-4 px-6">150000</td>
                  <td className="py-4 px-6">46wefgtyhjuk15</td>
                  <td className="py-4 px-6">DX206</td>
                  <td className="py-4 px-6">12/06/2026-23/33/34</td>
                  <td className="py-4 px-6">
                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a>
                  </td>
                  <td className="py-4 px-6">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="py-4 px-6">Mutebi Godfrey</td>
                  <td className="py-4 px-6">0780140670</td>
                  <td className="py-4 px-6">150000</td>
                  <td className="py-4 px-6">46wefgtyhjuk15</td>
                  <td className="py-4 px-6">DX206</td>
                  <td className="py-4 px-6">12/06/2026</td>
                  <td className="py-4 px-6">
                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a>
                  </td>
                  <td className="py-4 px-6">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="py-4 px-6">Mutebi Godfrey</td>
                  <td className="py-4 px-6">0780140670</td>
                  <td className="py-4 px-6">150000</td>
                  <td className="py-4 px-6">46wefgtyhjuk15</td>
                  <td className="py-4 px-6">DX206</td>
                  <td className="py-4 px-6">12/06/2026</td>
                  <td className="py-4 px-6">
                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a>
                  </td>
                  <td className="py-4 px-6">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="py-4 px-6">katongole frank</td>
                  <td className="py-4 px-6">Data 2</td>
                  <td className="py-4 px-6">Data 3</td>
                  <td className="py-4 px-6">Data 4</td>
                  <td className="py-4 px-6">DX206</td>
                  <td className="py-4 px-6">Data 5</td>
                  <td className="py-4 px-6">
                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a>
                  </td>
                  <td className="py-4 px-6">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}