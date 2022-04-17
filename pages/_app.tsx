// pages/_app.js
import React from "react";
import { UserProvider } from "@auth0/nextjs-auth0";

export default function App({ Component, pageProps }: any) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
