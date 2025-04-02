import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5001/api";

const instance = axios.create({
  baseURL: BASE_URL,
});
export const QuestionariesService = {
  getQuestionaries(page) {
    return instance
      .get(`/questionnaires?page=${page}&limit=10`)
      .then((res) => res.data);
  },

  getQuestionnaire(id) {
    return instance.get(`/questionnaires/${id}`).then((res) => res.data);
  },

  updateQuestionnaire(id, data) {
    return instance.put(`/questionnaires/${id}`, data).then((res) => res.data);
  },

  createQuestionnaire(data) {
    return instance.post(`/questionnaires`, data).then((res) => res.data);
  },

  deleteQuestionary(id) {
    return instance.delete(`/questionnaires/${id}`).then((res) => res.data);
  },

  submitAnswer(id, answers, startTime, finishTime) {
    return instance
      .post(`answers/${id}`, { answers, startTime, finishTime })
      .then((res) => res.data);
  },
};
