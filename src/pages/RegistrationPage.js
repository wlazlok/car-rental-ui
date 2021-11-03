import { Formik, Field, Form } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import { Col, Row, Form as BoostrapForm, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { alertActions } from "../store/alert-slice";
import { Alert } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router";
import Button from "@mui/material/Button";
import axios from "axios";
import * as Yup from "yup";

const host = process.env.REACT_APP_API_ENDPOINT;

const useStyles = makeStyles(() => ({
  container: {
    marginTop: "1%",
  },
}));

const initValues = {
  email: "",
  password: "",
  passwordConfirm: "",
  name: "",
  surname: "",
  street: "",
  houseNumber: "",
  appNumber: "",
  postalCode: "",
  city: "",
};

const signupSchema = Yup.object().shape({
  email: Yup.string().required("Wymagane").email("Niepoprawny adres e-mail"),
  password: Yup.string().required("Wymagane"),
  // .matches(
  //   "(?=.*[0-9])(?=.*[a-zżźćńółęąś])(?=.*[A-ZŻŹĆĄŚĘŁÓŃ])(?=.*[#?!@$%^&*-]).{6,16}",
  //   "Hasło musi mieć długość od 6 do 16 znaków oraz być złożone tj. składać się z 3 elementów (duże/małe litery, cyfry, znaki specjalne #?!@$%^&*-)"
  // ),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Hasła muszą być identyczne")
    .required("Wymagane"),
  name: Yup.string().required("Wymagane"),
  surname: Yup.string().required("Wymagane"),
  street: Yup.string().required("Wymagane"),
  houseNumber: Yup.string().required("Wymagane"),
  postalCode: Yup.string()
    .required("Wymagane")
    .matches("[0-9]{2}[-][0-9]{3}", "Niepoprawny kod pocztowy: xx-xxx"),
  city: Yup.string().required("Wymagane"),
});

const printError = (msg) => {
  return <div style={{ color: "red", fontWeight: "bold" }}>{msg}</div>;
};

const RegistrationPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMsg] = useState(null);

  const onSubmitHandler = async (values, { resetForm }) => {
    // console.log(values);
    await axios
      .post(`${host}/api/react/user/register`, values)
      .then((result) => {
        console.log(result);
        setIsError(false);
        dispatch(
          alertActions.showAlert({
            msg: result.data.successMessage,
            flag: true,
            status: "ok",
          })
        );
        resetForm();
        history.push("/");
      })
      .catch((err) => {
        setIsError(true);
        setErrorMsg(err.response.data.errors[0].message);
      });
  };

  return (
    <div>
      <Formik
        initialValues={initValues}
        onSubmit={onSubmitHandler}
        validationSchema={signupSchema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ errors, touched }) => (
          <Form>
            <Container className={classes.container}>
              {isError && (
                <Row
                  className="justify-content-md-center"
                  style={{ marginBottom: "1%" }}
                >
                  <Col sm={6}>
                    <Alert severity="error">{errorMessage}</Alert>
                  </Col>
                </Row>
              )}
              <Row className="justify-content-md-center">
                <Col sm={6}>E-mail</Col>
              </Row>
              <Row className="justify-content-md-center">
                <Col sm={6}>
                  <Field id="email" name="email" className="form-control" />
                  {errors.email && touched.email && printError(errors.email)}
                </Col>
              </Row>
              <Row
                className="justify-content-md-center"
                style={{ marginTop: "1%" }}
              >
                <Col sm={6}>Hasło</Col>
              </Row>
              <Row className="justify-content-md-center">
                <Col sm={6}>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                  />
                  {errors.password &&
                    touched.password &&
                    printError(errors.password)}
                </Col>
              </Row>
              <Row
                className="justify-content-md-center"
                style={{ marginTop: "1%" }}
              >
                <Col sm={6}>Powtórz hasło</Col>
              </Row>
              <Row className="justify-content-md-center">
                <Col sm={6}>
                  <Field
                    type="password"
                    id="passwordConfirm"
                    name="passwordConfirm"
                    className="form-control"
                  />
                  {errors.passwordConfirm &&
                    touched.passwordConfirm &&
                    printError(errors.passwordConfirm)}
                </Col>
              </Row>
              <Row
                className="justify-content-md-center"
                style={{ marginTop: "1%" }}
              >
                <Col sm={3}>Imię</Col>
                <Col sm={3}>Naziwsko</Col>
              </Row>
              <Row className="justify-content-md-center">
                <Col sm={3}>
                  <Field id="name" name="name" className="form-control" />
                  {errors.name && touched.name && printError(errors.name)}
                </Col>
                <Col sm={3}>
                  <Field id="surname" name="surname" className="form-control" />
                  {errors.surname &&
                    touched.surname &&
                    printError(errors.surname)}
                </Col>
              </Row>
              <Row
                className="justify-content-md-center"
                style={{ marginTop: "1%" }}
              >
                <Col sm={4}>Ulica</Col>
                <Col sm={1}>Nr domu</Col>
                <Col sm={1}>Nr mieszkania</Col>
              </Row>
              <Row className="justify-content-md-center">
                <Col sm={4}>
                  <Field id="street" name="street" className="form-control" />
                  {errors.street && touched.street && printError(errors.street)}
                </Col>
                <Col sm={1}>
                  <Field
                    id="houseNumber"
                    name="houseNumber"
                    className="form-control"
                  />
                  {errors.houseNumber &&
                    touched.houseNumber &&
                    printError(errors.houseNumber)}
                </Col>
                <Col sm={1}>
                  <Field
                    id="appNumber"
                    name="appNumber"
                    className="form-control"
                  />
                  {errors.appNumber &&
                    touched.appNumber &&
                    printError(errors.appNumber)}
                </Col>
              </Row>
              <Row
                className="justify-content-md-center"
                style={{ marginTop: "1%" }}
              >
                <Col sm={2}>Kod pocztowy</Col>
                <Col sm={4}>Miejscowość</Col>
              </Row>
              <Row className="justify-content-md-center">
                <Col sm={2}>
                  <Field
                    id="postalCode"
                    name="postalCode"
                    className="form-control"
                  />
                  {errors.postalCode &&
                    touched.postalCode &&
                    printError(errors.postalCode)}
                </Col>
                <Col sm={4}>
                  <Field id="city" name="city" className="form-control" />
                  {errors.city && touched.city && printError(errors.city)}
                </Col>
              </Row>
              <Row
                className="justify-content-md-center"
                style={{ marginTop: "2%" }}
              >
                <Col sm={6}>
                  <Button variant="outlined" type="submit" size="medium">
                    Utwórz konto
                  </Button>
                </Col>
              </Row>
            </Container>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegistrationPage;
