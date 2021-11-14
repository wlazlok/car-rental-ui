import { Row, Col } from "react-bootstrap";
import { editAccountControllHandler } from "../../utils/AccountUtils";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { alertActions } from "../../store/alert-slice";

const names = ["enabled", "credentialsNonExpired", "accountNonExpired"];

const getLabelByName = (name) => {
  switch (name) {
    case "enabled":
      return "Konto aktywne";
    case "credentialsNonExpired":
      return "Uprawnienia wygasły";
    case "accountNonExpired":
      return "Konto wygasło";
  }
};

const UserControllForm = (props) => {
  const history = useHistory();
  const data = props.data;
  const dispatch = useDispatch();
  const forOtherUser = props.forOtherUser;
  const token = useSelector((state) => state.auth.token);

  const onClickHandler = async (key) => {
    const result = await editAccountControllHandler(
      key.target.value,
      data.id,
      token
    );
    if (result.status === 400) {
      dispatch(
        alertActions.showAlert({
          msg: result.data.errors[0].message,
          flag: true,
          status: "fail",
        })
      );
      history.push("/admin/users");
      return;
    }
    props.onUpdate(result);
  };

  return (
    <div>
      <Row className="justify-content-md-center">
        {names.map((key) => {
          return (
            <Col xs={2} md={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    value={key}
                    checked={key === "enabled" ? data[key] : !data[key]}
                    onClick={onClickHandler}
                  />
                }
                label={getLabelByName(key)}
              />
            </Col>
          );
        })}
      </Row>
      {forOtherUser && (
        <Row className="justify-content-md-center">
          <Col sm={6}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Rola
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                defaultValue={data.role}
                onChange={onClickHandler}
                label="Rola"
              >
                <MenuItem value={"USER"}>USER</MenuItem>
                <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
              </Select>
            </FormControl>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default UserControllForm;
