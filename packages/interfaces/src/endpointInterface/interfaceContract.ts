import {
  GenericZodObject,
  GenericZodStringObject,
  GenericZodStringOrStringListObject,
} from "./genericZodObject.type";

export type EndpointInterfaceMethod =
  | "ANY"
  | "DELETE"
  | "GET"
  | "HEAD"
  | "OPTIONS"
  | "PATCH"
  | "POST"
  | "PUT";

export class EndpointInterface<
  const NAME extends string = string,
  const METHOD extends EndpointInterfaceMethod = EndpointInterfaceMethod,
  const PATH extends string = string,
  const BODY extends GenericZodObject | undefined = undefined,
  const PATH_PARAMETERS extends GenericZodStringObject | undefined = undefined,
  const QUERY_STRING_PARAMETERS extends
    | GenericZodStringOrStringListObject
    | undefined = undefined,
  const HEADERS extends GenericZodStringObject | undefined = undefined,
  const OUTPUTS extends
    | {
        [key: number]: GenericZodObject;
      }
    | undefined = undefined,
> {
  public readonly name: NAME;
  public readonly method: METHOD;
  public readonly path: PATH;
  public readonly body: BODY;
  public readonly pathParameters: PATH_PARAMETERS;
  public readonly queryStringParameters: QUERY_STRING_PARAMETERS;
  public readonly headers: HEADERS;
  public readonly outputs: OUTPUTS;

  constructor(props: {
    name: NAME;
    method: METHOD;
    path: PATH;
    body?: BODY;
    pathParameters?: PATH_PARAMETERS;
    queryStringParameters?: QUERY_STRING_PARAMETERS;
    headers?: HEADERS;
    outputs?: OUTPUTS;
  }) {
    this.name = props.name;
    this.method = props.method;
    this.path = props.path;
    this.body = (props.body ?? undefined) as BODY;
    this.pathParameters =
      props.pathParameters ?? (undefined as PATH_PARAMETERS);
    this.queryStringParameters = (props.queryStringParameters ??
      undefined) as QUERY_STRING_PARAMETERS;
    this.headers = (props.headers ?? undefined) as HEADERS;
    this.outputs = (props.outputs ?? undefined) as OUTPUTS;
  }
}

export type GenericEndpointInterface = EndpointInterface<
  string,
  EndpointInterfaceMethod,
  string,
  GenericZodObject | undefined,
  GenericZodStringObject | undefined,
  GenericZodStringOrStringListObject | undefined,
  GenericZodStringObject | undefined,
  | {
      [key: number]: GenericZodObject;
    }
  | undefined
>;
