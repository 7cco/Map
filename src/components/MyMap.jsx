import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Popup, Marker} from "react-leaflet";
import {Icon} from "leaflet";
import "leaflet/dist/leaflet.css";
import "./MyMap.css";
import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-control-geocoder"
import "lrm-graphhopper"
import DropDownMenu from "../DDMenu";

export const points = [
  { 
    name: "Байкальск",
    coordinates: [51.518397, 104.170389],
    description: "Город на южном берегу Байкала с населением около 13 тыс. человек. Знаменит крупной горнолыжной трассой и местной клубникой.", 
    image: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_65d70645f9acc8146d4773e3_65d706b24864e8052774db32/scale_1200",
    class: "urban" // Городской
  },
  { 
    name: "Большая Байкальская тропа (начало)", 
    coordinates: [51.856545, 104.89088],
    description: "Ещё в 70-х годах прошлого века появилась идея создать систему туристических троп, которые огибали бы весь Байкал. На сегодняшний момент самой лёгким участком для неподготовленного туриста является тропа от Листвянки до Большого Голоустного. На нём вы сможете посетить посёлок Большие Коты, а также несколько популярных у туристов скал.",
    image: "https://drive.google.com/file/d/1fC2X0aYdhC2MrRGetvR6yOgD1WZnkUnm/view?usp=drive_link",
    class: "natural" // Природный
  },
  { 
    name: "Большие Коты", 
    coordinates: [51.905484, 105.07441],
    description: "Посёлок, расположившийся к северо-западу от Листвянки, с постоянным населением менее 100 человек. Является единственным населённым пунктом на Большой Байкальской тропе. По близости располагаются множество скал, популярных среди туристов.",
    image: "https://drive.google.com/file/d/1yPwAonhwg__YqsL1C-IWoiDnZ4lz-1sj/view?usp=drive_link",
    class: "urban" // Городской
  },
  { 
    name: "Большое Голоустное", 
    coordinates: [52.03252, 105.40983],
    description: "Посёлок на западном берегу Байкала с населением около 600 человек. Рядом с посёлком располагается уникальное озеро Сухое. Большое Голоустное является хорошим вариантом для тихого отдыха на берегу Байкала.",
    image: "https://drive.google.com/file/d/1c43vGQ8tMUezI4RWhyr8cP3JeRsYZx0K/view?usp=drive_link",
    class: "urban" // Городской
  },
  { 
    name: "Бугульдейка", 
    coordinates: [52.558591, 106.092504],
    description: "Посёлок на западном берегу Байкала с постоянным населением менее 1000 человек. Раньше вблизи от посёлка добывали мрамор, а теперь карьер стал одной из главных достопримечательностей Байкала.",
    image: "https://drive.google.com/file/d/1d8u_tmuRzvR1bX7W6cwZBN-Ir7y8TrlI/view?usp=drive_link",
    class: "urban" // Городской
  },
  { 
    name: "Бухта Аяя", 
    coordinates: [55.456786, 109.867009],
    description: "Бухта углубляющееся в сушу на 4 км идеально подходит для пляжного отдыха и рыбалки, поскольку полностью защищена от штормов, бушующих на озере.",
    image: "https://drive.google.com/file/d/157QrBl0czYGnXpZsvsbXGfq5xpeTdi-v/view?usp=drive_link",
    class: "natural" // Природный
  },
  { 
    name: "Бухта Песчаная", 
    coordinates: [52.260686, 105.700242],
    description: "Одно из немногих мест на Байкале для пляжного отдыха, примечательное своими 'ходячими' деревьями, наземных маршрутов до бухты нет, поэтому отдых здесь тихий.",
    image: "https://drive.google.com/file/d/1urbym2WtyZFFI9EG-jXc4Epg_RduUnHx/view?usp=drive_link",
    class: "natural" // Природный
  },
  { 
    name: "Вокзал г. Слюдянка", 
    coordinates: [51.658797, 103.724514],
    description: "Вокзал города Слюдянка был построен в 1905 году и являлся конечной точкой Кругобайкальской железной дороги. Особенностью вокзала является то, что он полностью построен из мрамора, который добывался поблизости города. Сейчас вокзал интересен ещё и интерактивным музеем в нём.",
    image: "https://drive.google.com/file/d/1xdaRwqSYbmNB9I-jZTd7H7miI79H0aTL/view?usp=drive_link",
    class: "urban" // Городской
  },
  { 
    name: "Выдрино", 
    coordinates: [51.453604, 104.64989],
    description: "Село на восточном берегу Байкала с населением примерно 4,5 тыс. человек. Располагается близь популярных у туристов тёплых озер.",
    image: "https://drive.google.com/file/d/1_N7T_gemDuX9BshQE1A2j2nSiAix9WUZ/view?usp=drive_link",
    class: "urban" // Городской
  },
  { 
    name: "Гора Соболиная", 
    coordinates: [51.493024, 104.11042],
    description: "Пожалуй, самая крупная горнолыжная трасса на всём Байкале, за сезон её посещают многие тысячи людей, желающих покататься на горных лыжах или сноуборде.",
    image: "https://drive.google.com/file/d/1r7gj23B8b9JW78ikxV5Mba-nYOBohiBK/view?usp=drive_link",
    class: "natural" // Природный
  },
  { 
    name: "Камень Черского", 
    coordinates: [51.877428, 104.837377],
    description: "Скала, расположенная рядом с Листвянкой, привлекает туристов прекрасными видами и лёгкостью подъёма, почти до самой скалы можно добраться на кресельном подъёмнике, а дальнейший путь пролегает по обустроенной тропе.",
    image: "https://drive.google.com/file/d/1kJ4ffvGp8oX9dSteZBIQ0U8b24Aj9jts/view?usp=drive_link",
    class: "natural" // Природный
  },
  { 
    name: "Кругобайкальская железная дорога (участок)", 
    coordinates: [51.713628, 103.69071],
    description: "Уникальное инженерное сооружение, протянувшееся по южному берегу Байкала и соединившее, в своё время, восточную и западную части железной дороги через всю страну. Дорогу проектировали иностранные инженеры, при её строительстве был проложен 41 тоннель и было возведено более 400 иных сооружений. На данный момент, из-за затопления части путей при строительстве Иркутской ГЭС, этот участок является тупиковой веткой от Култука до порта Байкал.",
    image: "https://drive.google.com/file/d/10FTl6rms2UoxN-jK1dV7o4Xeeq46zIPh/view?usp=drive_link",
    class: "urban" // Городской
  },
  { 
    name: "Култук", 
    coordinates: [51.71547, 103.689651],
    description: "Рабочий посёлок на юге Байкала с населением около 3 тыс. человек. Он является скорее транспортным узлом, чем интересным туристическим местом, однако именно здесь начинается Кругобайкальская Железная дорога.",
    image: "https://drive.google.com/file/d/1xffPcCq2-kGYnekn1npsVfzJ304RFpau/view?usp=drive_link",
    class: "urban" // Городской
  },
  { 
    name: "Листвянка", 
    coordinates: [51.871735, 104.835395],
    description: "Посёлок, расположившийся на истоке реки Ангара. Является пожалуй главным местом притяжения туристов на Байкале. Здесь есть множество вариантов для самых разнообразных видов отдыха.",
    image: "https://drive.google.com/file/d/1Q0DIu1FI4j_P2pOvKY98nkZf1LPUajfE/view?usp=drive_link",
    class: "urban" // Городской
  },
  { 
    name: "Мраморный карьер (Слюдянка)", 
    coordinates: [52.558591, 106.092504],
    description: "Мраморный карьер рядом с посёлком Бугульдейка является местом удивительной красоты, идеально подходящим для различных фотосессий.",
    image: "https://drive.google.com/file/d/14lyjr0IFE38JQhI8TPwNJAwY6sHtsuNs/view?usp=drive_link",
    class: "natural" // Природный
  },
  { 
    name: "Мыс Бурхан", 
    coordinates: [53.203895, 107.341716],
    description: "Неподалёку от Хужира находится мыс Бурхан, оканчивающийся двухглавой скалой Шаманка, со сквозной пещерой в ней. Отсюда открываются прекрасные виды на Байкал. При этом путь сюда не требует особых усилий.",
    image: "https://drive.google.com/file/d/1yvYRurFXkoEdRgQvO78K1MeoBQQmQJFS/view?usp=drive_link",
    class: "natural" // Природный
  },
  { 
    name: "Озеро Сердце", 
    coordinates: [51.509353, 103.625781],
    description: "Озеро находится вблизи пика Черского и популярно среди туристов своей уникальной формой, похожей на сердце.",
    image: "https://drive.google.com/file/d/1WEsb4WeGAX_SudeWmnibTFMEVOkPdRv8/view?usp=drive_link",
    class: "natural" // Природный
  },
  { 
    name: "Озеро Сухое", 
    coordinates: [52.020074, 105.349311],
    description: "Уникальное озеро, располагающееся рядом с Большим Голоустным. Примечательно оно тем, что наполняется водой только в високосные года, а в другое время напоминает обычную поляну.",
    image: "https://drive.google.com/file/d/14ZjZGTNcLjbCd9aPq4UiCfUUC0YSkZlm/view?usp=drive_link",
    class: "natural" // Природный
  },
  { 
    name: "Озеро Фролиха", 
    coordinates: [55.439668, 110.022079],
    description: "Озеро Фролиха очень редко посещают туристы несмотря на то, что до него можно добраться пешком от бухты Аяя. Озеро является идеальным местом не только для рыбалки и тихих прогулок, но и для катания на байдарках.",
    image: "https://drive.google.com/file/d/1BD6vDwl7sQR3yUt71uR_89ybTnYDymXx/view?usp=drive_link",
    class: "natural" // Природный
  },
  { 
    name: "Ольхон (остров)", 
    coordinates: [53.161829, 107.41108],
    description: "Самый крупный остров на всём Байкале, здесь множество мест, которые можно посетить. Туризм на острове очень хорошо развит, однако попасть на остров в сезон проблематично из-за малой пропускной способности паромов.",
    image: "https://drive.google.com/file/d/1lQLifnzdauxfYT5mMGFdBHp7eAkDAArv/view?usp=drive_link",
    class: "natural" // Природный
  },
  { 
    name: "Остров Большой Ушканий", 
    coordinates: [53.853878, 108.631396],
    description: "Самый крупный остров из архипелага Ушканих островов, покрытого хвойным лесом. Архипелаг облюбовали нерпы, и он стал самым крупным лежбищем нерп на всём Байкале, однако для посещения архипелага необходимо разрешение, поэтому его посещение возможно только в рамках экскурсии.",
    image: "https://drive.google.com/file/d/1pQ2rmG_qqMbdi65TVTA-fhPah9QncnvK/view?usp=drive_link",
    class: "natural" // Природный
  },
  { 
    name: "Пик Черского", 
    coordinates: [51.51556, 103.62583],
    description: "Одна из вершин Камаринского хребта Хамар-Дабана, возвышающаяся на 2090м над уровнем моря. Является, пожалуй, самой популярной среди туристов вершиной на Байкале, рядом с которой располагается множество других памятников природы.",
    image: "https://drive.google.com/file/d/1-HVscFoQFNDl-9czY_9i4mBBfvL3yj_t/view?usp=drive_link",
    class: "natural" // Природный
  },
  { 
    name: "Порт Байкал", 
    coordinates: [51.874891, 104.7968],
    description: "Посёлок, расположившийся на истоке реки Ангара, прямо напротив Листвянки, с населением около 100 человек. На данный момент является конечной станцией на Кругобайкальской железной дороге.",
    image: "https://drive.google.com/file/d/1p0XgaC0rW7jro7JFJ-WWGk3JXlGu86ba/view?usp=drive_link",
    class: "urban" // Городской
  },
  { 
    name: "Пролив Малое Море", 
    coordinates: [53.258153, 107.296999],
    description: "Пролив между островом Ольхон и берегом Байкала, здесь температура выше, чем на всём Байкале, поэтому этот пролив является идеальным местом, если вы хотите искупаться в озере.",
    image: "https://drive.google.com/file/d/1_4NnqMY_yi9klqQSB2Tci2QkqSX_49Xi/view?usp=drive_link",
    class: "natural" // Природный
  },
  { 
    name: "Сарма (деревня)", 
    coordinates: [53.098765, 106.834951],
    description: "Деревня на западном берегу Байкала в районе пролива Малое Море с населением менее 100 человек. Располагается в Сарминском ущелье - одной из природных достопримечательностей Байкала.",
    image: "https://drive.google.com/file/d/1rcjk3YIsJGcDil6tvURXDhrDZtot1RQU/view?usp=drive_link",
    class: "urban" // Городской
  },
  { 
    name: "Сарминское ущелье", 
    coordinates: [53.134718, 106.837151],
    description: "Одно из нескольких ущелий, находящихся на Малом море. В нём протекает живописная река Сарма. Однако ущелье является не только местом удивительной красоты, а также местом зарождения самого сильного на Байкале ветра - Сармы, чья скорость достигает 60 км/ч.",
    image: "https://drive.google.com/file/d/1sUtUDGFSeTJERQSabFscmNkxWHi4CleJ/view?usp=drive_link",
    class: "natural" // Природный
  },
  { 
    name: "Скрипер (утес)", 
    coordinates: [51.901265, 105.131042],
    description: "Утёс, расположившийся близь Больших Котов и возвышающийся над Байкалом на 200 метров. Является отличной природной смотровой площадкой, чем и притягивает туристов, также в горном массиве сохранилась пещера из двух залов.",
    image: "https://drive.google.com/file/d/127mA0XwD0poC4NX4vYXQnC8QcIMrQWDV/view?usp=drive_link",
    class: "natural" // Природный
  },
  { 
    name: "Слюдянка", 
    coordinates: [51.642571, 103.692141],
    description: "Город на юге Байкала с населением около 18 тыс. человек. Раньше в его окрестностях добывали слюду, мрамор и лазурит. На сегодняшний день город интересен своим вокзалом музеями, а также близким расположением ко многим памятникам природы.",
    image: "https://drive.google.com/file/d/1FAqRXcZPSnn78dPD1dIK_Q7soU9G3iiM/view?usp=drive_link",
    class: "urban" // Городской
  },
  { 
    name: "Тёплые озёра", 
    coordinates: [51.393994, 104.647261],
    description: "Сеть озёр, располагающихся рядом с селом Выдрино, популярных среди туристов тем, что всё озёра являются тёплыми. Озёра хорошо обустроены и имеют развитую инфраструктуру.",
    image: "https://drive.google.com/file/d/1zOrpnrss2XLYTaEk_UosEookZaiOz9N6/view?usp=drive_link",
    class: "natural" // Природный
  },
  { 
    name: "Термальные источники Хакусы", 
    coordinates: [55.359529, 109.828007],
    description: "Самые крупные термальные источники на Байкале, выходящих прямо из скалы всего в 700м от берега Байкала. Имеют температуру выше 40°C и имеют множество лечебных свойств.",
    image: "https://drive.google.com/file/d/1VEX-uhHrUe2yA7qThL1VD-SPMQV4RAef/view?usp=drive_link",
    class: "natural" // Природный
  },
  { 
    name: "Хужир", 
    coordinates: [53.192846, 107.343898],
    description: "Посёлок на западе острова Ольхон с населением около 1,5 тыс. человек. Является самым крупным населённым пунктом на острове.",
    image: "https://drive.google.com/file/d/15aIeckyxrjiY2RJly42OPc8WAdotk_YC/view?usp=drive_link",
    class: "urban" // Городской
  },
  { 
    name: "Чёртов мост (КБЖД)", 
    coordinates: [51.905172, 105.166352],
    description: "Пожалуй, самый опасный участок на участке Большой Байкальской тропы между Листвянкой и Большим Голоустным. Туристам предстоит пройти в скале, буквально в метре от обрыва. При этом отсюда открывается завораживающий вид на Байкал.",
    image: "https://drive.google.com/file/d/1zvWWGculRjbFuPXw9PYelqpnpaXWreAd/view?usp=drive_link",
    class: "natural" // Природный
  },
  { 
    name: "Шаман-камень", 
    coordinates: [51.873732, 104.82101],
    description: "Скала являющееся одной из визитных карточек Байкала, располагается прямо на истоке реки Ангара и окружена со всех сторон водной гладью. Скалу не посещают, но она всё равно притягивает множество туристов каждый год.",
    image: "https://drive.google.com/file/d/1HhZr9VSN9n0rxKxM4S1wfYeOgqIWt3nu/view?usp=drive_link",
    class: "natural" // Природный
  },
  { 
    name: "Шаманский мыс", 
    coordinates: [51.69509, 103.706303],
    description: "Небольшой мыс между Слюдянкой и Култуком, оканчивающийся скалой Шаманка. Является прекрасной природной смотровой площадкой.",
    image: "https://drive.google.com/file/d/1X33QUUrolmzAQsvwfr1xdkwEwkyjVT5G/view?usp=drive_link",
    class: "natural" // Природный
  }
];

