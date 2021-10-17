import { makeStyles } from "@material-ui/core/styles";
import { Card, Col, Row, Container } from "react-bootstrap";
import ContactForm from "../components/ContactForm/ContactForm";

const useStyles = makeStyles({
  title: {
    marginTop: "2%",
    textAlign: "center",
    marginBottom: "2%",
  },
  body: {
    marginLeft: "25%",
    marginTop: "5%",
  },
  card: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "2%",
    width: "50%",
  },
});

const ContectPage = () => {
  const classes = useStyles();

  return (
    <div>
      <h1 className={classes.title}>
        <b>KONTAKT Z NAMI</b>
      </h1>
      <Container>
        <Row>
          <Col>
            <ContactForm />
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Card bg={"light"} className={classes.card}>
            <Card.Body>
              <Col>
                <Card.Text>DANE FIRMY</Card.Text>
                <Card.Text>TEST sp. z o.o.</Card.Text>
                <Card.Text>ul. Warszawska 1A </Card.Text>
                <Card.Text>87-162 TEST TEST</Card.Text>
                <Card.Text>NIP 725 22 89 268</Card.Text>
                <Card.Text>REGON 38335467500000</Card.Text>
                <Card.Text>KRS 0000786267</Card.Text>
                <Card.Text>123 123 123</Card.Text>
                <Card.Text>test@email.com</Card.Text>
                <Card.Text>Czynne od poniedziałku do</Card.Text>
                <Card.Text>soboty w godzinach 9:00 – 17:00</Card.Text>
              </Col>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </div>
  );
};

export default ContectPage;
