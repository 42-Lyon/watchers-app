import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import { MeProvider } from './context/useMe';
import { ExamsProvider } from './context/useExams';
import { Toaster } from './components/ui/toaster';
import Statistics from './pages/Statistics';

function App() {
  return (
    <MeProvider>
     <ExamsProvider>
      <Router>
        <Routes>
          <Route path='/statistics' element={<Statistics/>} />
          <Route path='/' element={<Home/>} />
          <Route path='*' element={<Login/>} />
        </Routes>
      </Router>
      <Toaster />
     </ExamsProvider>
    </MeProvider>
  );
}




export default App;
