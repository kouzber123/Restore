import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";

//delay effect

const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

//this will be used as url for axios as basis
axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.withCredentials = true;
//arrow func = concise
const responseBody = (response: AxiosResponse) => response.data;

//axios intercepter
axios.interceptors.response.use(
  async response => {
    await sleep();
    return response;
  },
  (error: AxiosError) => {
    //over write ts with ! because we know there is response at this point
    const { data, status } = error.response!;
    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateErrors: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(data.errors[key]);
            }
          }
          throw modelStateErrors.flat();
        }
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title);
        break;

      case 500:
        history.push({
          pathname: "/server-error",
          state: { error: data }
        });
        break;

      default:
        break;
    }
    return Promise.reject(error.response);
  }
);

//the url > base url
const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody)
};

//here we add endpoint
//catalog object list : get all
const Catalog = {
  list: () => requests.get("products"),
  details: (id: number) => requests.get(`products/${id}`)
};

const TestErrors = {
  get400Error: () => requests.get("buggy/bad-request"),
  get401Error: () => requests.get("buggy/unauthorised"),
  get404Error: () => requests.get("buggy/not-found"),
  get500Error: () => requests.get("buggy/server-error"),
  getValidationError: () => requests.get("buggy/validation-error")
};

const Basket = {
  get: () => requests.get("basket"),
  addItem: (productId: number, quantity = 1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
  removeItem: (productId: number, quantity = 1) => requests.delete(`basket?productId=${productId}&quantity=${quantity}`)
};

//then we can create an agent so we have simple access to the http requests
const agent = {
  Catalog,
  TestErrors,
  Basket
};

export default agent;
/* 
get = send url to get data
post = send data to the db, "! we need URL and body content"

*/
