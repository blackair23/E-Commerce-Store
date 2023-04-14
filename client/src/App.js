import './App.css';
import { Footer } from './Components/Common/Footer/Footer';
import { Header } from './Components/Common/Header/Header';
import { Details } from './Components/Details/Details';
// import { Home } from './Components/Home/Home';

function App() {
  return (
    <main>
      <Header></Header>
      {/* <Home></Home> */}
      <Details></Details>
      <Footer></Footer>
    </main>
  );
}

export default App;
