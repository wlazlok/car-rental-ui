import { Fragment } from "react";

import MainAppBar from "./MainAppBar";
import MainNavigation from "./MainNavigation";

const Layout = (props) => {
  return (
    <Fragment>
      <MainAppBar />
      <MainNavigation />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
