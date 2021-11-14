import { useEffect, useState } from "react";
import { alertActions } from "../../store/alert-slice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import UsersTable from "../../components/Admin/UsersTable";

const host = process.env.REACT_APP_API_ENDPOINT;

const AdminUsersListPage = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(async () => {
    setIsLoading(true);
    setIsError(false);
    await axios
      .get(`${host}/admin/user/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((r) => {
        setData(r.data);
      })
      .catch((err) => {
        setIsError(true);
        dispatch(
          alertActions.showAlert({
            msg: err.response.data.errors[0].message,
            flag: true,
            status: "fail",
          })
        );
      });
    setIsLoading(false);
  }, []);

  return (
    <div>
      {!isLoading && !isError && data && <UsersTable list={data.users} />}
    </div>
  );
};

export default AdminUsersListPage;
