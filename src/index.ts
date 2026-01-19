import { Elysia } from "elysia";
import { openapi, fromTypes } from "@elysiajs/openapi";
import { supabasePlugin } from "./plugins/supabase";
import { API_CONFIG } from "./config/constants";
import { product } from "./modules/product";

const app = new Elysia()
  .use(
    openapi({
      references: fromTypes(),
      path: API_CONFIG.DOCS_PATH,
    }),
  )
  .use(supabasePlugin)
  .use(product)
  .get("/", () => "Hello, Elysia!")
  .listen(API_CONFIG.PORT);

console.log(
  `🦊 Docs is running at http://${app.server?.hostname}:${app.server?.port}${API_CONFIG.DOCS_PATH}`,
);

export default app;
