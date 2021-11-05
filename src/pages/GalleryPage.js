import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { alertActions } from "../store/alert-slice";
import ImageModal from "../components/ImageModal/ImageModal";
import axios from "axios";
import ImageButton from "react-image-button";

const cloudinary_host = process.env.REACT_APP_CLOUDINARY_URL;

const GalleryPage = () => {
  const [show, setShow] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const dispatch = useDispatch();
  const host = process.env.REACT_APP_API_ENDPOINT;

  const handleClose = () => {
    setImgUrl("");
    setShow(false);
  };
  const handleShow = (url) => {
    setImgUrl(url);
    setShow(true);
  };

  useEffect(() => {
    const fetchProductsImages = async () => {
      setIsLoading(true);
      setIsError(false);
      await axios
        .get(`${host}/api/react/products/images`)
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

    fetchProductsImages();
  }, []);

  return (
    <div>
      {!isLoading &&
        !isError &&
        response &&
        response.images.map((item) => {
          return (
            <Container fluid="md" key={item.productId}>
              <Row style={{ marginTop: "2%" }}>
                <Col style={{ textAlign: "center" }}>
                  <h2>{item.productName}</h2>
                </Col>
              </Row>
              <Row>
                {item.cloudinaryIds.map((img) => {
                  return (
                    <Col xs={6} md={4} key={img}>
                      <ImageButton
                        img={
                          <img
                            style={{
                              borderRadius: "20px",
                              cursor: "pointer",
                            }}
                            src={`${cloudinary_host}/w_400,h_250,c_scale/v1616604961/${img}`}
                            alt={img}
                          />
                        }
                        onClick={() => handleShow(img)}
                      />
                    </Col>
                  );
                })}
              </Row>
            </Container>
          );
        })}
      <ImageModal show={show} handleClose={handleClose} imageUrl={imgUrl} />
    </div>
  );
};

export default GalleryPage;
