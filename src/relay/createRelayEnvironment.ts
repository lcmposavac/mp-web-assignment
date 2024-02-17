import {
  Environment,
  FetchFunction,
  Network,
  Observable,
  RecordSource,
  Store,
} from "relay-runtime";
import { RecordMap } from "relay-runtime/lib/store/RelayStoreTypes";
import { handlerProvider } from "./handlerProvider";
import { GraphQLError } from "graphql";
import { getPublicConfig } from "../utils/constants";
import { IncomingMessage } from "http";
import { isServer } from "../utils/isServer";
import toast from "react-hot-toast";

const config = getPublicConfig();
// let host = request?.headers["host"];
//   if (isServer()) {
//     host = new URL(getPublicConfig().API_ENDPOINT).hostname;
//   }
//   const headers = {
//     "Content-Type": "application/json",
//     accept: "application/json",
//     ...{
//       "x-prop-orig-host": isServer() ? "tru-astoria.englishace.app" : undefined,
//     },
//     ...(request || {}).headers,
//     // host,
//     host: "tru-astoria.englishace.app",
//   };
function getHeaders(request: IncomingMessage | null): Record<string, unknown> {
  let host = request?.headers["host"];
  if (isServer()) {
    host = new URL(config.API_ENDPOINT).hostname;
  }
  const headers = {
    "Content-Type": "application/json",
    accept: "application/json",
    ...(request || {}).headers,
    ...{ host },
  };
  return headers;
}

function getFetchQuery(
  apiUrl: RequestInfo,
  headers: Record<string, unknown>
): FetchFunction {
  const queryFetcher: FetchFunction = (operation, variables) => {
    const body = JSON.stringify({
      query: operation.text || undefined,
      documentId: operation.id || undefined,
      operationName: operation.name,
      variables,
    });
    const finalHeaders = {
      ...headers,
      "x-graphql-operation-name": operation.name,
      "x-graphql-operation": operation.operationKind,
      accept: "application/json",
    };
    const observable = Observable.create((sink) => {
      const myPromise = fetch(apiUrl, {
        method: "POST",
        headers: finalHeaders,
        body,
      });
      myPromise
        .then((response) => {
          if (response.status > 499) {
            throw new Error(
              `${response.statusText} 😔. This a bad error, we are working on fixing it!`
            );
          }
          return response.json();
        })
        .then((data) => {
          if (data.errors && operation.operationKind === "mutation") {
            const errorMessage = data.errors
              .map((a: GraphQLError) => a.message)
              .join(";");
            sink.error(
              new Error(
                data.errors.map((a: GraphQLError) => a.message).join(";")
              )
            );
            toast.error(errorMessage, {
              className: "text-sm",
            });
            return;
          }
          sink.next(data);
          sink.complete();
        })
        .catch((e) => {
          sink.error(e);
          sink.complete();
          console.error(e);
        });
    });
    return observable;
  };
  return queryFetcher;
}

const apiUrl = config.API_ENDPOINT;

export function createRelayEnvironment({
  records,
  request,
}: {
  records?: RecordMap;
  request: IncomingMessage | null;
}) {
  const network = Network.create(getFetchQuery(apiUrl, getHeaders(request)));
  const store = new Store(new RecordSource(records), {
    queryCacheExpirationTime: 10 * 60 * 1000,
  });
  return new Environment({
    network,
    store,
    handlerProvider: handlerProvider,
  });
}
