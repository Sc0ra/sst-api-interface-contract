import { z } from "zod";
import { EndpointInterface } from "./endpointInterface";

export const getTimeInterface = new EndpointInterface({
  name: "getTime",
  method: "POST",
  path: "/time-typed/{id}",
  body: z.object({
    name: z.string(),
  }),
  pathParameters: z
    .object({
      id: z.string(),
    })
    .strict(),
  queryStringParameters: z
    .object({
      query: z.string(),
    })
    .strict(),
  headers: z.object({
    "test-header": z.string(),
  }),
  outputs: {
    200: z
      .object({
        name: z.string(),
        time: z.string(),
      })
      .strict(),
    500: z
      .object({
        error: z.string(),
      })
      .strict(),
  },
});
