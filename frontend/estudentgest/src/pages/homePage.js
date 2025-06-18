import React from "react";
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/homePage.css"
import eStudentGest from "../img/eStudentGest_Logo.PNG";

 function HomePage() {

  //fonction pour animer le rendu des résultats

function ResultCounter({ title, target }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          animateCounter();
          setHasAnimated(true);
        }
      },
      { threshold: 0.6 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [hasAnimated]); // <= bonne dépendance ici

  const animateCounter = () => {
    let start = 0;
    const end = parseFloat(target);
    const duration = 2000; // en ms
    const incrementTime = 20;
    const steps = duration / incrementTime;
    const increment = end / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);
  };

  return (
    <div className="col-md-6 mb-4 text-center" ref={ref}>
      <div className="p-4">
        <h5 className="fw-bold">{title}</h5>
        <p className="display-4 text-success fw-bold">
          {count.toFixed(2)}%
        </p>
      </div>
    </div>
  );
}

  const navigate = useNavigate();

  const makeApply = ()=>{
    navigate('/apply')
  }
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top px-4">
        <a className="navbar-brand d-flex align-items-center" href="/">
         <img src={eStudentGest} alt="eStudent_logo" className="img-fluid" style={{ maxHeight: '40px' }} /> 
        <h6  className="fw-bold" style={{marginLeft: '10px'}}>CPL Saint-Gabriel</h6>

        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" style={{ width: '36px', height: '36px', border: '0px' }}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item mx-2">
              <a className="nav-link" href="/">Accueil </a>
            </li>
            <li className="nav-item mx-2">
              <a className="nav-link" href="/apply"> Demande d'inscription</a>
            </li>
            <li className="nav-item mx-2">
              <a className="nav-link" href="/track">Suivi Dossier</a>
            </li>
            <li className="nav-item dropdown mx-2">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                S'authentifier
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="/signup">Créer un compte</a></li>
                <li><a className="dropdown-item" href="/login">Se connecter</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container-fluid bg-light py-5 border">
        <div className="container text-center">
          <div className="mb-4" >
            <div id="homeFirstImgContainer" className="bg-secondary" style={{borderRadius: "8px" }}></div>
          </div>
          <div className="row">
            <div className="col-md-6 text-start">
              <h2 className="fw-bold">Simplifiez vos inscriptions scolaires en ligne</h2>
            </div>
            <div className="col-md-6">
              <p>
                Notre plateforme vous permet de gérer facilement les demandes
                d’inscription en ligne au complexe scolaire privé Saint Gabriel. Inscrivez-vous dès
                aujourd’hui et suivez l’état de votre demande en temps réel.
              </p>
              <button id="makeApplyBtn" className="btn btn-outline-primary me-2" onClick={makeApply}>Soumettre ma demande</button>
            </div>
          </div>
        </div>
      </section>

{/* Résultats Section */}
<section className="container my-5" data-aos="fade-up">
  <div className="text-center mb-4">
    <h3 className="fw-bold bi-mortarboard-fill"> NOS RÉSULTATS</h3>
    <p className="text-muted">Nous sommes fiers des excellentes performances de nos élèves.</p>
  </div>
  <div className="row justify-content-center">
    <ResultCounter title="Taux de réussite au CEPD" target={100} />
    <ResultCounter title="Taux de réussite au BEPC" target={96.83} />
  </div>
</section>

      {/* Features Section */}
      <section className="container my-5 text-center">
        <p className="text-muted">Fonctionnalités</p>
        <h3 className="fw-bold">Découvrez les fonctionnalités de notre plateforme</h3>
        <p className="mb-5">
          Notre plateforme facilite l’inscription en ligne pour les élèves ou les parents. Grâce à une interface intuitive,
          vous pouvez gérer vos demandes d’inscription en toute simplicité.
        </p>

        <div className="row">
          <div className="col-md-4 mb-4" data-aos="fade-right">
            <div className="bg-light py-5 rounded">
              <div id="onlineFonctionImg" className="bg-light mx-auto mb-3" style={{ width: "80%", borderRadius: "8px" }}></div>
              <h5 className="fw-bold">Inscription en ligne simplifiée et rapide</h5>
              <p>Inscrivez-vous facilement depuis chez vous.</p>
            </div>
          </div>
          <div className="col-md-4 mb-4" data-aos="fade-up">
            <div className="bg-light py-5 rounded">
              <div id="downloadFonctionImg" className="bg-light mx-auto mb-3" style={{ width: "80%", borderRadius: "8px" }}></div>
              <h5 className="fw-bold">Téléchargement de documents en toute sécurité</h5>
              <p>Téléchargez vos documents nécessaires en quelques clics.</p>
            </div>
          </div>
          <div className="col-md-4 mb-4" data-aos="fade-left">
            <div className="bg-light py-5 rounded">
              <div id="realTimeFollowFonctionImg" className="bg-light mx-auto mb-3" style={{ width: "80%", borderRadius: "8px" }}></div>
              <h5 className="fw-bold">Suivi en temps réel de votre inscription</h5>
              <p>Restez informé de l’état de votre demande.</p>
            </div>
          </div>
        </div>
      </section>


      {/* Avantages Section */}
      <section className="container my-5" data-aos="fade-down">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h4 className="fw-bold">
              Découvrez les avantages de notre plateforme d'inscription en ligne.
            </h4>
            <p className="mt-3 text-muted">
              Notre plateforme est conçue pour être conviviale, permettant aux apprenants de s’inscrire facilement.
              De plus, elle garantit la sécurité des données tout en étant évolutive pour des nouvelles fonctionnalités à venir.
            </p>
            <div className="d-flex mt-4">
              <div className="me-4">
                <i className="bi bi-universal-access fs-3"></i>
                <h6 className="fw-bold mt-2">Convivialité</h6>
                <p className="small text-muted">Inscription simplifiée avec une interface intuitive pour tous les utilisateurs.</p>
              </div>
              <div>
                <i className="bi bi-shield-lock fs-3"></i>
                <h6 className="fw-bold mt-2">Sécurité</h6>
                <p className="small text-muted">Protection des données personnelles grâce à des protocoles de sécurité avancés.</p>
              </div>
            </div>
          </div>
          <div className="col-md-6" data-aos="fade-right">
            <div id="avantageImg" className="bg-bg-white" style={{ width: '100%', borderRadius: '8px' }}>
            </div>
          </div>
        </div>
      </section>

