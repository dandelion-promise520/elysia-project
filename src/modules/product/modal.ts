// Model define the data structure and validation for the request and response
import { t } from "elysia";

export namespace ProductModel {
  // Define a DTO for Elysia validation
  export const signInBody = t.Object({
    username: t.String(),
    password: t.String(),
  });

  // Define it as TypeScript type
  export type signInBody = typeof signInBody.static;
}
