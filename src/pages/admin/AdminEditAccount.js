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
        <RegisterForm isNew={false} data={data} onUpdate={setData} />
        {printRow("Hasło")}
        <ResetPasswordLoggedForm
          onChangePassword={onChangePassword}
          forOtherUser={false}
        />
        {printRow("Pozostałe")}
        <UserControllForm data={data} onUpdate={setData} />
      </div>
    );
  };

  useEffect(async () => {
    setIsLoading(true);
    await axios
      .get(`${host}/api/react/user/info`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrd2xhem85QGdtYWlsLmNvbSIsImF1dGhvcml0aWVzIjpbeyJhdXRob3JpdHkiOiJST0xFX0FETUlOIn1dLCJpYXQiOjE2MzY1Mjc5NzgsImV4cCI6MTYzNjU4NTIwMH0.7bqMHxmCDt_O3QHTgsOoiuMXef3LCUDcmPOTglHsmK2RVlDwoIh1WsJO0A_RS9yJIyMHUsYv0RETtnNJhUi51A`,
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