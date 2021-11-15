import { Divider } from "semantic-ui-react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { Link } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

const Footer = () => {
  return (
    <MDBFooter
      style={{ background: "#A9A9A9" }}
      className="font-small pt-4 mt-4"
    >
      <Divider />
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol>
            <h5 className="title">O nas</h5>
            <p>
              Jesteśmy firmą z wieloletnim doświadczeniem specializującą się
              <br />w wynajmnie samochodów sportowych.
            </p>
          </MDBCol>
          <MDBCol>
            <h5 className="title">Godzina otwarcia</h5>
            <p>
              Czynne od poniedziałku do soboty
              <br /> w godzinach 9:00 – 18:00
            </p>
          </MDBCol>
          <MDBCol>
            <p>
              Podchorążych 2, 30-084 Kraków
              <br /> +48 123 321 123 <br />
              carental@gmail.com
            </p>
          </MDBCol>
          <MDBCol>
            <ul>
              <li className="list-unstyled">
                <Link to={"/"}>Strona główna</Link>
              </li>
              <li className="list-unstyled">
                <Link to={"/products"}>Produkty</Link>
              </li>
              <li className="list-unstyled">
                <Link to={"/contact"}>Kontakt</Link>
              </li>
              <li className="list-unstyled">
                <Link to={"/gallery"}>Galeria</Link>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright:
          <a href="https://github.com/wlazlok"> Karol Wlazło </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
};

export default Footer;
