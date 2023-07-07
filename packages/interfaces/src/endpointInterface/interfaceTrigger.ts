import { GenericEndpointInterface } from "./interfaceContract";

export type EndpointInterfaceTrigger<
  ENDPOINT_INTERFACE extends GenericEndpointInterface,
> = `${ENDPOINT_INTERFACE["method"]} ${ENDPOINT_INTERFACE["path"]}`;

export const EndpointInterfaceTrigger = <
  const ENDPOINT_INTERFACE extends GenericEndpointInterface,
>(
  endpointInterface: ENDPOINT_INTERFACE
): EndpointInterfaceTrigger<ENDPOINT_INTERFACE> => {
  return `${endpointInterface.method} ${endpointInterface.path}` as EndpointInterfaceTrigger<ENDPOINT_INTERFACE>;
};
