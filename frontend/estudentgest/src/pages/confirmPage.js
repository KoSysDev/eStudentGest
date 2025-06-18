// ConfirmEmail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import eStudentGestLogo from '../img/eStudentGest_Logo.PNG';

const ConfirmEmailPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (token) {
      axios.get(`${process.env.REACT_APP_AUTH_API_URL}/confirm/${token}`)
      .then(response => {
        setMessage('Email confirmé✅. Redirection dans 3s ...');
        // Enregistrer le token JWT dans le stockage local
        localStorage.setItem('token', response.data.token);
        // Rediriger vers la page d'accueil ou le tableau de bord
        setTimeout(() => {
          navigate('/login');
        }, 3000); // Rediriger après 3 secondes
      })
      .catch(error => {
        console.error(error);
        setMessage('Le lien de confirmation est invalide ou a expiré.❌');
      });
    }
  }, [token, navigate]);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      textAlign: "center",
      width: "30dvw",
      height: "20dvh",
      border: "1px solid white",
      borderLeftColor: "red",
      borderTopColor: "green",
      boxShadow: "1px 1px 1px 2px",
      position: "absolute", top: "5%", left: "35%",
      backgroundColor: "white",
    }}>
      <img src={eStudentGestLogo} alt='railway logo' style={{width: "110px", height: "auto", marginLeft: "35%"}}/>
      <h4>Confirmation de l'email</h4>
      <p>{message}</p>
    </div>
  );
};

export default ConfirmEmailPage;
