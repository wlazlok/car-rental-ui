import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  title: {
    color: "black",
    fontWeight: "bold",
  },
}));

const CardItem = (props) => {
  const classes = useStyles();
  const cardItem = props.item;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="400rem"
          image={`https://res.cloudinary.com/dfurufcqe/image/upload/v1616604961/${cardItem.cloudinaryMainImageId}`}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography
            variant="h5"
            color="textSecondary"
            component="p"
            className={classes.title}
          >
            {cardItem.productName}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardItem;
