import { Carousel } from "react-bootstrap";

const CarouselItem = (props) => {
  return (
    <Carousel>
      {props.urls.map((img) => {
        return <Carousel.Item key={Math.random()}>{img}</Carousel.Item>;
      })}
    </Carousel>
  );
};

export default CarouselItem;
