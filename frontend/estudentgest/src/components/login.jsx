import React, {useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import eStudentGestLogo from '../img/eStudentGest_Logo.PNG';
import StudentImg from '../img/student.png';
import '../styles/login.css'


function Login (){
    // initialisation des états
    //gestion de l'email et du password
    const [email, setEmail] = useState("");
    const [password, setPassword]= useState("");

    //etat pour gerer le loader
    const [IsLoading, setIsLoading] = useState(false);

    //état pour gérer les erreurs
    const [error, setError] = useState()

    //definition de useNavigate pour naviguer
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        axios.post(`${process.env.REACT_APP_AUTH_API_URL}/login`, {email, password})
        .then(response => {
            localStorage.setItem('AuthToken', response.data.token);
            localStorage.setItem("UserEmail", response.data.email);
            localStorage.setItem("UserNom", response.data.nom);
            localStorage.setItem("UserPrenom", response.data.prenom);
            localStorage.setItem("UserId", response.data.id);
            localStorage.setItem('RoleIsAdmin', response.data.isAdmin);
            setIsLoading(false);
            //gestion de la page à afficher si il s'agit d'un admin ou un utilisateur simple
            if(!response.data.isAdmin){
                navigate('/apply')
            }else{
                navigate('/administration')
            }
            
        })
        .catch(error => {
            console.log(error);
            setIsLoading(false);
            setError(error.response.data.message);
        })

    }
    return(
        <div className="Login" data-aos="fade-right">
            <img id="StudentImgId" src={StudentImg} alt="student"/>
            <Link id="loginLink" to="/" type="button" className="btn btn-outline-danger" style={{width: "4dvw", position: "sticky", top: "5%", left: "5%"}}>
                <FontAwesomeIcon icon={faTimes} style={{fontSize: "25px", color:"red"}}/>
            </Link>
            <div id="formContainerLogin" className="container mt-5 bg-light">
                <div className="eStudentGestLogo">
                    <img id="eStudentGestLogoImg" src={eStudentGestLogo} alt='eStudentGest_logo' />
                </div><br/>

                {/* code pour afficher les erreurs. */}
                {error && (
                    <div className="alert alert-warning">{error}</div>
                )}
                <form id="SignUpForm" onSubmit={handleSubmit} data-aos="fade-down">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Your Email</label>
                        <input type="email" className="form-control" id="email" placeholder="Votre adresse email" value={email} onChange={(e) => { setEmail(e.target.value) }} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Mot de passe" value={password} onChange={(e) => { setPassword(e.target.value) }} minLength={6} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Se connecter</button>
                </form>
                {IsLoading && (
                    <div className="loader"></div>
                )}
            </div>
        </div>
    );
}

export default Login