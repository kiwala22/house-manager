import { Payment, Property } from "@components/Types";
import axiosInstance from "./axiosInstance.tsaxiosInstance";

export const fetchProperties = async (): Promise<Property[]> => {
  try {
    const response = await axiosInstance.get<Property[]>('/properties');
    return response.data;
  } catch (error) {
    // Handle or throw error
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

