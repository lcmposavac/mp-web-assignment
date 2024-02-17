import Head from "next/head";
import { PropsWithChildren, Suspense } from "react";

const LayoutWrapper = (props: PropsWithChildren<Record<string, unknown>>) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <style
          id="themeStyle"
          dangerouslySetInnerHTML={{
            __html: `
          :root {
            --color-theme: #EB478F;
          }
         `,
          }}
        />
      </Head>
      <div className="max-w-screen-xl px-4 mx-auto w-full">
        {props.children}
      </div>
    </div>
  );
};

export const Layout = (props: PropsWithChildren<Record<string, unknown>>) => {
  return (
    <Suspense fallback={null}>
      <LayoutWrapper>{props.children}</LayoutWrapper>
    </Suspense>
  );
};
