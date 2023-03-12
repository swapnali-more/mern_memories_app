import { Container } from '@mui/material';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {

  return (
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_ID}`}>
    <BrowserRouter>
    <Container maxWidth="xl">
      {/* Display the app header */}
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
      
    </Container>
    </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;  
