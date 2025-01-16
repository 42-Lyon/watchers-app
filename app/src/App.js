import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Exams from './pages/Exams';
import { ExamsProvider } from './context/useExams';
import { Toaster } from './components/ui/toaster';
import Statistics from './pages/Statistics';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";
import { useMe } from './context/useMe';



function App() {

  const { me } = useMe();

  ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);
  return (
     <ExamsProvider>
      <Router>
        <Routes>
          { me &&
            <>
              <Route path='/statistics' element={<Statistics/>} />
              <Route path='/' element={<Exams/>} />
            </>
          }
          <Route path='/login' element={me ? <Navigate to={'/'}/> : <Login/>} />
          <Route path='*' element={me ? <Navigate to={'/'}/> : <Login/>}/>
        </Routes>
      </Router>
      <Toaster />
     </ExamsProvider>
  );
}




export default App;
