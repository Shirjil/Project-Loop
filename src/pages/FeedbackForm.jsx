import { useState } from "react";
import { submitFeedback } from "../services/api";
import Swal from "sweetalert2";

export default function FeedbackForm({ refresh }) {

    const [formData, setFormData] = useState({
        customerName: "",
        email: "",
        feedback: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        submitFeedback(formData)
            .then(() => {
                Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "success",
                    title: "Feedback Submitted Successfully",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true
                });

                setFormData({
                    customerName: "",
                    email: "",
                    feedback: ""
                });

                refresh();
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="card shadow-lg p-4 rounded-4 border-0">
            <h2 className="text-center mb-4">
                Submit Feedback
            </h2>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label>Customer Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Feedback</label>
                    <textarea
                        className="form-control"
                        rows="5"
                        name="feedback"
                        value={formData.feedback}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                <button
                    className="btn btn-primary w-100"
                    type="submit"
                >
                    Submit Feedback
                </button>

            </form>
        </div>

    );
}