import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { version } from "../../../package.json";
import { Link } from "react-router-dom";
import PopupLogin from "../Dialogs/PopupLogin";
import UserMenu from "../Menus/UserMenu";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },

  main: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  },

  link: {
    textDecoration: "none",
  },
}));

const MainAppBar = () => {
  const classes = useStyles();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div>
      <AppBar position="static" className={classes.main}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {/* Karol's Car Rental */}
            TUTAJ NAZWA <font size={1}>v{version} </font>
          </Typography>
          {!isLoggedIn ? <PopupLogin /> : <UserMenu />}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MainAppBar;
