import Footer from "./components/footer/Footer"
import Navbar from "./components/navbar/NavBar"
import Home from "./pages/home/Home";
import './index.scss';

function App() {

  return (
    <main className="App">
      <Navbar />
      <Home />
      <Footer />
    </main>
  )
}

export default App
