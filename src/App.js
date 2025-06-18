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
      <div className="Carusel">
        <Carousel items={carouselItems} onNavigate={navigate}/>
      </div>
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <nav class="mapbut"><Link to="/map"><img src="./map white.png"/></Link></nav>
      </div>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <nav class="rotbut"><Link to="/routes"><img src="./routes.png"/></Link></nav>
        <Link to="/" class="logo"><img src="./river white.png" alt="Логотип"/></Link>
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
        </footer>
      </div>
    );
  }
  
  export default App;