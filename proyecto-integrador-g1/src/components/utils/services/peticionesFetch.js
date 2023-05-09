import axios from "axios";
import { useParams } from "react-router-dom";

// export const URL_BASE =
//   "http://ec2-18-191-163-70.us-east-2.compute.amazonaws.com:8080/";
export const URL_BASE = "http://localhost:8080";

export async function getAPI(endPoint) {
  try {
    const response = await fetch(`${URL_BASE}/${endPoint}`);
    const responseDataJson = await response.json();
    return responseDataJson;
  } catch (e) {
    console.error("Hubo un error al recibir los datos", e);
  }
}

export async function postAPI(endPoint, data, token) {
  try {
    const response = await axios.post(`${URL_BASE}/${endPoint}`, data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (e) {
    console.error(e);
  }
}

export async function postAPIProductos(endPoint, data) {
  try {
    const response = await axios.post(`${URL_BASE}/${endPoint}`, data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return response;
  } catch (e) {
    console.error(e);
  }
}