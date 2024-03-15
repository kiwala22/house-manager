
export interface Payment {
  id: number;
  amount: number;
  phone_number: string;
  tenant_name: string;
  nin_number: string;
  date_range: string;
  property: {
    id: number;
    room_number: string;
  };
}

export interface ModalProps {
  addPayment: (payment: Payment) => void;
}

export interface Property {
  id: number;
  room_number: string;
}

export interface UpdatePaymentProps {
  paymentId: number;
  updatePayment: (payment: Payment) => void;
}
