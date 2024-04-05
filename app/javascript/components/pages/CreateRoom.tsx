import axiosInstance from "@components/Api/axiosInstance.tsaxiosInstance";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateRoom: React.FC = () => {
  const [branch, setBranch] = useState('');
  const [price, setPrice] = useState<number>(150000);
  const [room_number, setRoomNumber] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const path = '/properties';
    try {
      const response = await axiosInstance.post(path, {
        property: {
          branch,
          price,
          room_number,
        },
      });
      if (response.status === 201) {
        navigate('/houses');
      } else {
        console.log(response.statusText);
      }
    } catch (error) {
      console.error("Error adding payment:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-50">
      <form onSubmit={handleSubmit} className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Create a Room</h2>
        <div>
          <label htmlFor="room_number" className="block text-sm font-medium text-gray-700">Room Number</label>
          <input
            type="text"
            id="room_number"
            value={room_number}
            required
            onChange={(e) => setRoomNumber(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
          <input
            required
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="branch" className="block text-sm font-medium text-gray-700">Branch</label>
          <select
            id="branch"
            value={branch}
            required
            onChange={(e) => setBranch(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a Branch</option>
            <option value="entebbe">Entebbe</option>
            <option value="makindye">Makindye</option>
          </select>
        </div>

        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Create Room
        </button>
      </form>
    </div>
  );
};

export default CreateRoom;
