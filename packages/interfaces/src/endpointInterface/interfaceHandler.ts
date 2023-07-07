import {
  APIGatewayEventRequestContextV2,
  APIGatewayProxyEventV2,
  Context,
} from "aws-lambda";
import { ApiHandler } from "sst/node/api";
import {
  EndpointInterfacePathParameters,
  EndpointInterfaceQueryStringParameters,
  EndpointInterfaceHeaders,
  EndpointInterfaceBody,
  EndpointInterfaceOutput,
} from "./interfaceContractInfer.type";
import { GenericEndpointInterface } from "./interfaceContract";

export type EndpointInterfaceHandler<
  ENDPOINT_INTERFACE extends GenericEndpointInterface,
> = (
  evt: {
    pathParameters: EndpointInterfacePathParameters<ENDPOINT_INTERFACE>;
    queryStringParameters: EndpointInterfaceQueryStringParameters<ENDPOINT_INTERFACE>;
    headers: EndpointInterfaceHeaders<ENDPOINT_INTERFACE>;
    body: EndpointInterfaceBody<ENDPOINT_INTERFACE>;
    requestContext: APIGatewayEventRequestContextV2;
  },
  ctx: Context
) => Promise<EndpointInterfaceOutput<ENDPOINT_INTERFACE>>;

export const TypedApiHandler =
  <const ENDPOINT_INTERFACE extends GenericEndpointInterface>(
    interfaceContract: ENDPOINT_INTERFACE
  ) =>
  (handler: EndpointInterfaceHandler<ENDPOINT_INTERFACE>) => {
    return ApiHandler(async (evt: APIGatewayProxyEventV2, ctx: Context) => {
      const { requestContext } = evt;

      const body = parseBody(interfaceContract, evt.body);
      const pathParameters = parsePathParameters(
        interfaceContract,
        evt.pathParameters
      );
      const queryStringParameters = parseQueryStringParameters(
        interfaceContract,
        evt.queryStringParameters
      );
      const headers = parseHeaders(interfaceContract, evt.headers);

      const result = await handler(
        {
          body,
          pathParameters,
          queryStringParameters,
          headers,
          requestContext,
        },
        ctx
      );

      return {
        statusCode: result.statusCode as number,
        headers: result.headers,
        body: JSON.stringify(result.body),
      };
    });
  };

const parseBody = <const ENDPOINT_INTERFACE extends GenericEndpointInterface>(
  interfaceContract: ENDPOINT_INTERFACE,
  proxyEventBody: APIGatewayProxyEventV2["body"]
): EndpointInterfaceBody<ENDPOINT_INTERFACE> => {
  const body =
    proxyEventBody !== undefined ? JSON.parse(proxyEventBody) : undefined;
  return interfaceContract.body?.parse(
    body
  ) as EndpointInterfaceBody<ENDPOINT_INTERFACE>;
};

const parsePathParameters = <
  const ENDPOINT_INTERFACE extends GenericEndpointInterface,
>(
  interfaceContract: ENDPOINT_INTERFACE,
  proxyEventPathParameters: APIGatewayProxyEventV2["pathParameters"]
): EndpointInterfacePathParameters<ENDPOINT_INTERFACE> => {
  return interfaceContract.pathParameters?.parse(
    proxyEventPathParameters
  ) as EndpointInterfacePathParameters<ENDPOINT_INTERFACE>;
};

const parseQueryStringParameters = <
  const ENDPOINT_INTERFACE extends GenericEndpointInterface,
>(
  interfaceContract: ENDPOINT_INTERFACE,
  proxyEventQueryStringParameters: APIGatewayProxyEventV2["queryStringParameters"]
): EndpointInterfaceQueryStringParameters<ENDPOINT_INTERFACE> => {
  return interfaceContract.queryStringParameters?.parse(
    proxyEventQueryStringParameters
  ) as EndpointInterfaceQueryStringParameters<ENDPOINT_INTERFACE>;
};

const parseHeaders = <
  const ENDPOINT_INTERFACE extends GenericEndpointInterface,
>(
  interfaceContract: ENDPOINT_INTERFACE,
  proxyEventHeaders: APIGatewayProxyEventV2["headers"]
): EndpointInterfaceHeaders<ENDPOINT_INTERFACE> => {
  return interfaceContract.headers?.parse(
    proxyEventHeaders
  ) as EndpointInterfaceHeaders<ENDPOINT_INTERFACE>;
};
