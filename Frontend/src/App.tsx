import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import LinkDetails from './Pages/LinkDetails';
import Signup from './Pages/Signup';

function App() {

  return (
       <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/link/:id' element={<LinkDetails/>}/>
       </Routes>
  )
}

export default App
