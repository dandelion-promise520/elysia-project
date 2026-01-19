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
    return "Hello,Elysia";
  })
  .get("/product", async ({ supabase, query }) => {
    const { search } = query;
    try {
      // 从 Supabase 查询数据
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .ilike("name", `%${search}%`) // 模糊搜索
        .limit(10);

      if (error) {
        return {
          success: false,
          error: error.message,
          statusCode: 400,
        };
      }

      return {
        success: true,
        data: data,
        count: data?.length || 0,
      };
    } catch {
      return {
        success: false,
        error: "Database query failed",
        statusCode: 500,
      };
    }
  })
  .post("/json", ({ body }) => body, {
    body: t.Object({
      hello: t.String(),
    }),
  })
  .listen(3000);

console.log(`🦊 docs is running at http://${app.server?.hostname}:${app.server?.port}/docs`);

export default app;
