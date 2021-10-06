import { makeStyles } from "@material-ui/core/styles";
import { Card, Col, Row } from "react-bootstrap";
import ContactForm from "../components/ContactForm/ContactForm";

const useStyles = makeStyles({
  title: {
    "margin-top": "2%",
    "text-align": "center",
  },
  body: {
    "margin-left": "25%",
    "margin-top": "5%",
  },
});

const ContectPage = () => {
  const classes = useStyles();
  return (
    <div>
      <h1 className={classes.title}>
        <b>KONTAKT Z NAMI</b>
      </h1>
      <div className={classes.body}>
        <Row>
          <Col md={3}>
            <Card
              bg={"light"}
              style={{
                width: "25rem",
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              <Card.Body>
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
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <ContactForm />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ContectPage;
