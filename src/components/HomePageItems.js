import { Row, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Divider } from "semantic-ui-react";

const HomePageItems = () => {
  return (
    <div>
      <Row className="justify-content-md-center">
        <Col sm={3}>
          <text>
            <h1>
              BOGATA OFERTA <br /> SZEROKI WYBÓR
            </h1>
            Szeroki wybór aut z różnych części Polski. Możliwość wynajmu krótko-
            lub długoterminowego <br /> <br />
            <b>Oferujemy atrakcyjne ceny oraz niezapomniane przeżycia!</b>{" "}
            <br /> <br />
            <Link to={"/products"}>
              <Button variant="danger" size="lg">
                ZOBACZ PEŁNĄ OFERTĘ
              </Button>
            </Link>
          </text>
        </Col>
        <Col sm={3}>TUTAJ ZDJ</Col>
      </Row>
      <Divider />
      <Row className="justify-content-md-center">
        <Col sm={6}>
          <text style={{ textAlign: "center" }}>
            <h1>
              ZAINTERESOWANY? <br />
              SKONTAKTUJ SIĘ Z NAMI
            </h1>
          </text>{" "}
          <br /> <br />
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col sm={2}>
          <Link to={"/contact"}>
            <Button variant="info" size="lg">
              FORMULARZ KONTAKTOWY
            </Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default HomePageItems;