{/* Témoignage Section */}
<section className="container text-center my-5" data-aos="fade-down">
  <div className="mb-3">
    <div className="text-warning fs-4">
      ★★★★★
    </div>
    <blockquote className="fw-semibold fs-5">
      "La plateforme a simplifié notre processus d'inscription. Je recommande vivement cet outil pour toutes vos demandes d'inscription chez nous au complexe scolaire Saint Gabriel."
    </blockquote>
    <div className="d-flex justify-content-center align-items-center mt-3">
      <img
        src="https://cdn-icons-png.freepik.com/256/6912/6912591.png?uid=R151972593&ga=GA1.1.558063851.1721864926&semt=ais_hybrid"
        alt="avatar"
        className="rounded-circle me-3"
        style={{height:'60px'}}
      />
      <div className="text-start">
        <div className="fw-bold">SIMTAGNA Colette</div>
        <div className="text-muted small">Directrice, École Privé Laïque Saint Gabriel</div>
      </div>
      <img
        src="https://cdn-icons-png.freepik.com/256/16509/16509934.png?uid=R151972593&ga=GA1.1.558063851.1721864926&semt=ais_hybrid"
        alt="Lomé-TOGO"
        className="ms-4"
        style={{height:'30px'}}
      />
    </div>
  </div>
</section>



{/* Footer */}
<footer className="bg-dark text-white pt-5 pb-4">
  <div className="container">
    <div className="row">

      <div className="col-md-3 mb-3">
        <h5 className="fw-bold">CPL SAINT GABRIEL</h5>
        <p className="small">
          Inscrivez-vous à notre newsletter pour rester informé des nouvelles fonctionnalités et mises à jour.
        </p>
        <form>
          <input
            type="email"
            className="form-control mb-2"
            placeholder="Entrez votre email"
          />
          <button className="btn btn-outline-primary btn-sm">S'abonner</button>
        </form>
      </div>

      <div className="col-md-3 mb-3">
        <h6 className="fw-bold">Nos Services</h6>
        <ul className="list-unstyled">
          <li><a href="#" className="text-white text-decoration-none">Demande d'admission</a></li>
          <li><a href="#" className="text-white text-decoration-none">Suivi de dossier</a></li>
          <li><a href="#" className="text-white text-decoration-none">News letter</a></li>
          <li><a href="#" className="text-dark text-decoration-none">Lien Neuf</a></li>
          <li><a href="#" className="text-dark text-decoration-none">Lien Dix</a></li>
        </ul>
      </div>

      <div className="col-md-3 mb-3">
        <h6 className="fw-bold">Suivez-nous</h6>
        <ul className="list-inline">
          <li className="list-inline-item"><i className="bi bi-facebook me-2"></i> Facebook</li>
          <li className="list-inline-item"><i className="bi bi-instagram me-2"></i> Instagram</li>
          <li className="list-inline-item"><i className="bi bi-twitter me-2"></i> X</li>
          <li className="list-inline-item"><i className="bi bi-linkedin me-2"></i> LinkedIn</li>
          <li className="list-inline-item"><i className="bi bi-youtube me-2"></i> YouTube</li>
        </ul>
      </div>
    </div>
    <div className="text-center pt-3 border-top mt-3 small">
      © 2025 Complexe scolaire Saint Gabriel. Tous droits réservés. | 
      <a href="#" className="mx-2">Politique de confidentialité</a> |
      <a href="#" className="mx-2">Conditions de service</a> |
      <a href="#" className="mx-2">Paramètres des cookies</a>
    </div>
  </div>
</footer>


    </div>
  );
}


export default HomePage;