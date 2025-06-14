import React, { useState } from "react";
import "./Carousel.css";
const i=2
const Carousel = ({ items, onNavigate }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === items.length*2 - i ? 0 : prevIndex + i
    );
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? items.length*2 - i : prevIndex - i
    );
  };

  const handleClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const clickPosition = event.clientX - rect.left;
    const centerThreshold = 0.4; // 40% от ширины элемента

    // Если клик был в центральной области (между 30% и 70% ширины)
    if (clickPosition > rect.width * centerThreshold && 
        clickPosition < rect.width * (1 - centerThreshold)) {
      console.log("Center click detected"); // Отладочная информация
      console.log("Current item:", items[activeIndex/2], activeIndex/2); // Отладочная информация
      console.log("Coordinates:", items[activeIndex/2].coordinates); // Отладочная информация
      
      // Проверяем наличие координат
      if (items[activeIndex/2]?.coordinates) {
        onNavigate('/map', { 
          state: { 
            coordinates: items[activeIndex/2].coordinates 
          }
        });
      } else {
        console.error("No coordinates found for item:", items[activeIndex/2]);
      }
    } else {
      // Если клик был слева или справа от центра, двигаем карусель
      if (clickPosition < rect.width / 2) {
        handlePrev();
      } else {
        handleNext();
      }
    }
  };

  return (
    <div className="carousel-container" onClick={handleClick}>
      <div className="carousel">
        {items.map((item, index) => (
          <div
            key={index}
            className="carousel-item"
            style={{
              transform: `translateX(${(index - activeIndex) * 100}%)`,
            }}
          >
            <img src={item.image}/>
          </div>
        ))}
      </div>
      {/* Кнопки для прокрутки */}
      <button className="carousel-button prev" onClick={(e) => { e.stopPropagation(); handlePrev(); }}>
        &#10094;
      </button>
      <button className="carousel-button next" onClick={(e) => { e.stopPropagation(); handleNext(); }}>
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;