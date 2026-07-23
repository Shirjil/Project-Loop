import  { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { deleteFeedback, updateFeedback } from "../services/api";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
function ViewFeedback({ feedbackList, refresh }) {

    const [show, setShow] = useState(false);

    const [editData, setEditData] = useState({
        id: "",
        customerName: "",
        email: "",
        feedback: ""
    });

    const handleClose = () => setShow(false);

    const handleShow = (item) => {
        setEditData({
            id: item.id,
            customerName: item.customerName,
            email: item.email,
            feedback: item.feedback
        });

        setShow(true);
    };

    const handleChange = (e) => {
        setEditData({
            ...editData,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdate = () => {

        updateFeedback(editData.id, {
            customerName: editData.customerName,
            email: editData.email,
            feedback: editData.feedback
        })
            .then(() => {
                handleClose();
                refresh();

                Swal.fire({
                    icon: "success",
                    title: "Updated!",
                    text: "Feedback updated successfully.",
                    timer: 1500,
                    showConfirmButton: false
                });
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {

        Swal.fire({
            title: "Delete Feedback?",
            text: "You won't be able to recover this feedback!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Delete!"
        }).then((result) => {

            if (result.isConfirmed) {

                deleteFeedback(id)
                    .then(() => {

                        refresh();

                        Swal.fire({
                            icon: "success",
                            title: "Deleted!",
                            text: "Feedback deleted successfully.",
                            timer: 1500,
                            showConfirmButton: false
                        });

                    })
                    .catch((err) => {
                        console.log(err);

                        Swal.fire({
                            icon: "error",
                            title: "Oops!",
                            text: "Unable to delete feedback."
                        });
                    });

            }

        });

    };
    const downloadPDF = () => {

        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("Project LOOP - Customer Feedback Report", 14, 20);

        autoTable(doc, {
            startY: 30,
            head: [["Customer", "Email", "Feedback", "Sentiment"]],
            body: feedbackList.map((item) => [
                item.customerName,
                item.email,
                item.feedback,
                item.sentiment,
            ]),
        });

        doc.save("Project_LOOP_Feedback_Report.pdf");
    };
    const downloadExcel = () => {

        const data = feedbackList.map((item) => ({
            Customer: item.customerName,
            Email: item.email,
            Feedback: item.feedback,
            Sentiment: item.sentiment,
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "Feedback");

        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });

        const file = new Blob([excelBuffer], {
            type: "application/octet-stream",
        });

        saveAs(file, "Project_LOOP_Feedback.xlsx");
    };

    return (

        <>
            <div className="card shadow p-4">

                <h3 className="text-center mb-4">
                    📋 Customer Feedback
                </h3>
                <div className="text-end mb-3">

                    <button
                        className="btn btn-success"
                        onClick={downloadPDF}
                    >
                        📄 Download PDF
                    </button>
                    <button
                        className="btn btn-primary ms-2"
                        onClick={downloadExcel}
                    >
                        📊 Export Excel
                    </button>

                </div>

                {feedbackList.length === 0 ? (

                    <p className="text-center text-muted">
                        No feedback available.
                    </p>

                ) : (

                    feedbackList.map((item) => (

                        <div
                            key={item.id}
                            className="card shadow-sm mb-3 p-3 border-0"
                            style={{ borderRadius: "15px" }}
                        >

                            <h4>👤 {item.customerName}</h4>

                            <p>📧 {item.email}</p>

                            <p>💬 {item.feedback}</p>

                            <span
                                className={`badge ${
                                    item.sentiment === "Positive"
                                        ? "bg-success"
                                        : item.sentiment === "Negative"
                                            ? "bg-danger"
                                            : "bg-warning text-dark"
                                }`}
                            >
                                {item.sentiment}
                            </span>

                            <div className="mt-3">

                                <Button
                                    variant="warning"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => handleShow(item)}
                                >
                                    ✏ Edit
                                </Button>

                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    🗑 Delete
                                </Button>

                            </div>

                        </div>

                    ))

                )}

            </div>

            <Modal show={show} onHide={handleClose} centered>

                <Modal.Header closeButton>

                    <Modal.Title>
                        ✏ Update Feedback
                    </Modal.Title>

                </Modal.Header>

                <Modal.Body>

                    <Form>

                        <Form.Group className="mb-3">

                            <Form.Label>Customer Name</Form.Label>

                            <Form.Control
                                name="customerName"
                                value={editData.customerName}
                                onChange={handleChange}
                            />

                        </Form.Group>

                        <Form.Group className="mb-3">

                            <Form.Label>Email</Form.Label>

                            <Form.Control
                                name="email"
                                value={editData.email}
                                onChange={handleChange}
                            />

                        </Form.Group>

                        <Form.Group>

                            <Form.Label>Feedback</Form.Label>

                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="feedback"
                                value={editData.feedback}
                                onChange={handleChange}
                            />

                        </Form.Group>

                    </Form>

                </Modal.Body>

                <Modal.Footer>

                    <Button
                        variant="secondary"
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="primary"
                        onClick={handleUpdate}
                    >
                        Save Changes
                    </Button>

                </Modal.Footer>

            </Modal>
        </>

    );
}

export default ViewFeedback;