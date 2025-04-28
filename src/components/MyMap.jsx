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
import axios from 'axios';

const overpassUrl = "https://overpass-api.de/api/interpreter";

async function fetchHotels(bounds) {
  const [southWest, northEast] = bounds;
  const [minLat, minLng] = southWest;
  const [maxLat, maxLng] = northEast;

  const query = `
    [out:json];
    (
      node["tourism"="hotel"](${minLat},${minLng},${maxLat},${maxLng});
      way["tourism"="hotel"](${minLat},${minLng},${maxLat},${maxLng});
      relation["tourism"="hotel"](${minLat},${minLng},${maxLat},${maxLng});
    );
    out center;
  `;

  try {
    const response = await axios.post(overpassUrl, query);
    return response.data.elements.map(element => {
      const coordinates = element.center 
        ? [element.center.lat, element.center.lon]
        : [element.lat, element.lon];
        
      return {
        name: element.tags.name || "Неизвестный отель",
        coordinates: coordinates,
        description: element.tags.description || "",
        website: element.tags.website || "",
        phone: element.tags.phone || "",
        stars: element.tags.stars || ""
      };
    });
  } catch (error) {
    console.error("Ошибка при получении данных об отелях:", error);
    return [];
  }
}


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
    image: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_67fd03ecda234a137415cb9c_67fd03f4c926f4762cccc0b4/scale_2400",
    class: "natural" // Природный
  },
  { 
    name: "Большие Коты", 
    coordinates: [51.905484, 105.07441],
    description: "Посёлок, расположившийся к северо-западу от Листвянки, с постоянным населением менее 100 человек. Является единственным населённым пунктом на Большой Байкальской тропе. По близости располагаются множество скал, популярных среди туристов.",
    image: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_67fd043132525752e747c5a7_67fd0440f9903d3785b1014d/scale_2400",
    class: "urban" // Городской
  },
  { 
    name: "Большое Голоустное", 
    coordinates: [52.03252, 105.40983],
    description: "Посёлок на западном берегу Байкала с населением около 600 человек. Рядом с посёлком располагается уникальное озеро Сухое. Большое Голоустное является хорошим вариантом для тихого отдыха на берегу Байкала.",
    image: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_67fd043132525752e747c5a7_67fd044c87e6ed1f458c20d6/scale_1200",
    class: "urban" // Городской
  },
  { 
    name: "Бугульдейка", 
    coordinates: [52.558591, 106.092504],
    description: "Посёлок на западном берегу Байкала с постоянным населением менее 1000 человек. Раньше вблизи от посёлка добывали мрамор, а теперь карьер стал одной из главных достопримечательностей Байкала.",
    image: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_67fd043132525752e747c5a7_67fd0464e43ed57219f1712e/scale_2400",
    class: "urban" // Городской
  },
  { 
    name: "Бухта Аяя", 
    coordinates: [55.456786, 109.867009],
    description: "Бухта углубляющееся в сушу на 4 км идеально подходит для пляжного отдыха и рыбалки, поскольку полностью защищена от штормов, бушующих на озере.",
    image: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_67fd043132525752e747c5a7_67fd049fc05ff97f1431cfb7/scale_1200",
    class: "natural" // Природный
  },
  { 
    name: "Бухта Песчаная", 
    coordinates: [52.260686, 105.700242],
    description: "Одно из немногих мест на Байкале для пляжного отдыха, примечательное своими 'ходячими' деревьями, наземных маршрутов до бухты нет, поэтому отдых здесь тихий.",
    image: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_67fd043132525752e747c5a7_67fd04bcc926f4762cce69a5/scale_2400",
    class: "natural" // Природный
  },
  { 
    name: "Вокзал г. Слюдянка", 
    coordinates: [51.658797, 103.724514],
    description: "Вокзал города Слюдянка был построен в 1905 году и являлся конечной точкой Кругобайкальской железной дороги. Особенностью вокзала является то, что он полностью построен из мрамора, который добывался поблизости города. Сейчас вокзал интересен ещё и интерактивным музеем в нём.",
    image: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_67fd043132525752e747c5a7_67fd04ed729c784c9e86e67b/scale_1200",
    class: "urban" // Городской
  },
  { 
    name: "Выдрино", 
    coordinates: [51.453604, 104.64989],
    description: "Село на восточном берегу Байкала с населением примерно 4,5 тыс. человек. Располагается близь популярных у туристов тёплых озер.",
    image: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_67fd043132525752e747c5a7_67fd04fb2e3227075e80577b/scale_2400",
    class: "urban" // Городской
  },
  { 
    name: "Гора Соболиная", 
    coordinates: [51.493024, 104.11042],
    description: "Пожалуй, самая крупная горнолыжная трасса на всём Байкале, за сезон её посещают многие тысячи людей, желающих покататься на горных лыжах или сноуборде.",
    image: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_67fd043132525752e747c5a7_67fd0539f9903d3785b2eda2/scale_1200",
    class: "natural" // Природный
  },
  { 
    name: "Камень Черского", 
    coordinates: [51.877428, 104.837377],
    description: "Скала, расположенная рядом с Листвянкой, привлекает туристов прекрасными видами и лёгкостью подъёма, почти до самой скалы можно добраться на кресельном подъёмнике, а дальнейший путь пролегает по обустроенной тропе.",
    image: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_67fd043132525752e747c5a7_67fd054aa35c9016d9dd9a18/scale_1200",
    class: "natural" // Природный
  },
  { 
    name: "Кругобайкальская железная дорога (участок)", 
    coordinates: [51.713628, 103.69071],
    description: "Уникальное инженерное сооружение, протянувшееся по южному берегу Байкала и соединившее, в своё время, восточную и западную части железной дороги через всю страну. Дорогу проектировали иностранные инженеры, при её строительстве был проложен 41 тоннель и было возведено более 400 иных сооружений. На данный момент, из-за затопления части путей при строительстве Иркутской ГЭС, этот участок является тупиковой веткой от Култука до порта Байкал.",
    image: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_67fd043132525752e747c5a7_67fd0559d080fb441e130836/scale_1200",
    class: "urban" // Городской
  },
  { 
    name: "Култук", 
    coordinates: [51.71547, 103.689651],
    description: "Рабочий посёлок на юге Байкала с населением около 3 тыс. человек. Он является скорее транспортным узлом, чем интересным туристическим местом, однако именно здесь начинается Кругобайкальская Железная дорога.",
    image: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_67fd043132525752e747c5a7_67fd056bdd3e8e15e76445b1/scale_1200",
    class: "urban" // Городской
  },
  { 
    name: "Листвянка", 
    coordinates: [51.871735, 104.835395],
    description: "Посёлок, расположившийся на истоке реки Ангара. Является пожалуй главным местом притяжения туристов на Байкале. Здесь есть множество вариантов для самых разнообразных видов отдыха.",
    image: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_67fd043132525752e747c5a7_67fd0582b11a217d0a3b3a3d/scale_1200",
    class: "urban" // Городской
  },
  { 
    name: "Мраморный карьер (Слюдянка)", 
    coordinates: [52.558591, 106.092504],
    description: "Мраморный карьер рядом с посёлком Бугульдейка является местом удивительной красоты, идеально подходящим для различных фотосессий.",
    image: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_67fd043132525752e747c5a7_67fd059cc05ff97f1433dfed/scale_1200",
    class: "natural" // Природный
  },
  { 
    name: "Мыс Бурхан", 
    coordinates: [53.203895, 107.341716],
    description: "Неподалёку от Хужира находится мыс Бурхан, оканчивающийся двухглавой скалой Шаманка, со сквозной пещерой в ней. Отсюда открываются прекрасные виды на Байкал. При этом путь сюда не требует особых усилий.",
    image: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_67fd043132525752e747c5a7_67fd05a820c968560e6bcf53/scale_1200",
    class: "natural" // Природный
  },
  { 
    name: "Озеро Сердце", 
    coordinates: [51.509353, 103.625781],
    description: "Озеро находится вблизи пика Черского и популярно среди туристов своей уникальной формой, похожей на сердце.",
    image: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_67fd043132525752e747c5a7_67fd05c0e350361bd6d60124/scale_1200",
    class: "natural" // Природный
  },
  { 
    name: "Озеро Сухое", 
    coordinates: [52.020074, 105.349311],
    description: "Уникальное озеро, располагающееся рядом с Большим Голоустным. Примечательно оно тем, что наполняется водой только в високосные года, а в другое время напоминает обычную поляну.",
    image: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_67fd043132525752e747c5a7_67fd05caa35c9016d9de9c6b/scale_1200",
    class: "natural" // Природный
  },
  { 
    name: "Озеро Фролиха", 
    coordinates: [55.439668, 110.022079],
    description: "Озеро Фролиха очень редко посещают туристы несмотря на то, что до него можно добраться пешком от бухты Аяя. Озеро является идеальным местом не только для рыбалки и тихих прогулок, но и для катания на байдарках.",
    image: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_67fd043132525752e747c5a7_67fd05d724545b4978f568a6/scale_2400",
    class: "natural" // Природный
  },
  { 
    name: "Ольхон (остров)", 
    coordinates: [53.161829, 107.41108],
    description: "Самый крупный остров на всём Байкале, здесь множество мест, которые можно посетить. Туризм на острове очень хорошо развит, однако попасть на остров в сезон проблематично из-за малой пропускной способности паромов.",
    image: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_67fd043132525752e747c5a7_67fd05f1e62c0170d5d2e5f5/scale_2400",
    class: "natural" // Природный
  },
  { 
    name: "Остров Большой Ушканий", 
    coordinates: [53.853878, 108.631396],
    description: "Самый крупный остров из архипелага Ушканих островов, покрытого хвойным лесом. Архипелаг облюбовали нерпы, и он стал самым крупным лежбищем нерп на всём Байкале, однако для посещения архипелага необходимо разрешение, поэтому его посещение возможно только в рамках экскурсии.",
    image: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_67fd043132525752e747c5a7_67fd060ee350361bd6d6ada4/scale_1200",
    class: "natural" // Природный
  },
  { 
    name: "Пик Черского", 
    coordinates: [51.51556, 103.62583],
    description: "Одна из вершин Камаринского хребта Хамар-Дабана, возвышающаяся на 2090м над уровнем моря. Является, пожалуй, самой популярной среди туристов вершиной на Байкале, рядом с которой располагается множество других памятников природы.",
    image: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_67fd043132525752e747c5a7_67fd061ee4f45557db98e8f7/scale_1200",
    class: "natural" // Природный
  },
  { 
    name: "Порт Байкал", 
    coordinates: [51.874891, 104.7968],
    description: "Посёлок, расположившийся на истоке реки Ангара, прямо напротив Листвянки, с населением около 100 человек. На данный момент является конечной станцией на Кругобайкальской железной дороге.",
    image: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_67fd043132525752e747c5a7_67fd063ea35c9016d9df8e6c/scale_1200",
    class: "urban" // Городской
  },
  { 
    name: "Пролив Малое Море", 
    coordinates: [53.258153, 107.296999],
    description: "Пролив между островом Ольхон и берегом Байкала, здесь температура выше, чем на всём Байкале, поэтому этот пролив является идеальным местом, если вы хотите искупаться в озере.",
    image: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_67fd043132525752e747c5a7_67fd0654c926f4762cd1bbde/scale_2400",
    class: "natural" // Природный
  },
  { 
    name: "Сарма (деревня)", 
    coordinates: [53.098765, 106.834951],
    description: "Деревня на западном берегу Байкала в районе пролива Малое Море с населением менее 100 человек. Располагается в Сарминском ущелье - одной из природных достопримечательностей Байкала.",
    image: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_67fd043132525752e747c5a7_67fd0660dd3e8e15e76602b2/scale_1200",
    class: "urban" // Городской
  },
  { 
    name: "Сарминское ущелье", 
    coordinates: [53.134718, 106.837151],
    description: "Одно из нескольких ущелий, находящихся на Малом море. В нём протекает живописная река Сарма. Однако ущелье является не только местом удивительной красоты, а также местом зарождения самого сильного на Байкале ветра - Сармы, чья скорость достигает 60 км/ч.",
    image: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_67fd043132525752e747c5a7_67fd0675a35c9016d9dfffc0/scale_1200",
    class: "natural" // Природный
  },
  { 
    name: "Скрипер (утес)", 
    coordinates: [51.901265, 105.131042],
    description: "Утёс, расположившийся близь Больших Котов и возвышающийся над Байкалом на 200 метров. Является отличной природной смотровой площадкой, чем и притягивает туристов, также в горном массиве сохранилась пещера из двух залов.",
    image: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_67fd043132525752e747c5a7_67fd06822e3227075e837b49/scale_2400",
    class: "natural" // Природный
  },
  { 
    name: "Слюдянка", 
    coordinates: [51.642571, 103.692141],
    description: "Город на юге Байкала с населением около 18 тыс. человек. Раньше в его окрестностях добывали слюду, мрамор и лазурит. На сегодняшний день город интересен своим вокзалом музеями, а также близким расположением ко многим памятникам природы.",
    image: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_67fd043132525752e747c5a7_67fd0691f2c94c2d447189d7/scale_1200",
    class: "urban" // Городской
  },
  { 
    name: "Тёплые озёра", 
    coordinates: [51.393994, 104.647261],
    description: "Сеть озёр, располагающихся рядом с селом Выдрино, популярных среди туристов тем, что всё озёра являются тёплыми. Озёра хорошо обустроены и имеют развитую инфраструктуру.",
    image: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_67fd043132525752e747c5a7_67fd06a1abb81a698e989755/scale_1200",
    class: "natural" // Природный
  },
  { 
    name: "Термальные источники Хакусы", 
    coordinates: [55.359529, 109.828007],
    description: "Самые крупные термальные источники на Байкале, выходящих прямо из скалы всего в 700м от берега Байкала. Имеют температуру выше 40°C и имеют множество лечебных свойств.",
    image: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_67fd043132525752e747c5a7_67fd06bd2e3227075e83ef36/scale_1200",
    class: "natural" // Природный
  },
  { 
    name: "Хужир", 
    coordinates: [53.192846, 107.343898],
    description: "Посёлок на западе острова Ольхон с населением около 1,5 тыс. человек. Является самым крупным населённым пунктом на острове.",
    image: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_67fd043132525752e747c5a7_67fd06cde43ed57219f66bef/scale_1200",
    class: "urban" // Городской
  },
  { 
    name: "Чёртов мост (КБЖД)", 
    coordinates: [51.905172, 105.166352],
    description: "Пожалуй, самый опасный участок на участке Большой Байкальской тропы между Листвянкой и Большим Голоустным. Туристам предстоит пройти в скале, буквально в метре от обрыва. При этом отсюда открывается завораживающий вид на Байкал.",
    image: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_67fd043132525752e747c5a7_67fd06dce608bc66943e79a5/scale_1200",
    class: "natural" // Природный
  },
  { 
    name: "Шаман-камень", 
    coordinates: [51.873732, 104.82101],
    description: "Скала являющееся одной из визитных карточек Байкала, располагается прямо на истоке реки Ангара и окружена со всех сторон водной гладью. Скалу не посещают, но она всё равно притягивает множество туристов каждый год.",
    image: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_67fd043132525752e747c5a7_67fd06ed7c0c2872e15fbb70/scale_1200",
    class: "natural" // Природный
  },
  { 
    name: "Шаманский мыс", 
    coordinates: [51.69509, 103.706303],
    description: "Небольшой мыс между Слюдянкой и Култуком, оканчивающийся скалой Шаманка. Является прекрасной природной смотровой площадкой.",
    image: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_67fd043132525752e747c5a7_67fd06fba35c9016d9e12188/scale_1200",
    class: "natural" // Природный
  }
];