const customicon=new Icon 
({
  iconUrl: "https://images.icon-icons.com/317/PNG/512/map-marker-icon_34392.png",
  iconSize: [38, 38],

})

const createRoutingMachineLayer = (props) => {
  const instance = L.Routing.control({
    waypoints: props.waypoints,
    lineOptions: {
      styles: [{ color: "#6FA1EC", weight: 4 }],
    },
    show: true,
    addWaypoints: false,
    routeWhileDragging: true,
    draggableWaypoints: true,
    fitSelectedRoutes: true,
    showAlternatives: true,
    //router: new L.Routing.GraphHopper('963fa20f-6f52-47ce-9976-dd77fb66acbb'),
  });
  return instance;
};
const RoutingMachine = createControlComponent(createRoutingMachineLayer);

function MyMap() {
  const [selectedClass, setSelectedClass] = useState("all");
  const mapRef=useRef(null)
  const [waypoints, setWaypoints] = useState([]);
  const routingMachineRef = useRef(null);
  const [showTemperatureLayer, setShowTemperatureLayer] = useState(false);
  const [showPrecipitationLayer, setShowPrecipitationLayer] = useState(false);
  const goToHomePage = () => {
    window.location.href = "home";
  };

  const handleSelect = (selectedPoint) => {
    console.log("Выбранная точка:", selectedPoint);

    if (waypoints.length === 0) {
      setWaypoints([selectedPoint.coordinates]);
    } else if (waypoints.length === 1) {
      setWaypoints((prevWaypoints) => [...prevWaypoints, selectedPoint.coordinates]);
    } else {
      setWaypoints([selectedPoint.coordinates]);
    }

    if(mapRef.current)
    {
      mapRef.current.flyTo(selectedPoint.coordinates, 13);
    }
  };

  useEffect(() => {
    if (routingMachineRef.current && waypoints.length > 1) {
      routingMachineRef.current.setWaypoints(waypoints.map((coord) => L.latLng(coord)));
    }
  }, [waypoints]);

  const filteredPoints = selectedClass === "all"
  ? points
  : points.filter((point) => point.class === selectedClass);

  const apiKey = "6195eabc1b6674227d3a4d2b7d562224";


  return (
    <div>
      <button
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 1000,
          padding: "10px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={goToHomePage}
      >
        На главную
      </button>
      <h1 style={{ textAlign: "center" }}>Карта Байкала</h1>

      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <button onClick={() => setSelectedClass("all")}>Все</button>
        <button onClick={() => setSelectedClass("urban")}>Городские</button>
        <button onClick={() => setSelectedClass("natural")}>Природные</button>
        <button onClick={() => setShowTemperatureLayer(!showTemperatureLayer)}>
          {showTemperatureLayer ? "Скрыть температуру" : "Показать температуру"}
        </button>
        <button onClick={() => setShowPrecipitationLayer(!showPrecipitationLayer)}>
          {showPrecipitationLayer ? "Скрыть осадки" : "Показать осадки"}
        </button>
      </div>   

      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 1000,
          backgroundColor: "white",
          padding: "10px",
          borderRadius: "5px",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
        }}
      >
        {showTemperatureLayer && (
          <div>
            <p>Легенда температуры:</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <span style={{ width: "20px", height: "20px", backgroundColor: "rgba(130, 22, 146, 1)" }}></span>
                <span>-40°C</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <span style={{ width: "20px", height: "20px", backgroundColor: "rgba(130, 87, 219, 1)" }}></span>
                <span>-30°C</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <span style={{ width: "20px", height: "20px", backgroundColor: "rgba(32, 140, 236, 1)" }}></span>
                <span>-20°C</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <span style={{ width: "20px", height: "20px", backgroundColor: "rgba(32, 196, 232, 1)" }}></span>
                <span>-10°C</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <span style={{ width: "20px", height: "20px", backgroundColor: "rgba(35, 221, 221, 1)" }}></span>
                <span>0°C</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <span style={{ width: "20px", height: "20px", backgroundColor: "rgba(194, 255, 40, 1)" }}></span>
                <span>+10°C</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <span style={{ width: "20px", height: "20px", backgroundColor: "rgba(255, 240, 40, 1)" }}></span>
                <span>+20°C</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <span style={{ width: "20px", height: "20px", backgroundColor: "rgba(255, 194, 40,1)" }}></span>
                <span>+25°C</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <span style={{ width: "20px", height: "20px", backgroundColor: "rgba(252, 128, 20, 1)" }}></span>
                <span>+30°C</span>
              </div>
            </div>
          </div>
        )}
         {showPrecipitationLayer && (
    <div style={{ backgroundColor: "white", padding: "10px", borderRadius: "5px" }}>
      <p>Легенда осадков:</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <span style={{ width: "20px", height: "20px", backgroundColor: "rgba(120, 120, 190, 0)" }}></span>
          <span>0.5 мм</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <span style={{ width: "20px", height: "20px", backgroundColor: "rgba(110, 110, 205, 0.3)" }}></span>
          <span>1 мм</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <span style={{ width: "20px", height: "20px", backgroundColor: "rgba(80,80, 225, 0.7)" }}></span>
          <span>10 мм</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <span style={{ width: "20px", height: "20px", backgroundColor: "rgba(20, 20, 255, 0.9)" }}></span>
          <span>140 мм</span>
        </div>
      </div>
    </div>
        )}
        </div>
      
      

      <h2 className="Map">
        <MapContainer
          ref={mapRef}
          style={{ height: "80vh", width: "150vh" }}
          zoom={10}
          center={[53.617, 107.483]}
          maxZoom={18}
          minZoom={5}

        >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
         Слой осадков 
        {showTemperatureLayer && (
            <TileLayer
              url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`}
              attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
            />
          )}

          {showPrecipitationLayer && (
            <TileLayer
              url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`}
              attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
            />
          )}
          
          {waypoints.length > 0 && (
            <RoutingMachine
            ref={(instance) => {
              routingMachineRef.current = instance; // Сохраняем ссылку на экземпляр RoutingMachine
            }}
            waypoints={waypoints.map((coord) => L.latLng(coord))}
          />
          )}


           {filteredPoints.map((point, index) => (
            <Marker key={index} position={point.coordinates} icon={customicon}>
              <Popup maxHeight={"500"} maxWidth={"500"}>
                <b>{point.name}</b>
                <br />
                {point.description}
                {point.image && <img src={point.image} alt={point.name} style={{width: "100%" }}/>}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        </h2>
          <div>
        <h4 className="DD">
          <DropDownMenu options={points} onSelect={handleSelect}/>
        </h4>
      </div>
    </div>

  );
}

export default MyMap;