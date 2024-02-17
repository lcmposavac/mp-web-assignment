import { NextPage, NextPageContext } from "next";
import React, { ReactNode, Suspense } from "react";
import {
  fetchQuery,
  GraphQLTaggedNode,
  loadQuery,
  PreloadedQuery,
  Variables,
} from "react-relay";
import { OperationType } from "relay-runtime";

export function createPageContainer<T extends OperationType>(
  ComposedComponent: NextPage<{
    queryRef: PreloadedQuery<T, Record<string, unknown>>;
    queryVariables: T["variables"];
  }>,
  options: {
    query: GraphQLTaggedNode;
    getVariables: (ctx: NextPageContext) => T["variables"];
  }
) {
  const Container = (pageProps: {
    children?: ReactNode;
    queryVariables: Variables;
    queryRef: PreloadedQuery<T, Record<string, unknown>>;
  }) => {
    return (
      <Suspense fallback={null}>
        <ComposedComponent
          {...pageProps}
          queryVariables={pageProps.queryVariables}
        />
      </Suspense>
    );
  };

  Container.displayName = `PageContainer(${ComposedComponent.displayName})`;

  Container.getInitialProps = async (ctx: NextPageContext) => {
    // Evaluate the composed component's getInitialProps()
    let composedInitialProps = {};
    if (ComposedComponent.getInitialProps) {
      composedInitialProps = await ComposedComponent.getInitialProps(ctx);
    }
    let variables = {};
    variables = options.getVariables ? options.getVariables(ctx) : {};
    try {
      await fetchQuery(ctx.environment, options.query, variables, {
        fetchPolicy: "store-or-network",
        // networkCacheConfig: {
        //   force: false,
        // },
      }).toPromise();
    } catch (e) {
      console.error(e);
    }
    const queryRef = loadQuery<T>(ctx.environment, options.query, variables, {
      fetchPolicy: "store-or-network",
      networkCacheConfig: {
        force: false,
      },
    });
    const props = {
      ...composedInitialProps,
      queryVariables: variables,
      queryRef,
    };
    return props;
    // if (ctx.res) {
    //   return { ...props };
    // }
    // return {
    //   queryVariables: variables,
    // };
  };

  return Container;
}

// import { NextPage, NextPageContext } from "next";
// import React, { ReactNode } from "react";
// import {
//   fetchQuery,
//   GraphQLTaggedNode,
//   PreloadedQuery,
//   Variables,
// } from "react-relay";
// import { OperationType } from "relay-runtime";

// export function createPageContainer<T extends OperationType>(
//   ComposedComponent: NextPage<{
//     queryVariables: T["variables"];
//   }>,
//   options: {
//     query: GraphQLTaggedNode;
//     getVariables: (ctx: NextPageContext) => T["variables"];
//   }
// ) {
//   const Container = (pageProps: {
//     children?: ReactNode;
//     queryVariables: Variables;
//     queryRef: PreloadedQuery<T, Record<string, unknown>>;
//   }) => {
//     return (
//       // <Suspense fallback={<div>Loading...</div>}>
//       <ComposedComponent
//         {...pageProps}
//         queryVariables={pageProps.queryVariables}
//       />
//       // </Suspense>
//     );
//   };

//   Container.displayName = `PageContainer(${ComposedComponent.displayName})`;

//   Container.getInitialProps = async (ctx: NextPageContext) => {
//     // Evaluate the composed component's getInitialProps()
//     let composedInitialProps = {};
//     if (ComposedComponent.getInitialProps) {
//       composedInitialProps = await ComposedComponent.getInitialProps(ctx);
//     }
//     let variables = {};
//     variables = options.getVariables ? options.getVariables(ctx) : {};
//     try {
//       await fetchQuery(ctx.environment, options.query, variables, {
//         fetchPolicy: "store-or-network",
//         networkCacheConfig: {
//           force: false,
//         },
//       }).toPromise();
//     } catch (e) {
//       console.error(e);
//     }
//     const props = {
//       ...composedInitialProps,
//       queryVariables: variables,
//     };
//     return props;
//   };

//   return Container;
// }