const customicon=new Icon 
({
  iconUrl: "https://images.icon-icons.com/317/PNG/512/map-marker-icon_34392.png",
  iconSize: [38, 38],
})

const restaurantIcon = new Icon
({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/34/34261.png",
  iconSize: [30, 30],
});

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
    language: 'ru',
    createMarker: function(i, wp) {return L.marker(wp.latLng, {icon: customicon});}
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
  const baykalBounds = [
    [47.0, 93.0], 
    [56.0, 118.0]
  ];
  const [allPoints, setAllPoints] = useState([]);
  const [waypointHotelMarkers, setWaypointHotelMarkers] = useState([]);

  useEffect(() => {
    const fetchNearbyHotels = async () => {
      const newWaypointHotels = [];
      
      for (const [index, waypoint] of waypoints.entries()) {
        const radius = 0.05; // Примерно 5 км (в градусах)
        const bounds = [
          [waypoint[0] - radius, waypoint[1] - radius],
          [waypoint[0] + radius, waypoint[1] + radius]
        ];
        
        const nearbyHotels = await fetchHotels(bounds);
        newWaypointHotels.push(...nearbyHotels.map(hotel => ({
          ...hotel,
          waypointIndex: index // Связываем отель с точкой маршрута
        })));
      }
      
      setWaypointHotelMarkers(newWaypointHotels);
    };
  
    if (waypoints.length > 0) {
      fetchNearbyHotels();
    } else {
      setWaypointHotelMarkers([]); // Очищаем маркеры, если маршрут пуст
    }
  }, [waypoints]);
  useEffect(() => {
    const loadPoints = async () => {
      const pointsWithTypes = points.map(point => ({...point, type: 'point'}));
      setAllPoints(pointsWithTypes);
    };
    loadPoints();
  }, []);
  useEffect(() => {
    if (routingMachineRef.current && waypoints.length > 1) {
      routingMachineRef.current.setWaypoints(waypoints.map((coord) => L.latLng(coord)));
    }
  }, [waypoints]);

  const handleSelect = (selectedPoint) => {
    console.log("Выбранная точка:", selectedPoint);
    setWaypoints((prevWaypoints) => {
      const isDuplicate = prevWaypoints.some(waypoint => 
        waypoint[0] === selectedPoint.coordinates[0] && 
        waypoint[1] === selectedPoint.coordinates[1]
      );
      if (isDuplicate) {
        return prevWaypoints;
      }
      return [...prevWaypoints, selectedPoint.coordinates];
    });
    if(mapRef.current) {
      mapRef.current.flyTo(selectedPoint.coordinates, 13);
    }
  };

  const filteredPoints = allPoints.filter(point => {
    if (selectedClass === "all") return true;
    return point.class === selectedClass && point.type === "point";
  });

  const apiKey = "6195eabc1b6674227d3a4d2b7d562224";

  return (
    <div>
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
        <button onClick={() => setWaypoints([])}>Очистить маршрут</button>
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
          maxBounds={baykalBounds}
          maxBoundsViscosity={1.0}
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
              routingMachineRef.current = instance;
            }}
            waypoints={waypoints.map((coord) => L.latLng(coord))}
          />
          )}


