import { SupabaseClient } from "@supabase/supabase-js";
import { ApiResponse, Product } from "../../types";

export class ProductService {
  constructor(private supabase: SupabaseClient) {}

  async getAllProducts(): Promise<ApiResponse<Product[]>> {
    const { data, error } = await this.supabase.from("product").select("*").limit(10);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: data as Product[] };
  }

  async searchProducts(searchString: string): Promise<ApiResponse<Product[]>> {
    const { data, error } = await this.supabase
      .from("product")
      .select("*")
      .limit(10)
      .ilike("product_name", searchString);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: data as Product[] };
  }
}
