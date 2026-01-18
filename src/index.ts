import { Elysia, t } from "elysia";
import { openapi, fromTypes } from "@elysiajs/openapi";
import { supabasePlugin } from "./plugin/supabase";

export const app = new Elysia()
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

  .post("/json", ({ body, status }) => body, {
    body: t.Object({
      hello: t.String(),
    }),
  })

  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
