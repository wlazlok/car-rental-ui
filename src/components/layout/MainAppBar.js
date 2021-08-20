import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

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
}));

const MainAppBar = () => {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static" className={classes.main}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Karol's Car Rental
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MainAppBar;
