export interface CustomerDataType {
  id: string;
  fullName: string;
  email: string[];
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
export interface CustomerState {
  data: CustomerDataType[];
  pageSize: number;
  totalCount: number;
  totalPages: number;
}
