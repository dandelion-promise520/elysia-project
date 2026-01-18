import { Elysia } from "elysia";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
if (!supabaseKey || !supabaseUrl) {
  throw new Error("您的supabase配置不能为空");
}

export const supabasePlugin = new Elysia({
  name: "supabase",
  seed: { version: "1.0.0" }, // 用于防止重复注册
}).decorate("supabase", createClient(supabaseUrl, supabaseKey));
