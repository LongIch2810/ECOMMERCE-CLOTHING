import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Header></Header>
      <div className="mb-5 md:mb-20 md:mt-[200px] mt-[100px] px-[5vw]">
        {children}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
