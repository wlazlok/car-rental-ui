import axios from "axios";
import { useEffect, useState } from "react";
import { alertActions } from "../store/alert-slice";
import { useDispatch } from "react-redux";

const useProductCard = () => {
  const [response, setResponse] = useState({ errors: null, cardItems: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);

      await axios
        .get("http:///localhost:9010/api/react/products")
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

    fetchData();
  }, []);

  return { isLoading, response, isError };
};

export default useProductCard;
