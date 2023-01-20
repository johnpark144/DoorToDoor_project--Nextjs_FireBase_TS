"use client";
import "../styles/globals.css";
import { Ubuntu } from "@next/font/google";
import { Provider } from "react-redux";
import store from "../store/store";

const ubuntu = Ubuntu({ // Font
  subsets: ["latin"],
  weight: ["400"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html className={ubuntu.className}>
        <head />
        <body className="min-h-screen from-gray-500 via-gray-100 to-black bg-gradient-to-br">
          <Provider store={store}>{children}</Provider>
        </body>
      </html>
    </>
  );
}
