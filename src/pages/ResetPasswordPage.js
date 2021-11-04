import { useParams } from "react-router";
import PopupResetPassword from "../components/Dialogs/PopupResetPassword";

const ResetPasswordPage = () => {
  const { uuid, userId } = useParams();
  return <PopupResetPassword uuid={uuid} userId={userId} />;
};

export default ResetPasswordPage;
