import React from "react";
import { Outlet } from "react-router";
import Header from "./header";

const Layout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

export default Layout;
