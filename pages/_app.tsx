// @ts-ignore
// import "lazysizes/plugins/unveilhooks/ls.unveilhooks";
import React, { useEffect, useRef, useState } from "react";
import "../styles/globals.css";
import { AppProps, default as NextApp } from "next/app";
import { AppContextType } from "next/dist/shared/lib/utils";
import { Router } from "next/router";
import { RecordMap } from "relay-runtime/lib/store/RelayStoreTypes";
import { createRelayEnvironment } from "#root/src/relay/createRelayEnvironment";
// import { fetchQuery, RelayEnvironmentProvider } from "react-relay";
import { RelayEnvironmentProvider } from "react-relay";

function MyApp({
  Component,
  pageProps,
  records,
}: // environment,
  AppProps & {
    // eslint-disable-next-line @typescript-eslint/ban-types
    records: RecordMap;
    // environment?: RelayModernEnvironment;
  }) {
  const environmentRef = useRef(
    createRelayEnvironment({
      records,
      request: null,
    })
  );
  useEffect(() => {
    // @ts-ignore
    window.__environment = environmentRef.current;
  }, []);
  return (
    <RelayEnvironmentProvider environment={environmentRef.current}>
      <Component {...pageProps} />
    </RelayEnvironmentProvider>
  );
}
MyApp.getInitialProps = async (ctx: AppContextType<Router>) => {
  if (typeof window === "undefined") {
    const environment = createRelayEnvironment({
      request: ctx.ctx.req || null,
    });
    ctx.ctx.environment = environment;
    const appProps = await NextApp.getInitialProps(ctx);
    try {
      return {
        ...appProps,
        records: environment.getStore().getSource().toJSON(),
      };
    } catch (e) {
      console.error(e);
      return {
        ...appProps,
        records: {},
      };
    }
  }
  if (typeof window !== "undefined") {
    // @ts-ignore
    ctx.ctx.environment = window.__environment;
  }
  const appProps = await NextApp.getInitialProps(ctx);
  return {
    ...appProps,
    // environment,
  };
};

export default MyApp;
