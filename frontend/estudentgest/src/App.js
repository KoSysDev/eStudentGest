import './styles/App.css';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import HomePage from './pages/homePage';
import ErrorPage from './pages/errorPage';
import LoginPage from './pages/loginPage'
import SignupPage from './pages/signupPage';
import ConfirmEmailPage from './pages/confirmPage';
import ApplyPage from './pages/apply';
import SuiviPage from './pages/suiviPage';
import AdminDashboard from './pages/adminDashboard';
import ApplyGestAdminPage from './pages/applyGestAdminPage';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';



function App() {
  //fonction pour protéger les routes, donner accès qu'aux utilisateurs connectés!
  const ProtectedRoute = ({children})=>{
    //vérifions s'il y'a un token
    const AuthToken = localStorage.getItem("AuthToken");
    if (!AuthToken) {
      return <Navigate to="/login" />
    }else{
      //si oui on donne accès a la page passé en paramètre
      return children;
    }
  }

  //fonction pour protéger les routes, donner accès qu'aux admin 
  const ProtectedAdminRoute = ({children})=>{
    //vérifions s'il y'a un token
    const RoleIsAdmin = localStorage.getItem('RoleIsAdmin');
    if (!RoleIsAdmin) {
      return <Navigate to="*" />
    }else{
      //si oui on donne accès a la page passé en paramètre
      return children;
    }
  }

  //parametrage de aos pour les animations
  useEffect(() => {
  AOS.init({
    duration: 1000, // durée de l'animation en ms
    once: true      // true = animation 1 seule fois
  });
}, []);
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/signup' element={<SignupPage/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/confirm/:token' element={<ConfirmEmailPage/>} />

          <Route path='/apply' 
            element={
            <ProtectedRoute>
              <ApplyPage/>
            </ProtectedRoute> 
            } 
          />

          <Route path='/track' 
            element={
            <ProtectedRoute>
              <SuiviPage/>
            </ProtectedRoute> 
            } 
          />

          <Route path='/administration' 
            element={
            <ProtectedAdminRoute>
              <AdminDashboard/>
            </ProtectedAdminRoute> 
            } 
          />

          <Route path='/ApplyGestAdmin' 
            element={
            <ProtectedAdminRoute>
              <ApplyGestAdminPage/>
            </ProtectedAdminRoute> 
            } 
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
