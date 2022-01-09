import { Image } from "react-bootstrap";
import { Col, Row, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { alertActions } from "../../store/alert-slice";
import { userInfoActions } from "../../store/userInfo-slice";
import axios from "axios";

const cloudinary_host = process.env.REACT_APP_CLOUDINARY_URL;
const host = process.env.REACT_APP_API_ENDPOINT;

const AvatarPicker = () => {
  const token = useSelector((state) => state.auth.token);
  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

  const uplaodAvatar = async (formData) => {
    await axios
      .post(`${host}/api/react/user/avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((r) => {
        dispatch(
          userInfoActions.saveInfo({
            name: r.data.user.name,
            username: r.data.user.username,
            avatarUrl: r.data.user.avatarUrl,
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
  console.log(userInfo.avatarUrl);
  return (
    <Row className="justify-content-md-center" style={{ marginTop: "1%" }}>
      <Col sm={6}>
        <Image
          src={
            userInfo.avatarUrl !== "" && userInfo.avatarUrl != null
              ? `${cloudinary_host}/v1616604961/${userInfo.avatarUrl}`
              : "https://t3.ftcdn.net/jpg/02/09/37/00/360_F_209370065_JLXhrc5inEmGl52SyvSPeVB23hB6IjrR.jpg"
          }
          style={{ width: "194px", height: "194px" }}
          roundedCircle
        />
      </Col>
      <Row className="justify-content-md-center" style={{ marginTop: "1%" }}>
        <Col sm={6}>
          <input
            type="file"
            className="form-control"
            name="file"
            onChange={(e) => {
              const formData = new FormData();
              formData.append("file", e.target.files[0]);
              uplaodAvatar(formData);
              e.currentTarget.value = null;
            }}
          />
        </Col>
      </Row>
    </Row>
  );
};

export default AvatarPicker;
