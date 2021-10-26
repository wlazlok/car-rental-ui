import axios from "axios";
import { useEffect, useState } from "react";
import { alertActions } from "../store/alert-slice";
import { useDispatch } from "react-redux";

const useHttp = (url, method) => {
  const [response, setResponse] = useState({ errors: null, response: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();

  const config = {
    method: method,
    url: `http://localhost:9010${url}`,
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);

      await axios(config)
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

export default useHttp;
