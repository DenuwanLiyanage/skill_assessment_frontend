import './output.css'
import SignIn from './components/SignIn'
import Home from './components/Home';
import Register from './components/Register';
import CreateOrder from './components/CreateOrder';
import { Routes, Route, Router  } from 'react-router-dom';


function App() {
  return (
    <div className="App">

      <Routes>

        <Route exact  path="/home" element={<Home />} />
        <Route exact  path="/register" element={<Register />} />
        <Route exact  path="/create-order" element={<CreateOrder />} />
        <Route exact  path="/" element={<SignIn />} />

      </Routes>

        
    </div>
  );
}

export default App;
