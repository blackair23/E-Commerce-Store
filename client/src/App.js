import './App.css';
import { Footer } from './Components/Common/Footer/Footer';
import { Header } from './Components/Common/Header/Header';
// import { Details } from './Components/Details/Details';
// import { Home } from './Components/Home/Home';
// import { Login } from './Components/Login/Login';
// import { Cart } from './Components/Cart/Cart';
import { Profile } from './Components/Profile/Profile';

function App() {
  return (
    <main>
      <Header></Header>
      {/* <Home></Home> */}
      {/* <Details></Details> */}
      {/* <Login></Login> */}
      {/* <Cart></Cart> */}
      <Profile></Profile>
      <Footer></Footer>
    </main>
  );
}

export default App;
