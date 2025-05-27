import MyMap from "./components/MyMap";
import CRoutes from "./Routes"
import {points} from "./components/MyMap";
import "leaflet/dist/leaflet.css";
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Carousel from "./Carousel";

function Home() {
  const navigate = useNavigate();
  const carouselItems = points.map((point) => ({
    image: point.image,
    description: point.description,
    name: point.name,
    coordinates: point.coordinates
  }));
    return (
      <div>
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <button class="mapbut"><Link to="/map" class="map-link">Интерактивная карта</Link></button>
      </div>
      <div className="Carusel">
        <Carousel items={carouselItems} onNavigate={navigate}/>
      </div>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <button class="rotbut"><Link to="/routes">Маршруты</Link></button>
      </div>
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
                <Route path="/routes" element={<CRoutes />} />
              </Routes>
        </main>
        <footer class="main-footer">
            <ul class="footer-list">
                <li class="footer-list-item">
                </li>
            </ul>
        </footer>
      </div>
    );
  }
  
  export default App;