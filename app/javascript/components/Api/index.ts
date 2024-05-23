import { PaymentProps, PropertyProps, TenantsProps } from "@components/Types";
import axiosInstance from "./axiosInstance.tsaxiosInstance";

export const fetchProperties = async (): Promise<PropertyProps[]> => {
  try {
    const response = await axiosInstance.get<PropertyProps[]>('/properties');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getPropertyById = async (propertyId: number): Promise<PropertyProps> => {
  try {
    const response = await axiosInstance.get<PropertyProps>(`/properties/${propertyId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllPayments = async (): Promise<PaymentProps[]> => {
  try {
    const response = await axiosInstance.get<PaymentProps[]>('/payments');
    return response.data
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const getAllTenants = async (): Promise<TenantsProps[]> => {
  try {
    const response = await axiosInstance.get<TenantsProps[]>('/tenants');
    return response.data
  } catch (error) {
    console.error(error);
    throw error;
  }
}
