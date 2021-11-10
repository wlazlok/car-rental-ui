import { useEffect, useState } from "react";
import { authActions } from "../../store/auth-slice";
import { useSelector } from "react-redux";
import axios from "axios";
import UsersTable from "../../components/Admin/UsersTable";

const host = process.env.REACT_APP_API_ENDPOINT;

const AdminUsersListPage = () => {
  const token = useSelector((state) => state.auth.token);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    setIsLoading(true);
    await axios
      .get(`${host}/admin/user/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((r) => {
        // console.log(r.data);
        setData(r.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
    setIsLoading(false);
  }, []);

  return <div>{!isLoading && data && <UsersTable list={data.users} />}</div>;
};

export default AdminUsersListPage;
