import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5001/api";

const instance = axios.create({
  baseURL: BASE_URL,
});
export const AnswersService = {
  getAnswers(id) {
    return instance.get(`/answers/${id}`).then((res) => res.data);
  },
};
