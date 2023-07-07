import { z } from "zod";
import {
  GenericZodObject,
  GenericZodStringObject,
  GenericZodStringOrStringListObject,
} from "./genericZodObject.type";
import { GenericEndpointInterface } from "./interfaceContract";

export type EndpointInterfaceOutput<
  ENDPOINT_INTERFACE extends GenericEndpointInterface,
> = {
  [key in keyof ENDPOINT_INTERFACE["outputs"]]: {
    statusCode: key;
    headers?: Record<string, string>;
    body: z.infer<ENDPOINT_INTERFACE["outputs"][key]>;
  };
}[keyof ENDPOINT_INTERFACE["outputs"]];

export type EndpointInterfaceBody<
  ENDPOINT_INTERFACE extends GenericEndpointInterface,
> = ENDPOINT_INTERFACE["body"] extends GenericZodObject
  ? z.infer<ENDPOINT_INTERFACE["body"]>
  : undefined;

export type EndpointInterfacePathParameters<
  ENDPOINT_INTERFACE extends GenericEndpointInterface,
> = ENDPOINT_INTERFACE["pathParameters"] extends GenericZodStringObject
  ? z.infer<ENDPOINT_INTERFACE["pathParameters"]>
  : undefined;

export type EndpointInterfaceQueryStringParameters<
  ENDPOINT_INTERFACE extends GenericEndpointInterface,
> =
  ENDPOINT_INTERFACE["queryStringParameters"] extends GenericZodStringOrStringListObject
    ? z.infer<ENDPOINT_INTERFACE["queryStringParameters"]>
    : undefined;

export type EndpointInterfaceHeaders<
  ENDPOINT_INTERFACE extends GenericEndpointInterface,
> = ENDPOINT_INTERFACE["headers"] extends GenericZodStringObject
  ? z.infer<ENDPOINT_INTERFACE["headers"]>
  : undefined;
