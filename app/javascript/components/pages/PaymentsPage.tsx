import { useEffect, useState } from 'react';
import Modal from '@components/Modals/CreatePaymentModal';
import UpdatePayment from '@components/Modals/EditPaymentModal';
import { Payment } from '@components/Types';
import { getAllPayments } from '@components/Api';
import axiosInstance from '@components/Api/axiosInstance.tsaxiosInstance';
import LoadingIndicator from '@components/LoadingIndicator';
import { ConfirmDeleteModal } from '@components/Modals/DeleteConfirmModal';

const Payments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [IsLoading, setIsLoading] = useState(true);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);


  // Function to add a new payment to the local state, triggered after a payment is successfully created in the Modal.
  const addPayment = (newPayment: Payment) => {
    setPayments((prevPayments) => [newPayment, ...prevPayments]);
  };

  //updating payment
  const updatePayment = (updatedPayment: Payment) => {
    setPayments((prevPayments) => prevPayments.map(payment => payment.id === updatedPayment.id ? updatedPayment : payment));
  };

  // Fetch all payments on component mount.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPayments = await getAllPayments();
        setPayments(fetchedPayments);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching payment data:', error);
      }
    };

    fetchData();
  }, []);

  // Function to delete a payment by ID, updating the local state to reflect the changes.
  const deletePayment = async (id: number) => {
    try {
      await axiosInstance.delete(`/payments/${id}`);
      // Update the payments state by filtering out the deleted payment.
      setPayments((currentPayments) => currentPayments.filter((payment) => payment.id !== id));
      setDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting payment:', error);
    }
  };

  return (
    <section>
      {!IsLoading && (
        <div className="block p-6 rounded-lg border border-gray-200 bg-gray-100 dark:bg-gray-800 dark:border-gray-700">
          <div className="relative overflow-x-auto">
            <div className="pt-4 mb-8">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg mb-4 font-semibold text-left text-gray-900 dark:text-white">
                    Payment Details
                  </p>
                  <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                    Tenants Payment History Overview
                  </p>
                </div>
                <Modal addPayment={addPayment} />
              </div>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs uppercase bg-blue-600 text-white dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-3 px-6">Names</th>
                    <th scope="col" className="py-3 px-6">Phone Number</th>
                    <th scope="col" className="py-3 px-6">Amount Paid</th>
                    <th scope="col" className="py-3 px-6">NIN Number</th>
                    <th scope="col" className="py-3 px-6">Room Number</th>
                    <th scope="col" className="py-3 px-6">Date</th>
                    <th scope="col" colSpan={3} className="py-3 px-6">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id} className="border-b bg-white dark:bg-gray-800 dark:border-gray-700">
                      <td className="py-4 px-6">{payment.phoneNumber}</td>
                      <td className="py-4 px-6">Shs {payment.amount}</td>
                      <td className="py-4 px-6">{payment.ninNumber}</td>
                      <td className="py-4 px-6">{payment.property.roomNumber}</td>
                      <td className="py-4 px-6">
                        <div>
                          <a href="#!" onClick={() => setDeleteModalOpen(true)} className="text-red-600 dark:text-red-500 hover:underline">Delete</a>
                          <ConfirmDeleteModal
                            isOpen={isDeleteModalOpen}
                            onClose={() => setDeleteModalOpen(false)}
                            onConfirm={() => deletePayment(payment.id)}
                          />
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <UpdatePayment payment={payment} updatePayment={updatePayment} />
                      </td>
                      <td className="py-4 px-6">
                        <a href={`/payments/${payment.id}/download_pdf`} className="font-medium text-green-600 dark:text-green-500 hover:underline" target="_blank" rel="noopener noreferrer">
                          Download PDF
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {IsLoading && <LoadingIndicator />}
    </section>
  );
};

export default Payments;