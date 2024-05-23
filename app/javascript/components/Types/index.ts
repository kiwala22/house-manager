
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

export interface CreateRoomModalProps {
  addProperty: (property: PropertyProps) => void;
}

export interface CreateTenantModalProps {
  addTenant: (tenant: TenantsProps) => void;
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
      created_at: string;
    }
  ],
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

export interface UpdatePropertyModalProps {
  property: PropertyProps;
  updateProperty: (property: PropertyProps) => void
}

export type UpdatePropertyProps = {
  property: PropertyProps
  updateProperty: (property: PropertyProps) => void
};

export interface UpdateTenantProps {
  tenant: TenantsProps;
  updateTenant: (tenant: TenantsProps) => void;
}

export interface TenantsProps {
  id: number,
  email: string,
  phone: string,
  name: string,
  nin_number: string,
  status: string
}