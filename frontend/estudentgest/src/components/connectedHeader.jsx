import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ConnectedHeader(){
  //récupération des infos de l'utilisateur pour l'afficher 
  const UserNom = localStorage.getItem('UserNom');
  const UserPrenom = localStorage.getItem('UserPrenom');

      //état pour afficher la div de confirmation de déconnexion
    const [déconnexion, setDéconnexion] = useState(false);
    const navigate = useNavigate();

    // récupération de l'email stocké dans le localStorage après connection
    const logOutShow = () => {
        setDéconnexion(true);
    }

    const logOutNo = () => {
        setDéconnexion(false);
    }

    const logOutYes = () => {
      localStorage.clear();
        //localStorage.removeItem("UserNom");
        //localStorage.removeItem("UserEmail");
        navigate('/');
    }

    return(
      <>
               <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top px-4" style={{zIndex:'90'}}>
                <a className="navbar-brand d-flex align-items-center bi-person-circle" href="#/">
                  <h6  className="fw-bold " style={{marginLeft: '10px'}}> <span className="fw-normal">Bonjour! bienvenue, vous êtes: </span> {UserNom} {UserPrenom}</h6>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" style={{ width: '36px', height: '36px', border: '0px' }}>
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav ms-auto">
                    <li className="nav-item mx-2">
                      <a className="nav-link" href="/apply"> Demande d'inscription</a>
                    </li>
                    <li className="nav-item mx-2">
                      <a className="nav-link" href="/track">Suivi Dossier</a>
                    </li>
                    <li className="nav-item dropdown mx-2">
                      <a className="btn  bi-power" href="#" role="button" style={{color: "red"}} onClick={logOutShow}>
                         Log out
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>
            {/* div pour confirmer la déconnexion */}
            {déconnexion && (
                            <div style={{
                                position: "absolute", 
                                right: "5%", 
                                top: "12%",
                                zIndex: '100',
                                backgroundColor: "whitesmoke",
                                padding: "1%",
                                borderRadius: "10px"
                                }}>
                                <p>Êtes-vous sûr de vous déconnecter?</p>
                                <button type="button" className='btn btn-outline-danger' onClick={logOutYes} style={{width: "28%", marginLeft: "15%"}}>Oui</button>
                                <button type="button" className='btn btn-primary' onClick={logOutNo} style={{width: "28%", marginLeft: "15%"}}>Non</button>
                            </div>
            )}
      </>
    )
}
export default ConnectedHeader;