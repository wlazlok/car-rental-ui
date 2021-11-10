import axios from "axios";

const host = process.env.REACT_APP_API_ENDPOINT;

export const editAccountControllHandler = async (key, userId, token) => {
  return await axios
    .post(`${host}/admin/user/control?type=${key}&uId=${userId}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((r) => {
      return r.data;
    })
    .catch((err) => {
      console.log(err.response);
    });
};
