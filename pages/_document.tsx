import { ServerStyleSheet } from "styled-components";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { HelmetServerState } from "react-helmet-async";

interface Props {
  helmetContext: {
    helmet?: HelmetServerState;
  };
}

class MyDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const helmetContext = {};
    const page = ctx.renderPage({
      enhanceApp: (App) => (props) => {
        return sheet.collectStyles(
          // @ts-ignore
          <App {...props} helmetContext={helmetContext} />
        );
      },
    });
    const documentProps = await super.getInitialProps(ctx);
    // see https://github.com/nfl/react-helmet#server-usage for more information
    // 'head' was occupied by 'renderPage().head', we cannot use it
    return {
      ...documentProps,
      ...page,
      styles: sheet.getStyleElement(),
      helmetContext,
    };
  }
  render() {
    const { helmetContext, styles } = this.props;
    // NOTE: helmet could be null if there is a fetch error
    const htmlAttrs = helmetContext.helmet?.htmlAttributes?.toComponent();
    const bodyAttrs = helmetContext.helmet?.bodyAttributes?.toComponent();
    return (
      <Html {...htmlAttrs}>
        {styles}
        <Head>
          <>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin=""
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
              rel="stylesheet"
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
              rel="stylesheet"
            ></link>
            <link rel="manifest" href="/site.webmanifest" />
            <meta name="msapplication-TileColor" content="#da532c" />
            {helmetContext.helmet?.title?.toComponent()}
            {helmetContext.helmet?.titleAttributes?.toComponent()}
            {helmetContext.helmet?.link?.toComponent()}
            {helmetContext.helmet?.meta?.toComponent()}
            {helmetContext.helmet?.link?.toComponent()}
            {helmetContext.helmet?.script?.toComponent()}
            <link rel="manifest" href="/site.webmanifest"></link>
            {/* Global Site Tag (gtag.js) - Google Analytics */}
            <script
              dangerouslySetInnerHTML={{
                __html: `
            window.ga=window.ga||function(){(ga.q = ga.q || []).push(arguments)};ga.l=+new Date;
				ga('create', 'UA-156573710-1', 'auto');
        ga('send', 'pageview');
          `,
              }}
            />
          </>
        </Head>
        <body
          {...bodyAttrs}
          // className="bg-repeat-y bg-contain bg-opacity-20"
          // style={{
          //   backgroundImage: `url(https://englishace.imgix.net/assets/food-background-opacity.png)`,
          // }}
        >
          <Main />
          <NextScript />
          <div id="modal" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
