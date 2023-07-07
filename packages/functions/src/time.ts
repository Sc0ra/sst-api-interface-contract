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
