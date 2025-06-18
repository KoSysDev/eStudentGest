import React, { useState } from 'react';
import axios from 'axios';
import '../styles/track.css'
import { Container, Card, Spinner, Alert, ListGroup } from 'react-bootstrap';

function Track () {
  const [applies, setApplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  //fonction pour formater la date d'enregistrement des apply en jj/mm/aaaa
    const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
    }

  const userId = localStorage.getItem('UserId');


    axios.get(`${process.env.REACT_APP_APPLY_API_URL}/applyByUser/${userId}`)
    .then(response => {
        setApplies(response.data.data);
        setLoading(false);
    })
    .catch(error => {
        console.error(error);
        setError(error.response?.data?.message || "Erreur lors du chargement des dossiers.");
        setLoading(false);
    });

  return (
    <Container className="my-5">
      <h2 className="mb-4">Suivi de mes demandes d'admission</h2>

      {loading && <Spinner animation="border" className="d-block mx-auto" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {applies.length > 0 &&
        [...applies] // on fait une copie pour ne pas muter l'original
        .sort((a, b) => new Date(b.date_inscription) - new Date(a.date_inscription)) //on range pour afficher de la plus récente à la plus ancienne
        .map((apply, idx) => (
        <Card key={idx}   className="mb-4 shadow-sm border-dark" data-aos="zoom-in">
          <Card.Header className={apply.statut === 'accepté' ? 'bg-success' :apply.statut === 'refusé' ? 'bg-danger' : 'bg-warning'}> {/*on change la couleur du header en fonction du statut du dossier */}
            <strong>{apply.levelAsked} - {apply.classroomAsked}</strong>
            <strong id="StatutContainer">{apply.statut}</strong>
          </Card.Header>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item><strong>Nom:</strong> {apply.user.nom}</ListGroup.Item>
              <ListGroup.Item><strong>Prénom:</strong> {apply.user.prenom}</ListGroup.Item>
              <ListGroup.Item><strong>Commentaire du conseil des admissions:</strong> {apply.adminComment || "----"}</ListGroup.Item>
              <ListGroup.Item>
                <strong>Documents:</strong>
                <ul>
                  {apply.documents.map((doc, i) => (
                    <li key={i}><a href={doc} target="_blank" rel="noopener noreferrer">{doc.split('/').pop()}</a></li>
                  ))}
                </ul>
              </ListGroup.Item>
              <ListGroup.Item><strong>Enregistré le </strong> {formatDate(apply.date_inscription)}</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default Track;
