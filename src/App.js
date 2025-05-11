import MyMap from "./components/MyMap";
import {points} from "./components/MyMap";
import "leaflet/dist/leaflet.css";
import { Routes, Route, Link } from 'react-router-dom';
import Carousel from "./Carousel";

function Home() {
  const carouselItems = points.map((point) => ({
    image: point.image,
    description: point.description,
    name: point.name,
  }));
    return (
      <div>
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <button class="mapbut"><Link to="/map" class="map-link">Интерактивная карта</Link></button>
      </div>
      <div className="Carusel">
        <Carousel items={carouselItems} />
      </div>
      </div>
    );
  }
  
  function About() {
    return (
      <div>
        <h1>О нас</h1>
        <p>Здесь вы можете узнать больше о нашей компании.</p>
      </div>
    );
  }
  
  function Contact() {
    return (
      <div>
        <h1>Контакты</h1>
        <p>Свяжитесь с нами по адресу: example@example.com</p>
      </div>
    );
  }
  
function App() {
    return (
      <div className="site">
        <header class="main-header">
            <nav>
                <Link to="/" class="logo"><img src="./logo.png" alt="Логотип"/></Link>
                <h1 class="sitename">Навигация по Байкалу</h1>
            </nav>
        </header>
        <main>         
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/map" element={<MyMap />} /> {/* Маршрут для карты */}
                <Route path="/about" element={<About/>}/>
                <Route path="/contact" element={<Contact/>}/>
              </Routes>
        </main>
        <footer class="main-footer">
            <ul class="footer-list">
                <li class="footer-list-item">
                    <li><Link to="/contact">Контакты</Link></li>
                    <li><Link to="/about">О нас</Link></li>
                </li>
            </ul>
        </footer>
      </div>
    );
  }
  
  export default App;