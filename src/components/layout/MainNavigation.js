import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import classes from "./MainNavigation.module.css";

const useStyles = makeStyles((theme) => ({
  main: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  },
}));

const MainNavigation = () => {
  const color = useStyles();
  return (
    <header
      className={classes.header}
      style={{ background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)" }}
    >
      <nav>
        <ul>
          <li>
            <NavLink to="/home" activeClassName={classes.active}>
              Strona główna
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" activeClassName={classes.active}>
              Oferta
            </NavLink>
          </li>
          <li>
            <NavLink to="/prices" activeClassName={classes.active}>
              Cennik
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" activeClassName={classes.active}>
              O firmie
            </NavLink>
          </li>
          <li>
            <NavLink to="/gallery" activeClassName={classes.active}>
              Galeria
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" activeClassName={classes.active}>
              Kontakt
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
