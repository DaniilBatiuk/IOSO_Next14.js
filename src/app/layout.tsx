import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { WEB_NAME } from "@/utils/config/seo.constants";

import "@/styles/globals.scss";

import { Footer, Header, SessionWrapper } from "@/components";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: WEB_NAME,
    template: `%s | ${WEB_NAME}`,
  },
  description: "IOSO - best quiz creator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <body className={inter.className}>
          <div className="wrapper" id="wrapper">
            <SessionWrapper>
              <Header />
              <main>
                {children}
                <ToastContainer />
              </main>
              <Footer />
            </SessionWrapper>
          </div>
        </body>
      </html>
    </>
  );
}
