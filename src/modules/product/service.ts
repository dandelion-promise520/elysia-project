import { SupabaseClient } from "@supabase/supabase-js";
import { ApiResponse, Product } from "../../types";

export abstract class ProductService {
  static async getAllProducts({
    limit,
    supabase,
  }: {
    limit: number;
    supabase: SupabaseClient;
  }): Promise<ApiResponse<Product[]>> {
    const { data, error } = await supabase.from("product").select("*").limit(limit);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: data as Product[] };
  }

  static async searchProducts({
    limit,
    supabase,
  }: {
    limit: number;
    supabase: SupabaseClient;
  }): Promise<ApiResponse<Product[]>> {
    const { data, error } = await supabase.from("product").select("*").limit(limit);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: data as Product[] };
  }
}
