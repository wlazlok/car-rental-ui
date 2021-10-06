// import { fetchCardData } from "../store/card-slice";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import CardItem from "../components/Card/Card";
import React from "react";
import Grid from "@material-ui/core/Grid";
import useProductCard from "../hooks/use-productCard";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "margin-left": "5%",
    "margin-right": "5%",
    "margin-top": "2%",
  },
  link: {
    textDecoration: "none",
  },
}));

const ProductsPage = () => {
  const classes = useStyles();
  const { isLoading, response, isError } = useProductCard();

  // const dispatch = useDispatch();
  // const card = useSelector((state) => state.card.items);
  // useEffect(() => {
  //   dispatch(fetchCardData());
  // }, [dispatch]);

  return (
    <div className={classes.root}>
      <h1>Products Page</h1>
      <Grid container spacing={6}>
        {!isLoading &&
          !isError &&
          response.cardItems.map((item) => {
            return (
              <Grid item xs={6} key={item.productId}>
                <Link
                  to={`/products/${item.productId}`}
                  className={classes.link}
                >
                  <CardItem key={item.productId} item={item} />
                </Link>
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
};

export default ProductsPage;
