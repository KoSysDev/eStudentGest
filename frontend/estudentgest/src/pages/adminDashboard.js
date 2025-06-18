import React from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import ConnectedHeaderAdmin from '../components/connectedHeaderAdmin';
import '../styles/adminDashboard.css'

function AdminDashboard(){
     const salesData = [
    { month: 'JAN', Inscription: 30, Demandes_Soumisses: 50, Demandes_Traitées: 20 },
    { month: 'FEB', Inscription: 20, Demandes_Soumisses: 80, Demandes_Traitées: 40 },
    { month: 'MAR', Inscription: 50, Demandes_Soumisses: 40, Demandes_Traitées: 25 },
    { month: 'APR', Inscription: 35, Demandes_Soumisses: 60, Demandes_Traitées: 30 },
    { month: 'MAY', Inscription: 40, Demandes_Soumisses: 50, Demandes_Traitées: 35 },
    { month: 'JUN', Inscription: 55, Demandes_Soumisses: 70, Demandes_Traitées: 20 },
    { month: 'JUL', Inscription: 25, Demandes_Soumisses: 90, Demandes_Traitées: 30 },
    { month: 'AUG', Inscription: 45, Demandes_Soumisses: 60, Demandes_Traitées: 40 },
  ];

  const pieData = [
    { name: 'Search Engines', value: 30 },
    { name: 'Direct Click', value: 30 },
    { name: 'Bookmarks Click', value: 40 },
  ];

  const COLORS = ['#007bff', '#20c997', 'red'];

  return (
    <>
        <ConnectedHeaderAdmin/>
        <Container id="Container" fluid className="p-4">
        <h3 className="mb-4">Tableau de bord - Administration</h3>

        <Row className="mb-4" data-aos='zoom-in'>
            <Col md={4} className="mb-3">
            <Card className="shadow-sm text-white" style={{ background: 'linear-gradient(15deg, var(--bs-info), blue)' }}>
                <Card.Body>
                <Card.Title>Demandes en attente</Card.Title>
                    <div style={{display:'flex'}}>
                        <i className='bi-hourglass-split' style={{fontSize:'35px'}}></i>
                        <h2 style={{marginLeft: '70%'}}>85</h2> 
                    </div>
                    <p>Augmentation de 60%</p>
                </Card.Body>
            </Card>
            </Col>
            <Col md={4} className="mb-3">
            <Card className="shadow-sm text-white" style={{ background: 'linear-gradient(15deg,var(--bs-danger), red)' }}>
                <Card.Body>
                <Card.Title>Demandes Refusées</Card.Title>
                    <div style={{display:'flex'}}>
                        <i className='bi-exclamation-diamond-fill' style={{fontSize:'35px'}}></i>
                        <h2 style={{marginLeft: '70%'}}>12</h2> 
                    </div>
                <p>Baisse de 10%</p>
                </Card.Body>
            </Card>
            </Col>
            <Col md={4} className="mb-3">
            <Card className="shadow-sm text-white" style={{ background: 'linear-gradient(15deg, var(--bs-success), green)' }}>
                <Card.Body>
                <Card.Title>Demandes Acceptés</Card.Title>
                    <div style={{display:'flex'}}>
                        <i className='bi-check-circle-fill' style={{fontSize:'35px'}}></i>
                        <h2 style={{marginLeft: '70%'}}>41</h2> 
                    </div>
                <p>Augmentation de 5%</p>
                </Card.Body>
            </Card>
            </Col>
        </Row>

        <Row>
            <a href="/administration">
                <div type='button' className='btn btn-outline' style={{marginBottom: '40px', padding:'20px', color:'black'}}>
                    <i className='bi-kanban' style={{fontSize:'15px',   fontFamily: "sans-serif"}}> vue d'ensemble des Statistiques</i>
                </div>
            </a>
        </Row>

        <Row>
            <Col md={8} className="mb-3" data-aos='zoom-out'>
            <Card className="shadow-sm">
                <Card.Body>
                <Card.Title>Statistiques de Visite et Inscriptions</Card.Title>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Inscription" fill="#510B57" />
                    <Bar dataKey="Demandes_Soumisses" fill="#00023D" />
                    <Bar dataKey="Demandes_Traitées" fill="#0018AB" />
                    </BarChart>
                </ResponsiveContainer>
                </Card.Body>
            </Card>
            </Col>

            <Col md={4} className="mb-3" data-aos='fade-down'>
            <Card className="shadow-sm">
                <Card.Body>
                <Card.Title>Répartition du Trafic</Card.Title>
                <ResponsiveContainer width="100%" height={300} data-aos='fade-up'>
                    <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80} fill="#8884d8" label>
                        {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <ul className="mt-3">
                    <li><span className="text-primary">●</span> Suivi de dossier - 30%</li>
                    <li><span className="text-success">●</span> Inscription sur site - 30%</li>
                    <li><span className="text-danger">●</span> Demandes d'admission - 40%</li>
                </ul>
                </Card.Body>
            </Card>
            </Col>
        </Row>
        </Container>
    </>
  );
}

export default AdminDashboard;