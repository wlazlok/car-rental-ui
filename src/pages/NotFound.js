import classes from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div id="wrapper" className={classes.div}>
      <img src="https://i.imgur.com/qIufhof.png" />
      <div id="info">
        <h3>This page could not be found</h3>
      </div>
    </div>
  );
};

export default NotFound;
