import React from "react";

export default function Navbar() {
    return (
        <nav
            className="navbar navbar-expand-lg navbar-dark shadow sticky-top"
            style={{
                background: "linear-gradient(90deg, #0d6efd, #4f46e5)",
            }}
        >
            <div className="container">
                <a className="navbar-brand fw-bold fs-3" href="#">
                    ⭐ LOOP
                </a>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <a className="nav-link active" href="#">
                                🏠 Home
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#dashboard">
                                📊 Dashboard
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#feedback">
                                💬 Feedback
                            </a>
                        </li>
                    </ul>

                    <span className="text-white fw-bold">
            👤 Mohd Shirjil Kamran
          </span>
                </div>
            </div>
        </nav>
    );
}