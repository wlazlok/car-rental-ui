import { Button, Col, Row, Form as BoostrapForm } from "react-bootstrap";
import { Formik, Field, Form } from "formik";
import { useDispatch } from "react-redux";
import { alertActions } from "../../store/alert-slice";

import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import axios from "axios";

const host = process.env.REACT_APP_API_ENDPOINT;

const validateEmptyField = (value) => {
  let error;
  if (!value || value.split() === 0 || value.length === 0) {
    error = "Wymagane";
  } else if (value[0] === " ") {
    error = "Niepoprawna wartość";
  }
  return error;
};
const printError = (msg) => {
  return <div style={{ color: "red", fontWeight: "bold" }}>{msg}</div>;
};

const validateEmail = (value) => {
  let error;
  if (!value || value.split() === 0) {
    error = "Wymagane";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Niepoprawny adres e-mail";
  }

  return error;
};

const validateNumber = (value) => {
  let error;
  if (!value || value.split() === 0) {
    error = "Wymagane";
  } else if (!/^\d+$/.test(value) || value.length < 9) {
    error = "Niepoprawny numer telefonu";
  }

  return error;
};

const sendData = async (values) => {
  return await axios
    .post(`${host}/api/react/contact-form`, {
      firstName: values.firstName,
      secondName: values.secondName,
      emailAddress: values.email,
      phoneNumber: values.phoneNumber,
      messageContent: values.msg,
    })
    .then((result) => {
      return { status: result.status, message: result.data.message };
    })
    .catch((err) => {
      if (err.response.status === 400) {
        throw new Error();
      } else {
        return {
          status: err.response.status,
          message: err.response.data.message,
        };
      }
    });
};

const ContactForm = () => {
  const dispatch = useDispatch();

  const onSubmitHandler = async (values, { resetForm }) => {
    let response;
    try {
      response = await sendData(values);

      if (response.status === 200) {
        dispatch(
          alertActions.showAlert({
            msg: response.message,
            flag: true,
            status: "ok",
          })
        );
      } else {
        dispatch(
          alertActions.showAlert({
            msg: response.message,
            flag: true,
            status: "fail",
          })
        );
      }

      resetForm();
    } catch (err) {
      dispatch(
        alertActions.showAlert({
          msg: "Wystąpił błąd proszę spróbować ponownie",
          flag: true,
          status: "fail",
        })
      );
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          firstName: "",
          secondName: "",
          email: "",
          phoneNumber: "",
          msg: "",
        }}
        onSubmit={onSubmitHandler}
      >
        {({ errors, touched }) => (
          <Form>
            <BoostrapForm>
              <Row className="mb-3">
                <BoostrapForm.Group as={Col} controlId="formGridEmail">
                  <Field
                    id="firstName"
                    name="firstName"
                    className="form-control"
                    placeholder="Imię"
                    validate={validateEmptyField}
                  />
                  {errors.firstName &&
                    touched.firstName &&
                    printError(errors.firstName)}
                </BoostrapForm.Group>

                <BoostrapForm.Group as={Col} controlId="formGridPassword">
                  <Field
                    id="secondName"
                    name="secondName"
                    className="form-control"
                    placeholder="Nazwisko"
                    validate={validateEmptyField}
                  />
                  {errors.secondName &&
                    touched.secondName &&
                    printError(errors.secondName)}
                </BoostrapForm.Group>
              </Row>
              <Row className="mb-3">
                <BoostrapForm.Group as={Col} controlId="formGridEmail">
                  <Field
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Adres e-mail"
                    validate={validateEmail}
                  />
                  {errors.email && touched.email && printError(errors.email)}
                </BoostrapForm.Group>

                <BoostrapForm.Group as={Col} controlId="formGridPassword">
                  <Field
                    id="phoneNumber"
                    name="phoneNumber"
                    className="form-control"
                    placeholder="Numer telefonu"
                    validate={validateNumber}
                  />
                  {errors.phoneNumber &&
                    touched.phoneNumber &&
                    printError(errors.phoneNumber)}
                </BoostrapForm.Group>
              </Row>
              {/* <TextareaAutosize
                  aria-label="empty textarea"
                  placeholder="Wiadomość"
                  style={{ height: "13rem" }}
                  onChange={validateMessageField}
                  onClick={validateMessageField}
                /> */}
              {/* TODO: tutaj coś typu TextareaAutosize żeby można bylo rozszerzyć to pole */}
              <Field
                id="msg"
                name="msg"
                className="form-control"
                placeholder="Wiadomość"
                validate={validateEmptyField}
                style={{ height: "13rem" }}
              />
              {errors.msg && touched.msg && printError(errors.msg)}
            </BoostrapForm>

            <Button
              variant="primary"
              type="submit"
              size="lg"
              style={{ marginTop: "2%" }}
            >
              Wyślij
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;
