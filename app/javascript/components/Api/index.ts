import { Payment, Property, Rental, Tenant } from "@components/Types";
import axiosInstance from "./axiosInstance.tsaxiosInstance";

export const fetchProperties = async (): Promise<Property[]> => {
  try {
    const response = await axiosInstance.get<Property[]>('/properties');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getPropertyById = async (propertyId: number): Promise<Property> => {
  try {
    const response = await axiosInstance.get<Property>(`/properties/${propertyId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllPayments = async (): Promise<Payment[]> => {
  try {
    const response = await axiosInstance.get<Payment[]>('/payments');
    return response.data
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const getAllTenants = async (): Promise<Tenant[]> => {
  try {
    const response = await axiosInstance.get<Tenant[]>('/tenants');
    return response.data
  } catch (error) {
    console.error(error);
    throw error;
  }
}
////more work todo here
// export const getRentalByPropertyId = async (propertyId: number): Promise<Rental> => {
//   try {
//     const response = await axiosInstance.get<Rental>(`/properties/${propertyId}`);
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

export const getAllRentals = async (): Promise<Rental[]> => {
  try {
    const response = await axiosInstance.get<Rental[]>('/rentals');
    return response.data
  } catch (error) {
    console.error(error);
    throw error;
  }
}
