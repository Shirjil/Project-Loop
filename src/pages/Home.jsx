import { useEffect, useState } from "react";

import FeedbackForm from "./FeedbackForm";
import ViewFeedback from "./ViewFeedback";
import PieChart from "./PieChart";

import { getAllFeedback } from "../services/api";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

export default function Home() {
    const [feedbackList, setFeedbackList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");
    const [currentTime, setCurrentTime] = useState(new Date());



    const loadFeedback = () => {

        setLoading(true);

        getAllFeedback()
            .then((res) => {
                setFeedbackList(res.data);
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setLoading(false);
            });

    };

    useEffect(() => {
        loadFeedback();
    }, []);
    useEffect(() => {

        const timer = setInterval(() => {

            setCurrentTime(new Date());

        }, 1000);

        return () => clearInterval(timer);

    }, []);

    const filteredFeedback = feedbackList.filter((item) => {

        const matchesSearch = item.customerName
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesFilter =
            filter === "All" ||
            item.sentiment.trim().toLowerCase() === filter.toLowerCase();

        return matchesSearch && matchesFilter;
    });

    const positive = filteredFeedback.filter(
        (f) => f.sentiment === "Positive"
    ).length;

    const neutral = filteredFeedback.filter(
        (f) => f.sentiment === "Neutral"
    ).length;

    const negative = filteredFeedback.filter(
        (f) => f.sentiment === "Negative"
    ).length;
    const trendMap = {};

    feedbackList.forEach((item) => {

        if (item.createdAt) {

            const date = new Date(item.createdAt).toLocaleDateString();

            trendMap[date] = (trendMap[date] || 0) + 1;
        }

    });

    const lineData = Object.keys(trendMap).map((date) => ({
        date,
        Feedback: trendMap[date],
    }));
    // AI Keyword Analysis

    const positiveWords = [
        "good",
        "great",
        "excellent",
        "awesome",
        "amazing",
        "happy",
        "love",
        "best",
        "nice"
    ];

    const negativeWords = [
        "bad",
        "poor",
        "worst",
        "terrible",
        "hate",
        "sad",
        "angry",
        "worried",
        "disappointed"
    ];

    const topPositive = [];
    const topNegative = [];

    feedbackList.forEach((item) => {

        const text = item.feedback.toLowerCase();

        positiveWords.forEach((word) => {
            if (text.includes(word) && !topPositive.includes(word)) {
                topPositive.push(word);
            }
        });

        negativeWords.forEach((word) => {
            if (text.includes(word) && !topNegative.includes(word)) {
                topNegative.push(word);
            }
        });

    });

    return (
        <>
            {
                loading ? (

                    <div
                        className="d-flex justify-content-center align-items-center"
                        style={{height:"100vh"}}
                    >

                        <div className="text-center">

                            <div
                                className="spinner-border text-primary"
                                style={{
                                    width:"5rem",
                                    height:"5rem"
                                }}
                            ></div>

                            <h3 className="mt-4">
                                Loading Project LOOP...
                            </h3>

                        </div>

                    </div>

                ) : (
                    <div
                        className="container-fluid py-4"
                        style={{ minHeight: "100vh" }}
                    >

                        {/* Header */}
                        {/* Header */}

                        <div
                            className="text-white p-5 rounded shadow-lg mb-4"
                            style={{
                                background: "linear-gradient(90deg,#2563eb,#4f46e5)"
                            }}
                        >

                            <div className="d-flex justify-content-between align-items-center">

                                <div>

                                    <h1 className="fw-bold">
                                        ⭐ LOOP Feedback System
                                    </h1>

                                    <p className="mb-0">
                                        AI Powered Customer Feedback Analysis
                                    </p>

                                </div>

                                <div className="text-end">

                                    <h5>
                                        📅 {currentTime.toLocaleDateString()}
                                    </h5>

                                    <h4 className="fw-bold">
                                        🕒 {currentTime.toLocaleTimeString()}
                                    </h4>

                                </div>

                            </div>

                        </div>
                        {/* System Status */}

                        <div className="row mb-4">

                            <div className="col-md-3">

                                <div className="card shadow border-0">

                                    <div className="card-body text-center">

                                        <h6>🟢 Backend</h6>

                                        <span className="badge bg-success">
                    Connected
                </span>

                                    </div>

                                </div>

                            </div>

                            <div className="col-md-3">

                                <div className="card shadow border-0">

                                    <div className="card-body text-center">

                                        <h6>🗄 Database</h6>

                                        <span className="badge bg-success">
                    PostgreSQL
                </span>

                                    </div>

                                </div>

                            </div>

                            <div className="col-md-3">

                                <div className="card shadow border-0">

                                    <div className="card-body text-center">

                                        <h6>🤖 AI Engine</h6>

                                        <span className="badge bg-primary">
                    Active
                </span>

                                    </div>

                                </div>

                            </div>

                            <div className="col-md-3">

                                <div className="card shadow border-0">

                                    <div className="card-body text-center">

                                        <h6>⚡ Status</h6>

                                        <span className="badge bg-warning text-dark">
                    Live
                </span>

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* Dashboard */}
                        <div id="dashboard" className="row text-center mb-5">

                            <div className="col-md-3 mb-3">
                                <div
                                    className="card text-white shadow-lg"
                                    style={{
                                        background:
                                            "linear-gradient(135deg,#2563eb,#1d4ed8)"
                                    }}
                                >
                                    <div className="card-body">
                                        <h5>Total Feedback</h5>
                                        <h2>{feedbackList.length}</h2>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3 mb-3">
                                <div
                                    className="card text-white shadow-lg"
                                    style={{
                                        background:
                                            "linear-gradient(135deg,#22c55e,#15803d)"
                                    }}
                                >
                                    <div className="card-body">
                                        <h5>😊 Positive</h5>
                                        <h2>{positive}</h2>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3 mb-3">
                                <div
                                    className="card shadow-lg"
                                    style={{
                                        background: "linear-gradient(135deg,#facc15,#f59e0b)",
                                        color: "#000",
                                    }}
                                >
                                    <div className="card-body">
                                        <h5>😐 Neutral</h5>
                                        <h2>{neutral}</h2>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3 mb-3">
                                <div
                                    className="card text-white shadow-lg"
                                    style={{
                                        background: "linear-gradient(135deg,#ef4444,#b91c1c)"
                                    }}
                                >
                                    <div className="card-body">
                                        <h5>😞 Negative</h5>
                                        <h2>{negative}</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="text-end mb-4">


                            </div>

                        </div>

                        {/* Search */}
                        <div className="row mb-4">
                            <div className="col-md-6 mx-auto">
                                <input
                                    type="text"
                                    className="form-control form-control-lg shadow"
                                    placeholder="🔍 Search Customer..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="text-center mb-4">

                            <button
                                className={`btn me-2 ${
                                    filter === "All"
                                        ? "btn-dark"
                                        : "btn-outline-dark"
                                }`}
                                onClick={() => setFilter("All")}
                            >
                                All
                            </button>

                            <button
                                className={`btn me-2 ${
                                    filter === "Positive"
                                        ? "btn-success"
                                        : "btn-outline-success"
                                }`}
                                onClick={() => setFilter("Positive")}
                            >
                                😊 Positive
                            </button>

                            <button
                                className={`btn me-2 ${
                                    filter === "Neutral"
                                        ? "btn-warning"
                                        : "btn-outline-warning"
                                }`}
                                onClick={() => setFilter("Neutral")}
                            >
                                😐 Neutral
                            </button>

                            <button
                                className={`btn ${
                                    filter === "Negative"
                                        ? "btn-danger"
                                        : "btn-outline-danger"
                                }`}
                                onClick={() => setFilter("Negative")}
                            >
                                😞 Negative
                            </button>

                        </div>

                        {/* Charts */}
                        <div className="row mb-5">

                            <div className="col-lg-6 mb-4">

                                <PieChart
                                    positive={positive}
                                    neutral={neutral}
                                    negative={negative}
                                />

                            </div>

                            <div className="col-lg-6 mb-4">

                                <div className="card shadow-lg p-4 rounded-4">

                                    <h4 className="text-center mb-4">
                                        📊 Feedback Statistics
                                    </h4>

                                    <ResponsiveContainer width="100%" height={320}>
                                        <BarChart
                                            data={[
                                                { name: "Positive", value: positive },
                                                { name: "Neutral", value: neutral },
                                                { name: "Negative", value: negative },
                                            ]}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />

                                            <XAxis dataKey="name" />

                                            <YAxis />

                                            <Tooltip />

                                            <Legend />

                                            <Bar
                                                dataKey="value"
                                                fill="#2563eb"
                                                radius={[10, 10, 0, 0]}
                                            />

                                        </BarChart>
                                    </ResponsiveContainer>

                                </div>

                            </div>

                        </div>
                        {/* Line Chart */}

                        <div className="row mb-5">

                            <div className="col-lg-12">

                                <div className="card shadow-lg p-4 rounded-4">

                                    <h4 className="text-center mb-4">
                                        📈 Feedback Trend Analysis
                                    </h4>

                                    <ResponsiveContainer width="100%" height={350}>
                                        <LineChart data={lineData}>

                                            <CartesianGrid strokeDasharray="3 3" />

                                            <XAxis dataKey="date" />

                                            <YAxis />

                                            <Tooltip />

                                            <Legend />

                                            <Line
                                                type="monotone"
                                                dataKey="Feedback"
                                                stroke="#2563eb"
                                                strokeWidth={4}
                                                dot={{ r: 6 }}
                                                activeDot={{ r: 8 }}
                                            />

                                        </LineChart>
                                    </ResponsiveContainer>

                                </div>

                            </div>

                        </div>
                        {/* AI Insights */}

                        <div className="card shadow-lg p-4 mb-5">

                            <h3 className="text-center text-primary mb-4">
                                🤖 AI Insights
                            </h3>

                            <div className="row text-center">

                                <div className="col-md-4">
                                    <div className="card border-success shadow-sm">
                                        <div className="card-body">
                                            <h5>😊 Overall Sentiment</h5>

                                            <h3 className="text-success">
                                                {positive >= negative
                                                    ? "Positive"
                                                    : "Negative"}
                                            </h3>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="card border-primary shadow-sm">
                                        <div className="card-body">
                                            <h5>⭐ Customer Satisfaction</h5>

                                            <h3 className="text-primary">
                                                {feedbackList.length === 0
                                                    ? "0%"
                                                    : Math.round(
                                                    (positive /
                                                        feedbackList.length) *
                                                    100
                                                ) + "%"}
                                            </h3>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="card border-warning shadow-sm">
                                        <div className="card-body">
                                            <h5>💡 Recommendation</h5>

                                            <p className="mb-0">
                                                {negative > positive
                                                    ? "Improve customer support and service quality."
                                                    : "Customers are satisfied. Maintain the current quality."}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div className="row mb-5">

                            <div className="col-md-6">

                                <div className="card shadow-lg border-success">

                                    <div className="card-body">

                                        <h4 className="text-success text-center mb-3">
                                            😊 Top Positive Keywords
                                        </h4>

                                        {
                                            topPositive.length === 0 ?

                                                <p className="text-center text-muted">
                                                    No positive keywords found.
                                                </p>

                                                :

                                                topPositive.map((word, index) => (

                                                    <span
                                                        key={index}
                                                        className="badge bg-success m-2 p-2"
                                                    >
                                {word}
                            </span>

                                                ))
                                        }

                                    </div>

                                </div>

                            </div>

                            <div className="col-md-6">

                                <div className="card shadow-lg border-danger">

                                    <div className="card-body">

                                        <h4 className="text-danger text-center mb-3">
                                            😞 Top Negative Keywords
                                        </h4>

                                        {
                                            topNegative.length === 0 ?

                                                <p className="text-center text-muted">
                                                    No negative keywords found.
                                                </p>

                                                :

                                                topNegative.map((word, index) => (

                                                    <span
                                                        key={index}
                                                        className="badge bg-danger m-2 p-2"
                                                    >
                                {word}
                            </span>

                                                ))
                                        }

                                    </div>

                                </div>

                            </div>

                        </div>
                        <div className="card shadow-lg mb-5">

                            <div className="card-body">

                                <h4 className="text-center">
                                    ⭐ Customer Satisfaction
                                </h4>

                                <div className="progress mt-4" style={{height:"30px"}}>

                                    <div
                                        className="progress-bar bg-success"
                                        style={{
                                            width:
                                                feedbackList.length === 0
                                                    ? "0%"
                                                    : `${Math.round((positive/feedbackList.length)*100)}%`
                                        }}
                                    >

                                        {
                                            feedbackList.length===0
                                                ? "0%"
                                                : `${Math.round((positive/feedbackList.length)*100)}%`
                                        }

                                    </div>

                                </div>

                            </div>

                        </div>
                        {/* AI Summary */}

                        <div className="card shadow-lg border-primary mb-5">

                            <div className="card-body">

                                <h3 className="text-primary text-center mb-4">
                                    🤖 AI Feedback Summary
                                </h3>

                                <p className="fs-5">

                                    <strong>Total Feedback :</strong> {feedbackList.length}

                                    <br /><br />

                                    <strong>Positive :</strong> {positive}

                                    <br />

                                    <strong>Neutral :</strong> {neutral}

                                    <br />

                                    <strong>Negative :</strong> {negative}

                                    <br /><br />

                                    <strong>AI Observation :</strong>

                                    <br />

                                    {
                                        positive > negative
                                            ? "Overall customer satisfaction is excellent. Customers appreciate the service quality."
                                            : negative > positive
                                                ? "Customer satisfaction is low. Immediate improvement in service quality is recommended."
                                                : "Customer opinions are balanced. Further feedback is recommended."
                                    }

                                </p>

                            </div>

                        </div>
                        {/* Recent Activity */}

                        <div className="card shadow-lg p-4 rounded-4 mb-5">

                            <h4 className="mb-4">
                                📋 Recent Activity
                            </h4>

                            {

                                feedbackList
                                    .slice()
                                    .reverse()
                                    .slice(0,5)
                                    .map((item) => (

                                        <div
                                            key={item.id}
                                            className="d-flex justify-content-between align-items-center border-bottom py-2"
                                        >

                                            <div>

                                                <strong>

                                                    {item.sentiment === "Positive" ? "🟢" :

                                                        item.sentiment === "Negative" ? "🔴" : "🟡"}

                                                    {" "}

                                                    {item.customerName}

                                                </strong>

                                                <br />

                                                <small className="text-muted">

                                                    Submitted {item.sentiment} Feedback

                                                </small>

                                            </div>

                                            <span className="badge bg-secondary">

                        #{item.id}

                    </span>

                                        </div>

                                    ))

                            }

                        </div>

                        {/* Main Section */}

                        <div id="feedback" className="row">

                            <div className="col-lg-5 mb-4">
                                <FeedbackForm refresh={loadFeedback} />
                            </div>

                            <div className="col-lg-7">
                                <ViewFeedback
                                    feedbackList={filteredFeedback}
                                    refresh={loadFeedback}
                                />
                            </div>

                        </div>

                        <hr className="mt-5" />

                        <footer className="text-center text-muted pb-3">
                            <h6 className="fw-bold">
                                Project LOOP
                            </h6>

                            <p className="mb-1">
                                AI Powered Customer Feedback Analysis System
                            </p>

                            <small>
                                Developed by <strong>Mohd Shirjil Kamran</strong> | Project LOOP © 2026
                            </small>

                        </footer>

                    </div>

                )

            }

        </>
    );
}
