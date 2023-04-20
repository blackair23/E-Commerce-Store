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
import { useCallback, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './config/firebase';
import { AuthContext } from './context/AuthContext';
import { Guard } from './Components/Common/Guard/Guard';
import { doc, getDoc } from 'firebase/firestore';
import { useLocalStorage } from './Hooks/useLocalStorage';
import { CartContext } from './context/cartContext';

function App() {
  // const [user, setUser] = useState(null);

  const [user, setUser] = useLocalStorage('auth', {});
  const [cart, setCart] = useLocalStorage('cart', []);


  const userLogin = useCallback((authData) => {
    if (authData) {
      setUser(authData);
    }
  }, [setUser]);
  
  const userLogout = useCallback(() => {
    setUser({});
  }, [setUser]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user){
        userLogin(user)
        getDoc(doc(db, 'users', user.uid))
        .then((res) => {
          console.log('res', res.data())
          if(res.data()){
            console.log('res', res.data().role)
            // setUser([res.data().role])
            let role = res.data().role;
            user = {...user, role}
            userLogin(user)   
          }
        })
        .catch((err)=> {
            console.log(err.message)
        })
      } else {
        userLogout()
        console.log('User is Sign Out');
      }
    });

    return () => {
      unsubscribe();
    }
  }, []);


  const addToCartHandler = (product) => {
    let isExisting = cart?.find((x) => x._id === product._id);
    const quantity = isExisting ? product.quantity + 1 : 1;
    let cartData;
    if(quantity > product.stock) {
      alert("Product is out of stock")
      return;
    }
    if(!isExisting) {
      product.quantity = 1;
      cartData = [...cart, product];
    }else{
      isExisting.quantity += 1;
      cartData = cart.map((item) => item._id === isExisting._id ? isExisting : item);
    }
    setCart(cartData);
  }

  return (
    <main>
      <AuthContext.Provider value={{user}}>
        <CartContext.Provider value={{cart, addToCartHandler, setCart}}>

        {/* <CartContext.Provider value={{cart, addToCartHandler, setCart}}> */}
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
        </CartContext.Provider>
      {/* </CartContext.Provider> */}
      </AuthContext.Provider>
    </main>
  );
}

export default App;
