import axios from 'axios';

axios.defaults.baseURL = "https://reqres.in";

export const makeGetReq = (url) =>
  axios
    .get(url)
    .then((res) => {
      //  @TOOD: call the equivalent reducer
      return res;
    })
    .catch((error) => {
      throw error;
    });
export const makePostReq = (params) =>
  axios
    .post(params.url, params.data)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
export const makeDeleteReq = (url) =>
  axios
    .delete(url)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
export const makePatchReq = (params) =>
  axios
    .patch(params.url, params.data)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
export const logOut = () => {
  localStorage.removeItem('authToken');
};
