import { StackContext, NextjsSite, Api } from "sst/constructs";
import { getTimeInterface } from "@sst-api-interface-contract/interfaces/getTimeInterface";
import { EndpointInterfaceTrigger } from "@sst-api-interface-contract/interfaces/endpointInterface";

export function Default({ stack }: StackContext) {
  const api = new Api(stack, "api", {
    routes: {
      [EndpointInterfaceTrigger(getTimeInterface)]:
        "packages/functions/src/time.typeHandler",
    },
  });

  const site = new NextjsSite(stack, "site", {
    path: "packages/web",
    bind: [api],
    environment: {
      API_URL: api.url,
    },
  });

  stack.addOutputs({
    ApiUrl: api.url,
    SiteUrl: site.url,
  });
}
