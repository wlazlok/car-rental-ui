import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Row, Col } from "react-bootstrap";

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
  const data = props.data;

  return (
    <div>
      <Row className="justify-content-md-center">
        {names.map((key) => {
          console.log(data["credentialsNonExpired"]);
          return (
            <Col xs={2} md={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={key === "enabled" ? data[key] : !data[key]}
                    onClick={() => {
                      props.onUpdate(key, data.id);
                    }}
                  />
                }
                label={getLabelByName(key)}
              />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default UserControllForm;
