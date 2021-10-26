import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { alertActions } from "../store/alert-slice";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import DetailTable from "../components/Table/Table";
import CarouselItem from "../components/Carousel/Carousel";
import Button from "@material-ui/core/Button";
import PricesTable from "../components/Table/PricesTable";
import CommentItems from "../components/Comments/CommentItems";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  link: {
    textDecoration: "none",
  },
}));

const AboutProductPage = () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [response, setResponse] = useState(null);
  const { productId } = useParams();
  const dispatch = useDispatch();
  const host = process.env.REACT_APP_API_ENDPOINT;

  useEffect(() => {
    const fetchProductDetails = async () => {
      setIsLoading(true);
      setIsError(false);
      await axios
        .get(`${host}/api/react/product/${productId}/details`)
        .then((result) => {
          setResponse(result.data);
        })
        .catch((err) => {
          setIsError(true);
          dispatch(
            alertActions.showAlert({
              msg: "Wystąpił błąd podczas pobierania danych",
              flag: true,
              status: "fail",
            })
          );
        });
      setIsLoading(false);
    };

    fetchProductDetails();
  }, []);

  let urls = [];

  if (!isLoading && !isError && response) {
    response.product.cloudinaryIds.map((item) => {
      urls.push(
        <img
          src={`https://res.cloudinary.com/dfurufcqe/image/upload/w_1000,h_600,c_scale/v1616604961/${item.cloudinaryId}`}
        />
      );
    });
  }

  const addComment = async (message) => {
    await axios
      .post(`${host}/api/react/comment/add`, {
        productId: productId,
        message: message,
      })
      .then((result) => {
        setResponse(result.data);
      })
      .catch((err) => {
        let error;
        if (err.response.code !== 500) {
          error = err.response.data && err.response.data.errors[0];
        }
        setIsError(true);
        dispatch(
          alertActions.showAlert({
            msg: error ? error.message : "Wystąpił nieoczekiwany błąd",
            flag: true,
            status: "fail",
          })
        );
      });
  };

  return (
    <div>
      {!isLoading && !isError && response && (
        <Container fluid>
          <Row className={classes.paper}>
            <Col>{urls.length > 0 && <CarouselItem urls={urls} />}</Col>
            <Col style={{ marginTop: "5%" }}>
              <PricesTable price={response.product.dayPrice} />
              <Link to="/contact" className={classes.link}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  style={{ marginTop: "1%" }}
                >
                  Rezerwuj
                </Button>
              </Link>
            </Col>
          </Row>
          <Row
            style={{
              display: "flex",
              justifyContent: "center",
              width: "50%",
              marginLeft: "25%",
            }}
          >
            <Col>
              <DetailTable item={response.product} />
            </Col>
          </Row>
          <Row
            style={{
              display: "flex",
              justifyContent: "center",
              width: "50%",
              marginLeft: "25%",
              marginTop: "2%",
            }}
          >
            <CommentItems
              comments={response.product.comments}
              onAddComment={addComment}
            />
          </Row>
        </Container>
      )}
    </div>
  );
};

export default AboutProductPage;
