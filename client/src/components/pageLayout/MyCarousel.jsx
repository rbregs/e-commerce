import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

export default function MyCarousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
      setIndex(selectedIndex);
    };
  
    return (
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://media.istockphoto.com/id/1408439145/photo/autumn-skincare-and-autumn-makeup-concept-with-beauty-products-on-table.jpg?s=1024x1024&w=is&k=20&c=UOOXsTxVaf3hGdht0032thVCpo2x8fZmttXLZzfAuKA="
            alt="First Slide"
          />

          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <img
            className="d-block w-100"
            src="https://media.istockphoto.com/id/1418265792/photo/cosmetics-swatches-peach-beige-red-and-coral-toned-styled-cosmetics-flat-lay-closeup-colour.jpg?s=1024x1024&w=is&k=20&c=34WiYgBL21FcU4_zl5ionJ27lIV8Zk9rMpNXeOSOW8Q="
            alt="Second Slide"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <img
            className="d-block w-100"
            src="https://media.istockphoto.com/id/1460479030/vector/makeup-set-realistic-cosmetic-products-eye-shadow-powder-blush-eyeliner-concealer-lipstick.jpg?s=1024x1024&w=is&k=20&c=nkgM-cdyECpF49ytqC8g-JCE3nh8GOhi8D1ZQyX4N0Q="
            alt="Third Slide"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
}
