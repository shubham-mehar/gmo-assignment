import {Routes, Route } from 'react-router-dom';
import FirstPage from './pages/FirstPage';
import SecondPage from './pages/SecondPage';

const checkUserDetails = () => {
  const userData = localStorage.getItem('userData');
  if (!userData) {
    return { pathname: '/', state: { message: 'Please enter your details on the first page.' } };
  }
  return null;
};

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/second-page" element={<SecondPage />} canActivate={checkUserDetails} />
      </Routes>
  );
};
export default App;