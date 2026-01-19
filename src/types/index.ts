export interface Product {
  id: number;
  barcode: string;
  product_name: string;
  location: string;
  category: string;
  unit: string;
  shelf_life_days?: number;
  created_at?: string;
}

export interface SearchQuery {
  search?: string;
  limit?: number;
}

export interface ApiResponse<T> {
  success?: boolean;
  data?: T;
  error?: string;
}
