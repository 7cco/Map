import React, { useState } from "react";
import "./Carousel.css";

const Carousel = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 2
    );
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 2
    );
  };

  const handleClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const clickPosition = event.clientX - rect.left;

    // Если клик был слева от середины, двигаем назад
    if (clickPosition < rect.width / 2) {
      handlePrev();
    } else {
      handleNext();
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
            <img src={item.image} alt={item.description}  olt={item.name}/>
            <p>{item.name}<br/>{item.description}</p>
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