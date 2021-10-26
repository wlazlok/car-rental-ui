import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { alertActions } from "../store/alert-slice";
import PricesTable from "../components/Table/PricesTable";

const PricesPage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [response, setResponse] = useState(null);
  const host = process.env.REACT_APP_API_ENDPOINT;

  useEffect(() => {
    const fetchProductDetails = async () => {
      setIsLoading(true);
      setIsError(false);
      await axios
        .get(`${host}/api/react/product/prices`)
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

  return (
    <div style={{ marginLeft: "25%", marginRight: "25%" }}>
      {!isLoading &&
        !isError &&
        response &&
        response.productPrices.map((item) => {
          return (
            <PricesTable
              key={item.productName}
              price={item.dayPrice}
              name={item.productName}
            />
          );
        })}
    </div>
  );
};

export default PricesPage;
