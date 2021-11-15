import { Formik, Field, Form } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import { Col, Row, Form as BoostrapForm, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { alertActions } from "../../../store/alert-slice";
import { useHistory, useParams } from "react-router";
import Button from "@mui/material/Button";
import axios from "axios";
import EditImage from "../EditImage";
import * as Yup from "yup";

const useStyles = makeStyles((theme) => ({
  row: {
    marginTop: "1%",
  },
}));

const printError = (msg) => {
  return <div style={{ color: "red", fontWeight: "bold" }}>{msg}</div>;
};

const prepareInitValues = (isNew, data) => {
  return {
    productName: isNew ? "" : data.product.productName,
    dayPrice: isNew ? "" : data.product.dayPrice,
    distanceLimitPerDay: isNew
      ? ""
      : data.product.productDetails.distanceLimitPerDay,
    drive: isNew ? "" : data.product.productDetails.drive,
    engine: isNew ? "" : data.product.productDetails.engine,
    gearbox: isNew ? "" : data.product.productDetails.gearbox,
    power: isNew ? "" : data.product.productDetails.power,
    productionYear: isNew ? "" : data.product.productDetails.productionYear,
  };
};

const productSchema = Yup.object().shape({
  productName: Yup.string().required("Wymagane"),
  dayPrice: Yup.number().typeError("Błędna wartość").required("Wymagane"),
  distanceLimitPerDay: Yup.number()
    .typeError("Błędna wartość")
    .required("Wymagane"),
  drive: Yup.string().required("Wymagane"),
  engine: Yup.string().required("Wymagane"),
  gearbox: Yup.string().required("Wymagane"),
  power: Yup.number().typeError("Błędna wartość").required("Wymagane"),
  productionYear: Yup.number().required("Wymagane"),
});

const prepareRequest = (isNew, data, values) => {
  const request = {
    id: isNew ? "" : data.product.id,
    productName: values.productName,
    dayPrice: values.dayPrice,
    productDetails: {
      id: isNew ? "" : data.product.productDetails.id,
      productionYear: values.productionYear,
      engine: values.engine,
      power: values.power,
      drive: values.drive,
      gearbox: values.gearbox,
      distanceLimitPerDay: values.distanceLimitPerDay,
    },
  };
  return request;
};

const host = process.env.REACT_APP_API_ENDPOINT;

const AddEditProductForm = (props) => {
  const { productId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const isNew = props.isNew;
  const data = props.data ? props.data : {};
  const initValues = prepareInitValues(isNew, data);
  const token = useSelector((state) => state.auth.token);

  const sendData = async (request) => {
    return await axios
      .post(`${host}/admin/products/update`, request, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        return { status: result.status, message: result.data.successMessage };
      })
      .catch((err) => {
        if (err.response.status === 400) {
          return {
            status: err.response.status,
            message: err.response.data.errors[0].message,
          };
        } else if (err.response.status === 2000) {
          return {
            status: err.response.status,
            message: err.response.data.message,
          };
        } else {
          throw new Error();
        }
      });
  };

  const onSubmitHandler = async (values, { resetForm }) => {
    const request = prepareRequest(isNew, data, values);
    let response;
    try {
      response = await sendData(request);
      if (response.status === 200) {
        history.push("/admin");
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
        initialValues={initValues}
        onSubmit={onSubmitHandler}
        validationSchema={productSchema}
        validateOnChange={true}
        validateOnBlur={false}
      >
        {({ errors, touched }) => (
          <Form>
            <Container
              style={{
                marginTop: "2%",
              }}
            >
              <Row className="justify-content-md-center">
                <Col lg="2">Nazwa:</Col>
                <Col lg="4">
                  <Field
                    id="productName"
                    name="productName"
                    className="form-control"
                    placeholder="Nazwa"
                  />
                  {errors.productName &&
                    touched.productName &&
                    printError(errors.productName)}
                </Col>
                <Col lg="2">Opłata dobowa:</Col>
                <Col lg="1">
                  <Field
                    id="dayPrice"
                    name="dayPrice"
                    className="form-control"
                    placeholder="Opłata dobowa"
                  />
                  {errors.dayPrice &&
                    touched.dayPrice &&
                    printError(errors.dayPrice)}
                </Col>
              </Row>
              <Row
                style={{ marginTop: "1%" }}
                className="justify-content-md-center"
              >
                <Col lg="2">Skrzynia:</Col>
                <Col lg="4">
                  <Field
                    id="gearbox"
                    name="gearbox"
                    className="form-control"
                    placeholder="Skrzynia"
                  />
                  {errors.gearbox &&
                    touched.gearbox &&
                    printError(errors.gearbox)}
                </Col>
                <Col lg="2">Napęd:</Col>
                <Col lg="1">
                  <Field
                    id="drive"
                    name="drive"
                    className="form-control"
                    placeholder="Napęd"
                  />
                  {errors.drive && touched.drive && printError(errors.drive)}
                </Col>
              </Row>
              <Row
                style={{ marginTop: "1%" }}
                className="justify-content-md-center"
              >
                <Col lg="2">Silnik:</Col>
                <Col lg="1">
                  <Field
                    id="engine"
                    name="engine"
                    className="form-control"
                    placeholder="Silnik"
                  />
                  {errors.engine && touched.engine && printError(errors.engine)}
                </Col>
                <Col lg="2">Moc (KM):</Col>
                <Col lg="1">
                  <Field
                    id="power"
                    name="power"
                    className="form-control"
                    placeholder="Moc (KM)"
                  />
                  {errors.power && touched.power && printError(errors.power)}
                </Col>
                <Col lg="2">Rok produkcji:</Col>
                <Col lg="1">
                  <Field
                    id="productionYear"
                    name="productionYear"
                    className="form-control"
                    placeholder="Rok produkcji"
                  />
                  {errors.productionYear &&
                    touched.productionYear &&
                    printError(errors.productionYear)}
                </Col>
              </Row>
              <Row
                style={{ marginTop: "1%" }}
                className="justify-content-md-center"
              >
                <Col lg="2">Limik (KM) dzienny:</Col>
                <Col lg="1">
                  <Field
                    id="distanceLimitPerDay"
                    name="distanceLimitPerDay"
                    className="form-control"
                    placeholder="Limit KM"
                  />
                  {errors.distanceLimitPerDay &&
                    touched.distanceLimitPerDay &&
                    printError(errors.distanceLimitPerDay)}
                </Col>
                <Col lg="2"></Col>
                <Col lg="1"></Col>
                <Col lg="2"></Col>
                <Col lg="1"></Col>
              </Row>
              <Row>
                <Col>
                  <Button
                    variant="outlined"
                    type="submit"
                    size="lg"
                    style={{ marginTop: "2%", marginLeft: "81%" }}
                  >
                    Zapisz
                  </Button>
                </Col>
              </Row>
              <Row
                className="justify-content-md-center"
                style={{ marginTop: "1%" }}
              >
                <Col lg="6">
                  <input
                    type="file"
                    className="form-control"
                    name="file"
                    onChange={(e) => {
                      const formData = new FormData();
                      formData.append("file", e.target.files[0]);
                      props.onUpload(productId, formData);
                      e.currentTarget.value = null;
                    }}
                    disabled={!data.product}
                  />
                </Col>
              </Row>
              <Row>
                {!!data.product &&
                  data.product.cloudinaryIds.map((id) => {
                    return (
                      <Col xs={6} md={4} style={{ marginTop: "2%" }}>
                        <EditImage
                          imgId={id.cloudinaryId}
                          productId={productId}
                          onDelete={props.onDelete}
                        />
                      </Col>
                    );
                  })}
              </Row>
            </Container>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddEditProductForm;
