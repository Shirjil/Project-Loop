import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080/api",
});

export const submitFeedback = (feedback) =>
    API.post("/feedback", feedback);

export const getAllFeedback = () =>
    API.get("/feedback");
export const deleteFeedback = (id) =>
    API.delete(`/feedback/${id}`);
export const updateFeedback = (id, feedback) =>
    API.put(`/feedback/${id}`, feedback);