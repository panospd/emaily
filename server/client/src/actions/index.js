import axios from "axios";
import { FETCH_USER } from "./types";

export const fetchUser = () => async (dispatch) => {
    const res = await axios.get("/api/current_user");

    dispatch({ type: FETCH_USER, payload: res.data });
};

export const confirmPayment = (confirmationToken) => async (dispatch) => {
    console.log("confirmation token", confirmationToken);
    const res = await axios.post("api/payment/confirm", { confirmationToken });
    console.log(res);
    dispatch({ type: FETCH_USER, payload: res.data });
};
