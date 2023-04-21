import './App.css';

import { Routes, Route } from 'react-router-dom';

import { Footer } from './Components/Common/Footer/Footer';
import { Header } from './Components/Common/Header/Header';
import { Create } from './Components/Create/Create';
import { Details } from './Components/Details/Details';
import { Home } from './Components/Home/Home';
import { Login } from './Components/Login/Login';
import { Cart } from './Components/ShoppingCart/Cart/Cart';
import { Profile } from './Components/Profile/Profile';
import { useCallback } from 'react';
import { AuthContext } from './context/AuthContext';
import { Guard } from './Components/Common/Guard/Guard';
import { useLocalStorage } from './Hooks/useLocalStorage';
import { CartContext } from './context/cartContext';
import { Register } from './Components/Register/Register';

function App() {

  const [user, setUser] = useLocalStorage('auth', {});
  const [cart, setCart] = useLocalStorage('cart', []);

  //Auth handlers
  const userLogin = useCallback((authData) => {
    if (authData) {
      setUser(authData);
    }
  }, [setUser]);
  
  const userLogout = useCallback(() => {
    setUser({});
  }, [setUser]);

  //Cart handler
  const addToCartHandler = (product, value) => {
   
    let isExisting = cart?.find((x) => x._id === product._id);
    const quantity = isExisting ? Number(isExisting.quantity) + Number(value) : Number(value);
    let cartData;
   
    if(quantity > Number(product.data.stock)) {
      alert("Product is out of stock")
      return;
    }

    if(!isExisting) {
      product.quantity = Number(value);
      cartData = [...cart, product];
    }else{
      isExisting.quantity += Number(value);
      cartData = cart.map((item) => item._id === isExisting._id ? isExisting : item);
    }
    setCart(cartData);
  }

  return (
    <main>
      <AuthContext.Provider value={{user, userLogin, userLogout}}>
        <CartContext.Provider value={{cart, addToCartHandler, setCart}}>
          <Header></Header>
            <Routes>
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
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
      </AuthContext.Provider>
    </main>
  );
}

export default App;
