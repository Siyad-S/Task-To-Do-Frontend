import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import ToDoHome from './components/ToDoHome/ToDoHome';
import Signup from './components/Signup/Signup'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<ToDoHome />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
      </Routes>
    </div>
  );
}

export default App;
