import { Carousel } from "3d-react-carousal";
import { Link } from "react-router-dom";
import { Divider } from "semantic-ui-react";
import useProductCard from "../hooks/use-productCard";
import HomePageItems from "../components/HomePageItems";

const cloudinary_host = process.env.REACT_APP_CLOUDINARY_URL;

const HomePage = () => {
  const { isLoading, response, isError } = useProductCard();
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
      <Divider />
      <HomePageItems />
    </div>
  );
};

export default HomePage;
