import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { alertActions } from "../../store/alert-slice";
import axios from "axios";
import Divider from "@mui/material/Divider";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import ResetPasswordLoggedForm from "../../components/ResetPasswordForm/ResetPasswordLoggedForm";
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

const AdminEditUserAccountPage = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const history = useHistory();
  const { userId } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const renderForm = () => {
    return (
      <div>
        {printRow("Moje dane")}
        <RegisterForm isNew={false} data={data} onUpdate={setData} />
        {printRow("Hasło")}
        <ResetPasswordLoggedForm
          onChangePassword={onChangePassword}
          forOtherUser={true}
          userId={data.id}
        />
        {printRow("Pozostałe")}
        <UserControllForm data={data} onUpdate={setData} forOtherUser={true} />
      </div>
    );
  };

  const onChangePassword = () => {
    dispatch(
      alertActions.showAlert({
        msg: "Hasło zmienione",
        flag: true,
        status: "ok",
      })
    );
  };

  useEffect(async () => {
    setIsLoading(true);
    await axios
      .get(`${host}/admin/user?uId=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((r) => {
        setData(r.data);
      })
      .catch((err) => {
        dispatch(
          alertActions.showAlert({
            msg: err.response.data.errors[0].message,
            flag: true,
            status: "fail",
          })
        );
        history.push("/admin/users");
      });
    setIsLoading(false);
  }, []);

  return <div>{!isLoading && data && renderForm()}</div>;
};

export default AdminEditUserAccountPage;
