import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { alertActions } from "../../store/alert-slice";
import { authActions } from "../../store/auth-slice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import ResetPasswordLoggedForm from "../../components/ResetPasswordForm/ResetPasswordLoggedForm";
import Divider from "@mui/material/Divider";
import UserControllForm from "../../components/Admin/UserControllForm";

const host = process.env.REACT_APP_API_ENDPOINT;

const printRow = (text) => {
  return (
    <Row className="justify-content-md-center" style={{ marginTop: "2%" }}>
      <Col sm={6}>
        <h1>{text}</h1>
        <Divider />
      </Col>
    </Row>
  );
};

const AdminEditAccount = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector((state) => state.auth.token);

  const renderForm = () => {
    return (
      <div>
        {printRow("Moje dane")}
        <RegisterForm isNew={false} data={data} onUpdate={updateDataHandler} />
        {printRow("Hasło")}
        <ResetPasswordLoggedForm onChangePassword={onChangePassword} />
        {printRow("Pozostałe")}
        <UserControllForm data={data} onUpdate={editAccountControllHandler} />
      </div>
    );
  };

  useEffect(async () => {
    setIsLoading(true);
    await axios
      .get(`${host}/api/react/user/info`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrd2xhem8xMUBnbWFpbC5jb20iLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9VU0VSIn1dLCJpYXQiOjE2MzY0NzkyNzYsImV4cCI6MTYzNjQ5ODgwMH0.eEZBGjcHnvpTyphuQ1ja-HS8tI-phI1ds9c1VrLPZSNX1w4PegBIAUaZSybxKqvNc7PEZ3vtYh2Oi8UKEZKpvw`,
          // Authorization: `Bearer ${token}`,
        },
      })
      .then((r) => {
        setData(r.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoading(false);
  }, []);

  const updateDataHandler = async (request) => {
    console.log(request);
    await axios
      .post(`${host}/api/react/user/update`, request, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrd2xhem85QGdtYWlsLmNvbSIsImF1dGhvcml0aWVzIjpbeyJhdXRob3JpdHkiOiJST0xFX0FETUlOIn1dLCJpYXQiOjE2MzY0NTUzODUsImV4cCI6MTYzNjQ5ODgwMH0.UhWzL6n2kVhE6fO0zmO-V4vv0iOwOrkcQU9EY8_K_3oc9Ax7B9XroscaW5QMfnGkec1P_7qpvPl5BwK5hQxJ_A`,
          //   Authorization: `Bearer ${token}`,
        },
      })
      .then((r) => {
        setData(r.data);
        dispatch(
          alertActions.showAlert({
            msg: r.data.successMessage,
            flag: true,
            status: "ok",
          })
        );
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

  const editAccountControllHandler = async (key, userId) => {
    console.log(key);
    console.log(userId);
    await axios
      .post(`${host}/admin/user/control?type=${key}&uId=${userId}`)
      .then((r) => {
        console.log(r.data);
        setData(r.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const onChangePassword = () => {
    dispatch(authActions.deleteToken());
    history.push("/");
    dispatch(
      alertActions.showAlert({
        msg: "Hasło zmienione, proszę się zalogować ponownie",
        flag: true,
        status: "ok",
      })
    );
  };
  return <div>{!isLoading && data && renderForm()}</div>;
};

export default AdminEditAccount;
