// pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="title" content="PnP Playground - Web3Auth" />
          <meta name="description" content="A playground to test all the features of the Web3Auth Plug and Play SDK in React." />
          <meta name="keywords" content="web3auth, web3, authentication, crypto, social login, plug and play, modal sdk" />
          <meta name="robots" content="index, follow" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="language" content="English" />
          <title>PnP Playground - Web3Auth</title>

          {/* Script to define Buffer and process */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                import { Buffer } from 'buffer';
                import process from 'process';
                window.Buffer = Buffer;
                window.process = process;
              `,
            }}
            type="module"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
