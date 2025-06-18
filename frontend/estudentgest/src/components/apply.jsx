import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import JardinImg from '../img/jardinImg1.png';
import PrimaireImg from '../img/primaireImg.jpg';
import collegeImg from '../img/collegeImg2.jpg';

const NiveauClasses = [
  { id: 1, name: 'Jardin des enfants', description: 'Une formation intensive pour préparer l\'entrée au primaire.', image: JardinImg },
  { id: 2, name: 'Primaire', description: 'Une formation dynamique pour développer les compétences essentielles. Préparer l\'avenir avec un encadrement attentif et des activités éducatives adaptées', image: PrimaireImg },
  { id: 3, name: 'Collège', description: 'Une formation rigoureuse pour exceller académiquement. Préparer les élèves aux défis futurs avec un suivi personnalisé et des outils pédagogiques modernes', image: collegeImg },
];

const PrimaireClasses =[
    {id: 1, name:'CP1'},
    {id: 2, name:'CP2'},
    {id: 3, name:'CE1'},
    {id: 4, name:'CE2'},
    {id: 5, name:'CM1'},
    {id: 6, name:'CM2'}
];

const CollegeClasses =[
    {id: 1, name:'6e'},
    {id: 2, name:'5e'},
    {id: 3, name:'4e'},
    {id: 4, name:'3e'}
];

const Apply = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedNiveau, setSelectedNiveau] = useState(null);
  const [selectedClasseGroup, setSelectedClasseGroup] = useState([]);

  const handleApplyClick = (niveau) => {
    setSelectedNiveau(niveau);
    setSelectedLevel(niveau.name); //pour recupérer le niveau demandé et l'utiliser dans le handleSubmit
    if(niveau.name === 'Primaire'){
        setSelectedClasseGroup(PrimaireClasses);
    }else if(niveau.name === 'Collège'){
        setSelectedClasseGroup(CollegeClasses);
    }else if (niveau.name === 'Jardin des enfants') {
        const defaultClass = { id: 1, name: 'C-I' };
        setSelectedClasseGroup([defaultClass]);
        setSelectedClasse(defaultClass.name); // 👈 prérempli automatiquement "C-I"
    }

    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedNiveau(null);
    setSelectedClasseGroup([]);
  };

  //partie gestion de l'envoi des infos au backend

    //definition des états
    const [selectedClasse, setSelectedClasse] = useState('');
     const [selectedLevel, setSelectedLevel] = useState('');
    const [documentPrincipal, setDocumentPrincipal] = useState(null);
    const [lettreMotivation, setLettreMotivation] = useState(null);

    //états pour la gestion d'erreur et le loader
    const [error, setError] = useState();
    const [success, setSuccess] = useState(false);
    const [IsLoading, setIsLoading] = useState(false);


    //recuperation de l'id de l'utilisateur
    const UserId = localStorage.getItem('UserId');

    //fonction pour l'envoi des infos au backend
    const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append('user', UserId);
     formData.append('nom', localStorage.getItem('UserNom'));
    formData.append('classroomAsked', selectedClasse);
    formData.append('levelAsked', selectedLevel);

    if (documentPrincipal) formData.append('documents', documentPrincipal);
    if (lettreMotivation) formData.append('documents', lettreMotivation);

    axios.post(`${process.env.REACT_APP_APPLY_API_URL}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then(()=>{
        const form = document.querySelector('form');
        form.style.display ='none';
        setIsLoading(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 4000); // Rediriger après 4 secondes
      })
    .catch(error =>{
        console.error(error);
        setIsLoading(false);
        setError(error.response.data.message)
    })
  };

  return (
    <Container className="my-5" data-aos="fade-left">
      <h2 className="mb-4 text-center">Postuler dans une Classe</h2>
      <Row onChange={(e) => setSelectedLevel(e.target.value)}>
        {NiveauClasses.map((niveau) => (
          <Col key={niveau.id} md={6} lg={4} className="mb-4">
            <Card className='bg-light'>
              <Card.Body>
                <Card.Title>{niveau.name}</Card.Title>
                <Card.Img src={niveau.image} alt='freepik.com' style={{height: '300px'}}></Card.Img>
                <Card.Text>{niveau.description}</Card.Text>
                <Button variant="primary" onClick={() => handleApplyClick(niveau)}>
                  Postuler au {niveau.name}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={handleClose} size="lg" >
        <Modal.Header closeButton>
          <Modal.Title>Formulaire d'Admission - {selectedNiveau?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                {/*code pour afiicher les message du serveur et le loader */}
                {IsLoading && (
                    <div className="loader"></div>
                )}
                {error && (
                    <div className="alert alert-warning">{error}</div>
                )}
                {success && (
                    <div className="alert alert-success">Votre demande d'inscription a été soumis vec succès</div>
                )}
          <Form onSubmit={handleSubmit}>
            <h5>Informations Personnelles</h5>
            <Row>
              <Col md={6}><Form.Group><Form.Label>Nom</Form.Label><Form.Control type="text" value={localStorage.getItem('UserNom')} required /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Prénom</Form.Label><Form.Control type="text" value={localStorage.getItem('UserPrenom')} required /></Form.Group></Col>
            </Row>
            <Row>
              <Col md={6}><Form.Group><Form.Label>Date de Naissance</Form.Label><Form.Control type="date" required /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Email</Form.Label><Form.Control type="email" value={localStorage.getItem('UserEmail')} required /></Form.Group></Col>
            </Row>
            <Row>
              <Col md={6}><Form.Group><Form.Label>Téléphone</Form.Label><Form.Control type="tel" required /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Adresse</Form.Label><Form.Control type="text" required /></Form.Group></Col>
            </Row>

            <h5 className="mt-4">Choix du Programme</h5>
            <Form.Group>
              <Form.Label>Classe Souhaité</Form.Label>
              <Form.Control as="select" value={selectedClasse} onChange={(e) => setSelectedClasse(e.target.value)}>
                <option value="">-- Sélectionnez une classe --</option>
                {selectedClasseGroup.map(classe => (
                  <option key={classe.id}>{classe.name}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <h5 className="mt-4">Pièces Jointes</h5>
            <Form.Group className="mb-2">
              <Form.Label>Veuillez uploader toutes vos pièces justificatives(naissance, relevés, bulletins, etc...) en un fichier unique (PDF)</Form.Label>
              <Form.Control type="file" accept=".pdf" onChange={(e) => setDocumentPrincipal(e.target.files[0])} required />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Lettre de Motivation (facultatif)</Form.Label>
              <Form.Control type="file" accept=".pdf" onChange={(e) => setLettreMotivation(e.target.files[0])}  />
            </Form.Group>

            <div className="text-end mt-4">
              <Button variant="success" type="submit">Soumettre la demande</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Apply;
