import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/applyGestAdmin.css';
import { Container, Card, Spinner, Alert, ListGroup, Button } from 'react-bootstrap';

function ApplyGestAdmin() {
  const [applies, setApplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [hiddenApplies, setHiddenApplies] = useState([]); //pour masquer les applies une fois accepté ou refusé

  // Fonction pour formater la date d'enregistrement en jj/mm/aaaa
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Chargement des demandes au montage
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_APPLY_API_URL}`)
      .then(response => {
        setApplies(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setError(error.response?.data?.message || "Erreur lors du chargement des dossiers.");
        setLoading(false);
      });
  }, []);

  // Fonction pour accepter une demande
  const ValidApply = (apply_id) => {
    setLoading(true);
    setError('');
    axios.put(`${process.env.REACT_APP_APPLY_API_URL}/valid/${apply_id}`)
      .then(() => {
        // Mise à jour locale du statut
        setApplies(prev =>
          prev.map(apply =>
            apply._id === apply_id ? { ...apply, statut: 'accepté' } : apply
          )
        );
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setError(error.response?.data?.message || "Erreur lors de la validation.");
        setLoading(false);
      });
  };

  // Fonction pour refuser une demande (à compléter si nécessaire)
  const DismissApply = (apply_id) => {
    setLoading(true);
    setError('');
    axios.put(`${process.env.REACT_APP_APPLY_API_URL}/dismiss/${apply_id}`)
      .then(() => {
        // Mise à jour locale du statut
        setApplies(prev =>
          prev.map(apply =>
            apply._id === apply_id ? { ...apply, statut: 'refusé' } : apply
          )
        );
        setLoading(false);
        // masquer l'apply après 3 secondes
        setTimeout(() => HideApply(apply_id), 3000);
      })
      .catch(error => {
        console.error(error);
        setError(error.response?.data?.message || "Erreur lors du refus.");
        setLoading(false);
      });
  };

    //fonction pour masquer les apply une fois traité
    const HideApply = (id) => {
        setHiddenApplies(prev => [...prev, id]);
    };

  return (
    <Container id="ContainerAdmin" className="my-5">
      <h3 id="G_label" className="mb-4">Administration {">"} Gestion Des Demandes</h3>

      {loading && <Spinner animation="border" className="d-block mx-auto" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {applies.length > 0 &&
        [...applies] // copie pour tri
          .filter(apply => !hiddenApplies.includes(apply._id)) // ❌ cacher les apply masqués
          .sort((a, b) => new Date(b.date_inscription) - new Date(a.date_inscription))
          .map((apply, idx) => (
            <Card key={idx} className="mb-4 shadow-sm border-dark" data-aos="zoom-in">
              <Card.Header className={
                apply.statut === 'accepté' ? 'bg-success' :
                  apply.statut === 'refusé' ? 'bg-danger' :
                    'bg-warning'
              }>
                <strong>{apply.levelAsked} - {apply.classroomAsked}</strong>
                <strong id="StatutContainer" className="float-end">{apply.statut}</strong>
              </Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item><strong>Nom:</strong> {apply.user.nom}</ListGroup.Item>
                  <ListGroup.Item><strong>Prénom:</strong> {apply.user.prenom}</ListGroup.Item>
                  <ListGroup.Item><strong>Commentaire du conseil des admissions:</strong> {apply.commentaire_admin || "----"}</ListGroup.Item>
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
                <div className="d-flex justify-content-between mt-3">
                  <Button
                    variant="success"
                    onClick={() => ValidApply(apply._id)}
                    disabled={apply.statut === 'accepté'}
                  >
                    Accepter
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => DismissApply(apply._id)}
                    disabled={apply.statut === 'refusé'}
                  >
                    Refuser
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))
      }
    </Container>
  );
}

export default ApplyGestAdmin;
