import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { alertActions } from "../../store/alert-slice";
import axios from "axios";
import AddEditProductForm from "../../components/Admin/AddEditProductForm/AddEditProductForm";

const AdminEditProductPage = (props) => {
  const { productId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [response, setResponse] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductDetails = async () => {
      setIsLoading(true);
      setIsError(false);
      await axios
        .get(`http://localhost:9010/admin/products/${productId}`)
        .then((result) => {
          setResponse(result.data);
        })
        .catch((err) => {
          setIsError(true);
          dispatch(
            alertActions.showAlert({
              msg: "Wystąpił błąd podczas pobierania danych",
              flag: true,
              status: "fail",
            })
          );
        });
      setIsLoading(false);
    };

    fetchProductDetails();
  }, []);

  if (!isLoading) {
    console.log(response);
  }

  return (
    <div>
      {!isLoading && !isLoading && response && (
        <AddEditProductForm isNew={false} data={response} />
      )}
    </div>
  );
};

export default AdminEditProductPage;
