import { Fragment } from "react";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { alertActions } from "../../store/alert-slice";
import { makeStyles } from "@material-ui/core/styles";

import MainAppBar from "./MainAppBar";
import MainNavigation from "./MainNavigation";

const useStyles = makeStyles(() => ({
  alert: {
    textAlign: "center",
    fontSize: "25px",
  },
}));

const Layout = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const alertVisability = useSelector((state) => state.alert.flag);
  const alertMessage = useSelector((state) => state.alert.msg);
  const alertStatus = useSelector((state) => state.alert.status);

  setTimeout(() => {
    dispatch(alertActions.hideAlert());
  }, 3000);
  return (
    <Fragment>
      {alertVisability && (
        <Alert
          key="tst"
          variant={alertStatus === "ok" ? "success" : "danger"}
          className={classes.alert}
        >
          {alertMessage}
        </Alert>
      )}
      <MainAppBar />
      <MainNavigation />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
