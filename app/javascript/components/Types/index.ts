
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
    status: string;
    branch: string;
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
  price: number;
  user: {
    id: number;
    username: string;
  },
  payments: [
    {
      id: number;
      amount: number;
      phone_number: string;
      tenant_name: string;
      nin_number: string;
      date_range: string;
    }
  ]
}

export interface UpdatePaymentProps {
  payment: PaymentProps;
  updatePayment: (payment: PaymentProps) => void;
}

export interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export type RouteParams = {
  propertyId: string;
}
