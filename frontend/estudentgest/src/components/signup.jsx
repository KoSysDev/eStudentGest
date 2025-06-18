import React, { useState } from 'react';
import axios from 'axios';
import eStudentGestLogo from '../img/eStudentGest_Logo.PNG';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import '../styles/signup.css'

function Signup() {
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage("");
        setError("");

        const form = document.querySelector("form");
        const container = document.querySelector(".mt-5");

        if (form && container) {
            form.style.visibility = "hidden";
            container.style.height = "40dvh";
        }

        axios.post(`${process.env.REACT_APP_AUTH_API_URL}/signup`, {
            nom,
            prenom,
            email,
            password,
        })
        .then(response => {
            setMessage("Un email de confirmation vous a été envoyé !");
        })
        .catch(err => {
            console.log(err);
            setError(err.response?.data?.message || "Erreur lors de l'inscription");
        })
        .finally(() => {
            setIsLoading(false);
        });
    }

    return (
        <div className="signup" data-aos="fade-left">
            <Link id="signupLink" to="/" className="btn btn-outline-dark" data-aos="fade-down" style={{ position: "absolute", top: "-5%", left: "2%" }}>
                <FontAwesomeIcon icon={faTimes} style={{ fontSize: "20px", color:"red" }} />
            </Link>

            <div id="formContainer" className="container mt-5">
                <div className="text-center mb-4">
                    <img src={eStudentGestLogo} alt="Railway logo" className="img-fluid" style={{ maxWidth: "150px" }} />
                </div>

                <h5 className="text-center mb-4">Création de compte</h5>

                {message && <div className="alert alert-success">{message}</div>}
                {error && <div className="alert alert-danger">{error}</div>}
                {isLoading && <div className="loader mx-auto my-3"></div>}

                <form onSubmit={handleSubmit} data-aos="fade-up">
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="nom" className="form-label">Nom</label>
                            <input type="text" className="form-control" id="nom" value={nom} onChange={(e) => setNom(e.target.value)} required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="prenom" className="form-label">Prénom</label>
                            <input type="text" className="form-control" id="prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Adresse Email</label>
                        <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Mot de passe</label>
                        <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={6} required />
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">Créer mon compte</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
