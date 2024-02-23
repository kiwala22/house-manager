import { Route, BrowserRouter as Router, Routes as RouterRoutes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';

export const Routes = () => {
  return (
    <Router>
      <RouterRoutes>
        <Route path="*" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </RouterRoutes>
    </Router>
  );
};
