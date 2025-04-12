import React from "react";
import DropDownMenu from "./DDMenu";
import { points } from "./components/MyMap"; // Импортируем массив точек
import MyMap from "./components/MyMap";
import "leaflet/dist/leaflet.css";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function Home() {
    return (
      <div>
        <h1>Главная страница</h1>
        <p>Добро пожаловать на наш сайт!</p>
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
      <div>
        {/* Базовая разметка */}
        <header>
          <nav>
            <ul style={{ display: 'flex', listStyle: 'none', gap: '20px', padding: '10px' }}>
              <li><Link to="/">Главная</Link></li>
              <li><Link to="/about">О нас</Link></li>
              <li><Link to="/contact">Контакты</Link></li>
              <li><Link to="/map">Карта</Link></li> {/* Ссылка на карту */}
            </ul>
          </nav>
        </header>
  
        <main style={{ padding: '20px' }}>
          {/* Определение маршрутов */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/map" element={<MyMap />} /> {/* Маршрут для карты */}
          </Routes>
        </main>
  
        <footer style={{ marginTop: '50px', textAlign: 'center' }}>
          <p>&copy; 2023 Мой сайт. Все права защищены.</p>
        </footer>
      </div>
    );
  }
  
  export default App;