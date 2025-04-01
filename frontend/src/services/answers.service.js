import axios from "axios";

const BASE_URL = "http://localhost:5001/api"
	// process.env.REACT_APP_BASE_URL;

const instance = axios.create({
	baseURL: BASE_URL,
});
export const AnswersService = {

	getAnswers(id) {
		return instance.get(`/answers/${id}`).then(res => res.data)
	},



}
