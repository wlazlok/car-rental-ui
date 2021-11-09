import { Fragment } from "react";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { alertActions } from "../../store/alert-slice";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { authActions } from "../../store/auth-slice";
import { useHistory } from "react-router";
import MainAppBar from "./MainAppBar";
import MainNavigation from "./MainNavigation";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const drawerWidth = 240;

const useStyles = makeStyles(() => ({
  alert: {
    textAlign: "center",
    fontSize: "25px",
  },
  alertAdmin: {
    textAlign: "center",
    fontSize: "25px",
    width: "90%",
  },
  paper: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
}));

const handlePath = (text) => {
  switch (text) {
    case "Home":
      return "/";
    case "Produkty":
      return "/admin";
    case "Użytkownicy":
      return "/admin/users";
    case "Konto":
      return "/admin/account";
  }
};

const handleIcon = (text) => {
  switch (text) {
    case "Home":
      return <HomeIcon />;
    case "Produkty":
      return <DirectionsCarIcon />;
    case "Użytkownicy":
      return <PeopleAltIcon />;
    case "Wyloguj":
      return <LogoutIcon />;
    case "Konto":
      return <ManageAccountsIcon />;
  }
};

const Layout = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const alertVisability = useSelector((state) => state.alert.flag);
  const alertMessage = useSelector((state) => state.alert.msg);
  const alertStatus = useSelector((state) => state.alert.status);
  const history = useHistory();

  setTimeout(() => {
    dispatch(alertActions.hideAlert());
  }, 3000);

  const renderNotAdmin = () => {
    return (
      <div>
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
      </div>
    );
  };

  const renderAdmin = () => {
    return (
      <Row>
        <Col sm={2}>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
            variant="permanent"
            anchor="left"
            classes={{ paper: classes.paper }}
          >
            <Toolbar />
            <Divider />
            <List>
              {["Konto"].map((text, index) => (
                <Link to={handlePath(text)} className={classes.link}>
                  <ListItem button key={text}>
                    <ListItemIcon>{handleIcon(text)}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                </Link>
              ))}
            </List>
            <Divider />
            <List>
              {["Home", "Produkty", "Użytkownicy"].map((text, index) => (
                <Link to={handlePath(text)} className={classes.link}>
                  <ListItem button key={text}>
                    <ListItemIcon>{handleIcon(text)}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                </Link>
              ))}
            </List>
            <Divider />
            <List>
              {["Wyloguj"].map((text, index) => (
                <Link to={handlePath(text)} className={classes.link}>
                  <ListItem
                    button
                    key={text}
                    onClick={() => {
                      dispatch(authActions.deleteToken());
                      history.push("/");
                      dispatch(
                        alertActions.showAlert({
                          msg: "Wylogowano pomyślnie",
                          flag: true,
                          status: "ok",
                        })
                      );
                    }}
                  >
                    <ListItemIcon>{handleIcon(text)}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                </Link>
              ))}
            </List>
            <Divider />
          </Drawer>
        </Col>
        <Col sm={10}>
          {alertVisability && (
            <Alert
              key="tst"
              variant={alertStatus === "ok" ? "success" : "danger"}
              className={classes.alertAdmin}
            >
              {alertMessage}
            </Alert>
          )}
          <main>{props.children}</main>
        </Col>
      </Row>
    );
  };

  return (
    <Fragment>
      {!location.pathname.includes("/admin") ? renderNotAdmin() : renderAdmin()}
    </Fragment>
  );
};

export default Layout;
