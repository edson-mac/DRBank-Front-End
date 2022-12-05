import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import PrivateRoutes from './utils/PrivateRoutes'

function App() {
  return (
    <div className="App">
          <Routes>
            <Route element={<PrivateRoutes />}>
                <Route element={<Home/>} path="/home" exact/>
            </Route>
            <Route element={<Login/>} path="/" exact/>
            <Route element={<Register/>} path="/register" exact/>
          </Routes>
    </div>
  );
}

export default App;