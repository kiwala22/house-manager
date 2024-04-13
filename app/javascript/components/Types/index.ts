
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
  branch: string;
  id: number;
  room_number: string;
  status: string;
  user: {
    id: number;
    username: string;
  }
}

export interface UpdatePaymentProps {
  payment: PaymentProps;
  updatePayment: (payment: PaymentProps) => void;
}

