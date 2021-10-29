import axios from "axios";
import { useEffect, useState } from "react";
import { alertActions } from "../store/alert-slice";
import { useDispatch } from "react-redux";

const useProductCard = () => {
  const [response, setResponse] = useState({ errors: null, cardItems: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const host = process.env.REACT_APP_API_ENDPOINT;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);

      await axios
        .get(`${host}/api/react/products`, {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGhvcml0aWVzIjpbeyJhdXRob3JpdHkiOiJST0xFX0FETUlOIn1dLCJpYXQiOjE2MzU0MTAxNTUsImV4cCI6MTYzNjIzOTYwMH0.0JmazlAo3VU-PAHfRQXqgtgxNhyFUL0YHyRhQTOreh3AxE7DyhIUplWQ2czp23L-nkXLw7kULCEYxhDYrwrLGA",
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

    fetchData();
  }, []);

  return { isLoading, response, isError };
};

export default useProductCard;
