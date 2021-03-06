import { Formik, Field, Form } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import { Col, Row, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { alertActions } from "../../store/alert-slice";
import { authActions } from "../../store/auth-slice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import axios from "axios";

const host = process.env.REACT_APP_API_ENDPOINT;

const useStyles = makeStyles(() => ({
  container: {
    marginTop: "1%",
  },
}));

const changePasswordSchema = (forOther) => {
  return Yup.object().shape({
    oldPassword: forOther
      ? Yup.string()
      : Yup.string().required("Podaj stare hasło"),
    newPassword: Yup.string()
      .required("Wymagane")
      .matches(
        "(?=.*[0-9])(?=.*[a-zżźćńółęąś])(?=.*[A-ZŻŹĆĄŚĘŁÓŃ])(?=.*[#?!@$%^&*-]).{6,16}",
        "Hasło musi mieć długość od 6 do 16 znaków oraz być złożone tj. składać się z 3 elementów (duże/małe litery, cyfry, znaki specjalne #?!@$%^&*-)"
      ),
    newPasswordConfirm: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Hasła muszą być identyczne")
      .required("Wymagane"),
  });
};

const printError = (msg) => {
  return <div style={{ color: "red", fontWeight: "bold" }}>{msg}</div>;
};

const initValues = {
  oldPassword: "",
  newPassword: "",
  newPasswordConfirm: "",
};

const ResetPasswordLoggedForm = (props) => {
  const classes = useStyles();
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const forOtherUser = props.forOtherUser;
  const userId = props.userId;
  const history = useHistory();

  const onSubmitHandler = async (values, { resetForm }) => {
    const url = forOtherUser
      ? `${host}/admin/user/change-password?uId=${userId}`
      : `${host}/api/react/user/change-password`;

    await axios
      .post(url, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((r) => {
        console.log(r.data);
        dispatch(
          alertActions.showAlert({
            msg: forOtherUser
              ? r.data.successMessage
              : `${r.data.successMessage}, proszę zalogować się ponownie`,
            flag: true,
            status: "ok",
          })
        );
        if (!forOtherUser) {
          dispatch(authActions.deleteToken());
          history.push("/");
        }
        resetForm();
      })
      .catch((err) => {
        dispatch(
          alertActions.showAlert({
            msg: err.response.data.errors[0].message,
            flag: true,
            status: "fail",
          })
        );
      });
  };

  return (
    <div style={{ marginTop: "5%" }}>
      <Formik
        initialValues={initValues}
        onSubmit={onSubmitHandler}
        validationSchema={changePasswordSchema(forOtherUser)}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ errors, touched }) => (
          <Form>
            <Container className={classes.container}>
              {!forOtherUser && (
                <Row className="justify-content-md-center">
                  <Col sm={6}>Aktualne hasło</Col>
                </Row>
              )}
              {!forOtherUser && (
                <Row className="justify-content-md-center">
                  <Col sm={6}>
                    <Field
                      id="oldPassword"
                      name="oldPassword"
                      className="form-control"
                      type="password"
                    />
                    {errors.oldPassword &&
                      touched.oldPassword &&
                      printError(errors.oldPassword)}
                  </Col>
                </Row>
              )}
              <Row className="justify-content-md-center">
                <Col sm={6}>Nowe hasło</Col>
              </Row>
              <Row className="justify-content-md-center">
                <Col sm={6}>
                  <Field
                    id="newPassword"
                    name="newPassword"
                    className="form-control"
                    type="password"
                  />
                  {errors.newPassword &&
                    touched.newPassword &&
                    printError(errors.newPassword)}
                </Col>
              </Row>
              <Row className="justify-content-md-center">
                <Col sm={6}>Powtórz hasło</Col>
              </Row>
              <Row className="justify-content-md-center">
                <Col sm={6}>
                  <Field
                    id="newPasswordConfirm"
                    name="newPasswordConfirm"
                    className="form-control"
                    type="password"
                  />
                  {errors.newPasswordConfirm &&
                    touched.newPasswordConfirm &&
                    printError(errors.newPasswordConfirm)}
                </Col>
              </Row>
              <Row
                className="justify-content-md-center"
                style={{ marginTop: "2%" }}
              >
                <Col sm={6}>
                  <Button variant="outlined" type="submit" size="medium">
                    Zmień hasło
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

export default ResetPasswordLoggedForm;
