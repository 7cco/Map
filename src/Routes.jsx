import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import Carousel from './Carousel';
import { mappoints } from './components/MyMap';
import { useNavigate } from 'react-router-dom';

// Component for displaying text content and carousel
const TextDisplay = ({ text, waypoints }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="text-content">
        {text}
      </div>
       {waypoints && waypoints.length > 0 && (
        <button 
          className="buildRB"
          onClick={() => navigate('/map', { state: { waypoints } })}
        >
          Построить маршрут на карте
        </button>
      )}
    </div>
  );
};

// Main routes page component
const CRoutes = () => {
  const [selectedText, setSelectedText] = useState(null);
  const [selectedWaypoints, setSelectedWaypoints] = useState(null);
  const routePoints = {
    route1: mappoints.filter(point => 
      ['Листвянка', 'Большая Байкальская тропа (начало)', 'Большие Коты', 'Скрипер', 'Чёртов мост', 'Сухое озеро', 'Большое Голоустное']
      .includes(point.name)
    ),
    route2: mappoints.filter(point => 
      ['Слюдянка', 'Пик Черского', 'Озеро Сердце']
      .includes(point.name)
    ),
    route3: mappoints.filter(point => 
      ['Листвянка', 'Порт Байкал', 'Кругобайкальская железная дорога', 'Култук', 'Слюдянка']
      .includes(point.name)
    ),
    route4: mappoints.filter(point => 
      ['Гора Соболиная', 'Байкальск', 'Выдрино', 'Тёплые озёра']
      .includes(point.name)
    )
  };
  const textContents = {
    text1: `Маршрут: Листвянка – Большая Байкальская тропа – Большие Коты – Скрипер – Чёртов мост – Сухое озеро – Большое Голоустное.
Продолжительность: 2-3 дня.
Описание: Одним из самых популярных пеших туристических маршрутов на Байкале является участок Большой Байкальской тропы от Листвянки до Большого Голоустного. Занимая всего пару дней маршрут предоставляет возможность посетить марзу несколько населённых пунктов и природных достопримечательностей Байкала. Одной из особенностей маршрута является его реверсивность (возможность начать маршрут из любой из конечных точек).
Выходя из Листвянки за день, вы легко сможете дойти до Больших Котов, где вы сможете без трудностей найти ночлег. Во второй день вы дойдёте до Большого Голоустного, посетив по пути Скрипер, Чёртов мост и, по желанию, Сухое озеро, однако второй день можно разбить и на два, но ночевать придётся в палатке, для этого на протяжении Большой Байкальской тропы встречаются настилы для установки палатки.
`,
    
    text2: `Маршрут: Слюдянка – вокзал г. Слюдянки – Пик Черского – Озеро Сердце
Продолжительность: 3-5 дней.
Описание: Маршрут, требующий подготовки, однако он предоставляет возможность посетить одни из самых красивых мест на Байкале. Особенностью маршрута является его гибкость, по желанию вы можете убрать из маршрута почти любой пункт, добавить ещё один или несколько или поменять точки местами.
Отправной точкой маршрута является город Слюдянка, и уже в нём вы можете посетить некоторые достопримечательности, например вокзал города. Из Слюдянки мы рекомендуем отправиться на метеостанцию, где и остановиться для ночёвки на протяжении всего маршрута, отсюда вы сможете посетить множество достопримечательностей Камаринского хребта, мы предлагаем вам посетить пик Черского и озеро Сердце, поскольку остальные требуют более серьёзной подготовки. 
`,
    
    text3: `Маршрут: Листвянка – Порт Байкал – Кругобайкальская железная дорога- Култук – вокзал г. Слюдянка – Слюдянка 
Продолжительность: 1 день.
Описание: Маршрут, не требующий почти никакой подготовки, но дающий возможность почти полностью проехать южное побережье Байкала. 
Из Листвянки по воде вы можете переправиться в порт Байкал, где вы сможете сеть на поезд, как на туристический, так на пассажирский, ходящий по расписанию. За несколько часов вы сможете проехать весь действующий участок Кругобайкальской железной дороги. По пути вы сможете увидеть множество природных достопримечательностей и населённых пунктов, а также огромное количество мостов, туннелей и галерей начала 20 века, а если вы едите на туристическом поезде, то сможете и прогуляться по некоторым из них. После чего вы прибывайте на вокзал г. Слюдянка.
`,
    text4: `Маршрут: Гора Соболиная – Байкальск – Выдрино – Тёплые озёра
Продолжительность: от 2 дней.
Описание: В зависимости от сезона данный маршрут предлагает совсем разное. Зимой вы сможете покататься на лыжах или сноуборде на горе Соболиной и полюбоваться красотами на замёрзших тёплых озёрах, а летом спокойно отдохнуть у подножья горы Соболиной и насладиться Тёплыми озёрами в сезон.
Мы предлагаем вам отправиться на автомобиле от горы Соболиной до Тёплых озёр, что займёт у вас менее часа.
`
  };

const handleRouteSelect = (routeNumber) => {
  setSelectedText(textContents[`text${routeNumber}`]);
  
  const waypoints = routePoints[`route${routeNumber}`]
    .map(point => point.coordinates);
  setSelectedWaypoints(waypoints);
};

  return (
    <div className="main-page">
      <div className="button-container">
        <div className="card">
          <div className="route-carousel">
            <Carousel items={routePoints["route1"]} onNavigate={() => {}} />
          </div>
          <button className="rb" onClick={() => handleRouteSelect(1)}>От Листвянки до Большого Голоустного</button>
        </div>
        <div className="card">
          <div className="route-carousel">
            <Carousel items={routePoints["route2"]} onNavigate={() => {}} />
          </div>
          <button className="rb" onClick={() => handleRouteSelect(2)}>Маршрут на Пик Черского</button>
        </div>
        <div className="card">
          <div className="route-carousel">
            <Carousel items={routePoints["route3"]} onNavigate={() => {}} />
          </div>
          <button className="rb" onClick={() => handleRouteSelect(3)}>По Кругобайкальской железной дороге</button>
        </div>
        <div className="card">
          <div className="route-carousel">
            <Carousel items={routePoints["route4"]} onNavigate={() => {}} />
          </div>
          <button className="rb" onClick={() => handleRouteSelect(4)}>От горы Соболиной до Тёплых озёр</button>
        </div>
      </div>

      {selectedText && <TextDisplay 
      text={selectedText}
      waypoints={selectedWaypoints}
      />}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button className="hb">
          <Link to="/" className="map-link">Вернуться на главную</Link>
        </button>
      </div>
    </div>
  );
};

export default CRoutes;
