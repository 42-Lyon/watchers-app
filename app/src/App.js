import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import { MeProvider } from './context/useMe';
import { ExamsProvider } from './context/useExams';

function App() {
  return (
    <MeProvider>
     <ExamsProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='*' element={<Login/>} />
        </Routes>
      </Router>
     </ExamsProvider>
    </MeProvider>
  );
}




export default App;
