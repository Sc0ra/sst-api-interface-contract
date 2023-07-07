# SST API Interface Contracts

This is a small WIP to show what can be achieved implementing interface contracts for SST APIHandler class.
This is still really early stage and I'm still working on it.
Proposed APIs are subject to changes.
Implementation folder is [./packages/interfaces/src/endpointInterface](./packages/interfaces/src/endpointInterface).

## Motivation

The main motivation is to implement a type-safe API handler for SST, has it was done for EventHandler.
I already built something similar on a previous project [Swarmion](https://www.swarmion.dev/), and I wanted to try to provide a similar experience for SST.

This could then be extended to provide event more features:

- Utilities to perform type-safe requests from the frontend
- Providing documentation for the API
- Providing test-utils to test the API handlers

## Proposed APIs

### Defining an interface contract

```typescript
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
```

### Using the interface contract to define an handler

```typescript
import { TypedApiHandler } from "@sst-api-interface-contract/interfaces/endpointInterface";
import { getTimeInterface } from "@sst-api-interface-contract/interfaces/getTimeInterface";

export const typeHandler = TypedApiHandler(getTimeInterface)(async ({
  body,
  headers,
  pathParameters,
  queryStringParameters,
  requestContext,
}) => {
  await Promise.resolve();

  return {
    statusCode: 200 as const,
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      name: `${pathParameters.id} ${queryStringParameters.query} ${body.name} ${headers["test-header"]}`,
      time: requestContext.time,
    },
  };
});
```

### Using the interface contract to define the route in the Api Construct

```typescript
import { StackContext, Api } from "sst/constructs";
import { getTimeInterface } from "@sst-api-interface-contract/interfaces/getTimeInterface";
import { EndpointInterfaceTrigger } from "@sst-api-interface-contract/interfaces/endpointInterface";

export function Default({ stack }: StackContext) {
  const api = new Api(stack, "api", {
    routes: {
      [EndpointInterfaceTrigger(getTimeInterface)]:
        "packages/functions/src/time.typeHandler",
    },
  });

  stack.addOutputs({
    ApiUrl: api.url,
  });
}
```
