import './App.css';

import { Routes, Route } from 'react-router-dom';

import { Footer } from './Components/Common/Footer/Footer';
import { Header } from './Components/Common/Header/Header';
import { Create } from './Components/Create/Create';
import { Details } from './Components/Details/Details';
import { Home } from './Components/Home/Home';
import { Login } from './Components/Login/Login';
import { Cart } from './Components/Cart/Cart';
import { Profile } from './Components/Profile/Profile';

function App() {
  return (
    <main>
      <Header></Header>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/create' element={<Create/>}/>
          <Route path='/catalog/:id' element={<Details/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/cart' element={<Cart/>}/>
        </Routes>
      <Footer></Footer>
    </main>
  );
}

export default App;
