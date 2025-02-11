import Navbar from "./components/NavBar";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div>
      <Navbar />
      <div className="pt-16">
        <Home />
        <About />
        <Services />
        <Contact />
      </div>
      <ScrollToTopButton />
      <Footer />
    </div>
      
  );
}
