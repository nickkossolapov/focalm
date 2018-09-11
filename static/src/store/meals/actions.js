import axios from 'axios';
import {FETCH_MEALS} from "./types";

const ROOT_URL = process.env.API_URL;

export const fetchMeals = () =>  async (dispatch) => {
  try {
    const response = await axios.get(ROOT_URL + '/meals/');
    console.log(response);

    // dispatch({
    //   type: FETCH_MEALS,
    //   payload: response.data
    // });
  } catch (err) {
    console.log(err);
  }
}
