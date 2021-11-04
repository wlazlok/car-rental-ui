import axios from "axios";
import { useParams } from "react-router";
import { useEffect } from "react";
import { alertActions } from "../store/alert-slice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

const host = process.env.REACT_APP_API_ENDPOINT;

const ActivateUserPage = () => {
  const { uuid, userId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const activate = async () => {
    history.push("/");
    await axios
      .get(`${host}/api/react/user/activate?id=${uuid}&usr=${userId}`)
      .then((result) => {
        console.log(result.data);
        dispatch(
          alertActions.showAlert({
            msg: result.data.successMessage,
            flag: true,
            status: "ok",
          })
        );
      })
      .catch((err) => {
        console.log(err.response.data);
        dispatch(
          alertActions.showAlert({
            msg: err.response.data.errors[0].message,
            flag: true,
            status: "fail",
          })
        );
      });
  };

  useEffect(() => {
    activate();
  }, []);

  return <div></div>;
};

export default ActivateUserPage;
