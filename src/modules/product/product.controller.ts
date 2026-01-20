import Elysia from "elysia";
import { ProductService } from "./product.service";
import { supabasePlugin } from "../../plugins/supabase";

export const product = new Elysia({ prefix: "/product" })
  .use(supabasePlugin)
  .get("", ({ query, supabase }) => {
    const productService = new ProductService(supabase);
    if (query.search) {
      return productService.searchProducts(query.search);
    } else {
      return productService.getAllProducts();
    }
  })
  .get("/:id", ({ params }) => {
    console.log(params.id);
    return params.id;
  });
