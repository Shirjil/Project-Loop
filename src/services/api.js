import axios from "axios";

const API = axios.create({
    baseURL: "https://project-loop-backend-1.onrender.com" ,
});

export const submitFeedback = (feedback) =>
    API.post("/feedback", feedback);

export const getAllFeedback = () =>
    API.get("/feedback");
export const deleteFeedback = (id) =>
    API.delete(`/feedback/${id}`);
export const updateFeedback = (id, feedback) =>
    API.put(`/feedback/${id}`, feedback);