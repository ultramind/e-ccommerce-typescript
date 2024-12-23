import React from "react";
import Header from "./common/Header";
import Footer from "./common/Footer";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        toastOptions={{
          style: {
            backgroundColor: "black",
            color: "white",
          },
        }}
      />
    </>
  );
};

export default Layout;