{filteredPoints.map((point, index) => (
  <Marker 
    key={index} 
    position={point.coordinates} 
    icon={point.type === "hotel" ? restaurantIcon : customicon}
  >
    <Popup maxHeight={"500"} maxWidth={"500"}>
      <b>{point.name}</b>
      <br />
      {point.description}
      {point.image && <img src={point.image} alt={point.name} style={{width: "100%" }}/>}
      {point.type === "hotel" && (
        <>
          {point.phone && <>Телефон: {point.phone}<br /></>}
          {point.website && <>Сайт: <a href={point.website} target="_blank" rel="noopener noreferrer">{point.website}</a><br /></>}
          {point.stars && <>Звезды: {point.stars}<br /></>}
        </>
          )}
      </Popup>
    </Marker>
      ))}
      {/* Маркеры отелей возле точек маршрута */}
  {waypointHotelMarkers.map((hotel, index) => (
    <Marker 
      key={index} 
      position={hotel.coordinates} 
      icon={restaurantIcon}
    >
      <Popup>
        <b>{hotel.name}</b>
        <br />
        {hotel.description && <>{hotel.description}<br /></>}
        {hotel.phone && <>Телефон: {hotel.phone}<br /></>}
        {hotel.website && <>Сайт: <a href={hotel.website} target="_blank" rel="noopener noreferrer">{hotel.website}</a><br /></>}
        {hotel.stars && <>Звезды: {hotel.stars}<br /></>}
      </Popup>
    </Marker>
  ))}
        </MapContainer>
        </h2>
            {waypoints.length > 0 && (
            <div style={{ 
              position: "absolute", 
              top: "60px", 
              left: "10px", 
              zIndex: 1000, 
              backgroundColor: "white", 
              padding: "10px", 
              borderRadius: "5px", 
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)" 
            }}>
              <p>Точки маршрута:</p>
              {waypoints.map((waypoint, index) => {
                // Находим соответствующую точку в массиве allPoints
                const point = allPoints.find(p => 
                  p.coordinates[0] === waypoint[0] && p.coordinates[1] === waypoint[1]
                );
                return (
                  <div key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    {/* Отображаем название точки, если оно найдено */}
                    <span>{point ? point.name : `Точка ${index + 1}`}</span>
                    <button onClick={() => setWaypoints(waypoints.filter((_, i) => i !== index))}>Удалить</button>
                  </div>
                );
              })}
            </div>
          )}
          <div>
        <h4 className="DD">
          <DropDownMenu options={points} onSelect={handleSelect}/>
        </h4>
      </div>
    </div>

  );
}
export default MyMap;