import Elysia from "elysia";
import { ProductService } from "./service";
import { supabasePlugin } from "../../plugins/supabase";

export const product = new Elysia({ prefix: "/product" })
  .use(supabasePlugin)
  .get("", ({ supabase, query }) => {
    if (query.search) {
      return ProductService.searchProducts({ limit: 10, supabase });
    } else {
      return ProductService.getAllProducts({ limit: 10, supabase });
    }
  })
  .get("/:id", ({ params }) => {
    console.log(params.id);
    return params.id;
  });
