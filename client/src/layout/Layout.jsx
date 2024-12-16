import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Header></Header>
      <div className="mb-10 md:mb-20 md:mt-[200px] mt-[100px] px-20">
        {children}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
