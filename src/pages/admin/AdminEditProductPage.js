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
  const host = process.env.REACT_APP_API_ENDPOINT;

  useEffect(() => {
    const fetchProductDetails = async () => {
      setIsLoading(true);
      setIsError(false);
      await axios
        .get(`${host}/admin/products/${productId}`)
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

  const uplaodImage = async (productId, formData) => {
    await axios
      .post(`${host}/admin/images/upload/${productId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        setResponse(result.data);
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
  };

  const deleteImage = async (imgId, productId) => {
    await axios
      .delete(`${host}/admin/images/delete?id=${imgId}&pId=${productId}`)
      .then((result) => {
        setResponse(result.data);
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
  };

  return (
    <div>
      {!isLoading && !isLoading && response && (
        <AddEditProductForm
          isNew={false}
          data={response}
          onUpload={uplaodImage}
          onDelete={deleteImage}
        />
      )}
    </div>
  );
};

export default AdminEditProductPage;
