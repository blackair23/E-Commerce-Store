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
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import { AuthContext } from './context/AuthContext';
import { Guard } from './Components/Common/Guard/Guard';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user){
        setUser(user)
      } else {
        setUser(null)
        console.log('User is Sign Out');
      }
    });

    return () => {
      unsubscribe();
    }
  }, []);


  return (
    <main>
      <AuthContext.Provider value={{user}}>
      <Header></Header>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route element={<Guard></Guard>}>
            <Route path='/' element={<Home/>}/>
            <Route path='/create' element={<Create/>}/>
            <Route path='/catalog/:id' element={<Details/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/cart' element={<Cart/>}/>
          </Route>
        </Routes>
      <Footer></Footer>
      </AuthContext.Provider>
    </main>
  );
}

export default App;
