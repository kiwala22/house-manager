
export const Houses = () => {

  return (
    <div className="py-4 px-6 bg-slate-50 border border-gray-200 rounded-lg shadow dark:border-gray-700">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400  border-gray-200 table-fixed border-separate">
          <thead className="text-xs text-gray-700 uppercase  dark:text-gray-400">
            <tr className="border-b">
              <th colSpan={3} className="py-3">
                Room type
              </th>
              <th colSpan={2} className="py-3">
                Filter by
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4 border border-slate-200">
                DX 102
              </td>
              <td className="px-6 py-4 border border-slate-200">
                DX 102
              </td>
              <td className="px-6 py-4 border border-slate-200">
                DX 102
              </td>
              <td className="px-6 py-4 border border-slate-200">
                DX 102
              </td>
              <td className="px-6 py-4 border border-slate-200">
                DX 102
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4 border border-slate-200" >
                DX 102
              </td>
              <td className="px-6 py-4 border border-slate-200">
                DX 102
              </td>
              <td className="px-6 py-4 border border-slate-200">
                DX 102
              </td>
              <td className="px-6 py-4 border border-slate-200">
                DX 102
              </td>
              <td className="px-6 py-4 border border-slate-200">
                DX 102
              </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <td className="px-6 py-4 border border-slate-200">
                DX 102
              </td>
              <td className="px-6 py-4 border border-slate-200">
                DX 102
              </td>
              <td className="px-6 py-4 border border-slate-200">
                DX 102
              </td>
              <td className="px-6 py-4 border border-slate-200">
                DX 102
              </td>
              <td className="px-6 py-4 border border-slate-200">
                DX 102
              </td>
            </tr>
          </tbody>
          <tfoot>
            <div className="font-semibold text-gray-900 dark:text-white">
              <div className="flex flex-row px-6 py-2 space-x-4 items-center">
                <div className="flex pt-3 space-x-2">
                  <button type="button" className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg">10</button>
                  <h1 className="flex justify-center items-center text-slate-500">occupied</h1>
                </div>
                <div className="flex pt-3 space-x-2">
                  <button type="button" className="px-3 py-2 text-xs font-medium text-center text-white bg-green-700 rounded-lg">5</button>
                  <h1 className="flex justify-center items-center text-slate-500">vaccant</h1>
                </div>
              </div>
            </div>
          </tfoot>
        </table>
      </div>
    </div>

  )
}