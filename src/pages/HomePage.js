import { Carousel } from "3d-react-carousal";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCardData } from "../store/card-slice";
import useProductCard from "../hooks/use-productCard";
import { Link } from "react-router-dom";

const cloudinary_host = process.env.REACT_APP_CLOUDINARY_URL;

const HomePage = () => {
  const { isLoading, response, isError } = useProductCard();

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchCardData());
  // }, [dispatch]);
  // const cards = useSelector((state) => state.card.items);
  let urls = [];
  if (!isLoading) {
    response.cardItems.map((card) => {
      urls.push(
        <Link to={`/products/${card.productId}`}>
          <img
            src={`${cloudinary_host}/w_1000,h_600,c_scale/v1616604961/${card.cloudinaryMainImageId}`}
          />
        </Link>
      );
    });
  }

  return (
    <div style={{ marginTop: "2%" }}>
      {!isLoading && !isError && <Carousel slides={urls} autoplay={false} />}
    </div>
  );
};

export default HomePage;
