import { Container } from '@mui/material';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
    <Container maxWidth="xl">
      {/* Display the app header */}
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
      
    </Container>
    </BrowserRouter>
  );
}

export default App;  
