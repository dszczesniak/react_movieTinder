import React from "react";
import Header from "../components/Header/Header";

import style from "./layout.scss";

const Layout = props => {
  return (
    <div>
      <Header />
      <div>{props.children}</div>
    </div>
  );
};

export default Layout;
