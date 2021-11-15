import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { useHistory } from "react-router";
import { alertActions } from "../../store/alert-slice";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import jwt_decode from "jwt-decode";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

const cloudinary_host = process.env.REACT_APP_CLOUDINARY_URL;

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: "none",
  },
}));

const UserMenu = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector((state) => state.auth.token);
  const userInfo = useSelector((state) => state.userInfo);

  const isAdmin = jwt_decode(token).authorities.map((auth) => {
    if (auth.authority === "ROLE_ADMIN") {
      return true;
    }
  });
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(authActions.deleteToken());
    history.push("/");
    dispatch(
      alertActions.showAlert({
        msg: "Wylogowano pomyślnie",
        flag: true,
        status: "ok",
      })
    );
  };

  return (
    <div className={classes.link}>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <AccountCircleIcon sx={{ width: 32, height: 32 }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={paperProps}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Avatar
            src={
              userInfo.avatarUrl != ""
                ? `${cloudinary_host}/v1616604961/${userInfo.avatarUrl}`
                : "https://t3.ftcdn.net/jpg/02/09/37/00/360_F_209370065_JLXhrc5inEmGl52SyvSPeVB23hB6IjrR.jpg"
            }
          />
          {userInfo.name}
        </MenuItem>
        <Divider />
        <Link
          to={isAdmin[0] ? "/admin/account" : "/account"}
          style={{ color: "black" }}
        >
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Ustawienia
          </MenuItem>
        </Link>
        {isAdmin[0] && (
          <Link to="/admin" style={{ color: "black" }}>
            <MenuItem>
              <ListItemIcon>
                <SupervisorAccountIcon fontSize="small" />
              </ListItemIcon>
              Admin
            </MenuItem>
          </Link>
        )}
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Wyloguj
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;

const paperProps = {
  elevation: 0,
  sx: {
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    mt: 1.5,
    "& .MuiAvatar-root": {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: "background.paper",
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: 0,
    },
  },
};
