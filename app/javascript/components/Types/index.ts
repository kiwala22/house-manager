
export interface PaymentProps {
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
  addPayment: (payment: PaymentProps) => void;
}

export interface PropertyProps {
  id: number;
  room_number: string;
  status: number;
}

export interface UpdatePaymentProps {
  paymentId: number;
  updatePayment: (payment: PaymentProps) => void;
}

