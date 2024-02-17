import RelayModernEnvironment from "relay-runtime/lib/store/RelayModernEnvironment";
import "next";
// import { ApolloClient } from 'apollo-client';
import { IncomingMessage, ServerResponse } from "http";
declare module "next" {
  export interface NextPageContext {
    environment: RelayModernEnvironment;
    pathname: string;
    asPath: string;
    req?: IncomingMessage;
    res?: ServerResponse;
  }
}
