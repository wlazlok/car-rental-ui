import { Button, Col, Row, Form as BoostrapForm } from "react-bootstrap";
import { Formik, Field, Form } from "formik";
import { useDispatch } from "react-redux";
import { alertActions } from "../../store/alert-slice";
import axios from "axios";
import * as Yup from "yup";

const host = process.env.REACT_APP_API_ENDPOINT;

const initValues = {
  firstName: "",
  secondName: "",
  email: "",
  phoneNumber: "",
  msg: "",
};

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const contactSchema = Yup.object().shape({
  firstName: Yup.string().required("Wymagane"),
  secondName: Yup.string().required("Wymagane"),
  email: Yup.string().required("Wymagane").email("Niepoprawny adres e-mail"),
  phoneNumber: Yup.string()
    .matches(phoneRegExp, "Niepoprawny numer telefonu")
    .required("Wymagane"),
  msg: Yup.string().required("Wymagane"),
});

const printError = (msg) => {
  return <div style={{ color: "red", fontWeight: "bold" }}>{msg}</div>;
};

const ContactForm = () => {
  const dispatch = useDispatch();

  const onSubmitHandler = async (values, { resetForm }) => {
    return await axios
      .post(`${host}/api/react/contact-form`, {
        firstName: values.firstName,
        secondName: values.secondName,
        emailAddress: values.email,
        phoneNumber: values.phoneNumber,
        messageContent: values.msg,
      })
      .then((r) => {
        dispatch(
          alertActions.showAlert({
            msg: r.data.message,
            flag: true,
            status: "ok",
          })
        );
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
    <div>
      <Formik
        initialValues={initValues}
        onSubmit={onSubmitHandler}
        validationSchema={contactSchema}
        validateOnChange={true}
        validateOnBlur={false}
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
                  />
                  {errors.email && touched.email && printError(errors.email)}
                </BoostrapForm.Group>

                <BoostrapForm.Group as={Col} controlId="formGridPassword">
                  <Field
                    id="phoneNumber"
                    name="phoneNumber"
                    className="form-control"
                    placeholder="Numer telefonu"
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
