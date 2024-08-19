// Payment Types
export interface Payment {
  id: number;
  amount: number;
  phoneNumber: string;
  tenantName: string;
  ninNumber: string;
  dateRange: string;
  property: Property;
}

export interface ModalProps {
  addPayment: (payment: Payment) => void;
}

export interface UpdatePaymentModalProps {
  payment: Payment;
  updatePayment: (payment: Payment) => void;
}

export interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

// Property Types
export interface Property {
  id: number;
  roomNumber: string;
  status: string;
  branch: string;
  price: number;
  user: User;
  payments: Payment[];
  rental: Rental;
}

export interface User {
  id: number;
  username: string;
}

export interface CreatePropertyModalProps {
  addProperty: (property: Property) => void;
}

export interface UpdatePropertyModalProps {
  property: Property;
  updateProperty: (property: Property) => void;
}

// Tenant Types
export interface Tenant {
  id: number;
  email: string;
  phone: string;
  name: string;
  ninNumber: string;
  status: string;
}

export interface CreateTenantModalProps {
  addTenant: (tenant: Tenant) => void;
}

export interface UpdateTenantModalProps {
  tenant: Tenant;
  updateTenant: (tenant: Tenant) => void;
}

// Route Params Types
export type RouteParams = {
  propertyId: string;
  rentalId: string;
}

// Rentals Types
export interface Rental {
  id: number;
  deposit: number;
  start_date: string;
  end_date: string;
  property: Property;
  tenant: Tenant;
  active: boolean;
}

export interface UpdateRentalModalProps {
  rental: Rental;
  updateRental: (rental: Rental) => void;
}

export interface CreateRentalModalProps {
  addRental: (rental: Rental) => void;
}