import { Elysia, t } from "elysia";
import { openapi, fromTypes } from "@elysiajs/openapi";
import { supabasePlugin } from "./plugin/supabase";

// 实例化 Elysia，不调用 .listen
const app = new Elysia()
  .use(
    openapi({
      references: fromTypes(),
      path: "/docs",
    }),
  )
  .use(supabasePlugin)
  .get("/", () => {
    return { test: "hello" as const };
  })
  .get("/product", async ({ supabase }) => {
    const { data, error } = await supabase.from("product").select("*");

    if (error) return { error: error.message };
    return { product: data };
  })
  .post("/json", ({ body }) => body, {
    body: t.Object({
      hello: t.String(),
    }),
  });

export default app;
