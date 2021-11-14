import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { alertActions } from "../../store/alert-slice";
import { authActions } from "../../store/auth-slice";
import { useSelector } from "react-redux";
import AdminProductsTable from "../../components/Table/AdminProductsTable";
import axios from "axios";

const host = process.env.REACT_APP_API_ENDPOINT;

const ProductsPage = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState(null);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchpProductList = async () => {
      setIsLoading(true);
      setIsError(false);
      await axios
        .get(`${host}/admin/products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
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
    fetchpProductList();
  }, []);

  const deleteProduct = async (productId) => {
    await axios
      .delete(`${host}/admin/products/delete/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setResponse(result.data);
        dispatch(
          alertActions.showAlert({
            msg: `${result.data.successMessage}`,
            flag: true,
            status: "ok",
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

  return (
    <div>
      {!isLoading &&
        !isError &&
        response.products &&
        response.products.length > 0 && (
          <AdminProductsTable
            list={response.products}
            onDeleteProduct={deleteProduct}
          />
        )}
    </div>
  );
};

export default ProductsPage;
