import { Elysia } from "elysia";
import { openapi, fromTypes } from "@elysiajs/openapi";
import { product } from "./modules/product/product.controller";

const app = new Elysia()
  .use(
    openapi({
      references: fromTypes(),
      path: "/docs",
    }),
  )
  .use(product)
  .get("/", () => "Hello, Elysia!")
  .listen(3000);

console.log(`🦊 Docs is running at http://${app.server?.hostname}:${app.server?.port}/docs`);

export default app;
export type App = typeof app;
