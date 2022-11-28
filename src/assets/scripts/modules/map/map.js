import mapStyle from "./map-style";



export default function googleMap() {
  global.initMap = initMap
}

async function func() {
  const script = document.createElement('script');
  let key = '';
  if (window.location.href.match(/localhost/)) key = '';
  // const key = '';
  script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`;
  document.getElementsByTagName('head')[0].appendChild(script);
}
// setTimeout(func, 1000);
const maps = document.querySelectorAll('.map');
const options = {
  rootMargin: '0px',
  threshold: 0.1,
};

maps.forEach((image) => {
  const callback = (entries, observer) => {
    /* Content excerpted, show below */
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target;
        lazyImage.src = lazyImage.dataset.src;
        observer.unobserve(image);
        func();
      }
    });
  };
  const observer = new IntersectionObserver(callback, options);
  const target = image;
  observer.observe(target);
});

// eslint-disable-next-line no-unused-vars
function initMap() {
  const gmarkers1 = [];
  //28.4600074, 49.2384203
  const center = {
    lat: 50.4701428,
    lng: 30.5010861
  };

  
  /** Массив, куда записываются выбраные категории */
  const choosedCategories = new Set();
  choosedCategories.add('main');
  /** Елементы, при клике на который будет происходить фильтрация */
  const filterItems = document.querySelectorAll('[data-marker]');
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center,
    scrollwheel: false,
    navigationControl: false,
    mapTypeControl: false,
    scaleControl: false,
    draggable: true,
    language: 'en',
    styles: mapStyle()
  });
  window.googleMap = map;

  const filterMarkers = function (category, categoriesArray) {
    gmarkers1.forEach((el) => {
      if (categoriesArray.has(el.category) || categoriesArray.size === 1) {
        el.setMap(map);
        el.setAnimation(google.maps.Animation.DROP);
      } else {
        el.setMap(null);
      }
    });
  };
  filterItems.forEach((item) => {
    item.addEventListener('click', (evt) => {
      evt.stopImmediatePropagation();
      item.classList.toggle('active');
      if (item.classList.contains('active')) {
        choosedCategories.add(item.dataset.category);
      } else {
        choosedCategories.delete(item.dataset.category);
      }
      filterMarkers('main', choosedCategories);
    });
  });

  // var baseFolder = '/wp-content/themes/centower/assets/images/markers/';
  const baseFolder = window.location.href.match(/localhost/) 
    ? './assets/images/markers/'
    : '/wp-content/themes/central-park/assets/images/markers/';
  let defaultMarkerSize = new google.maps.Size(40, 53);
  if (document.documentElement.clientWidth < 950) {
    // defaultMarkerSize = new google.maps.Size(40, 53);
  }
  const buildLogoSize = new google.maps.Size(60,72);
  const markersAdresses = {
    main: `${baseFolder}main.svg`,
    cafe: `${baseFolder}cafe.svg`,
    kinder: `${baseFolder}kindergarten.svg`,
    shop: `${baseFolder}shop.svg`,
    sport: `${baseFolder}sport.svg`,
    school: `${baseFolder}school.svg`,
    cafe: `${baseFolder}meal.svg`,
    medicine: `${baseFolder}medicine.svg`,
    bank: `${baseFolder}bank.svg`,
    leisure: `${baseFolder}leisure.svg`,
  };
  const markerPopupStyle = `
          style="
          background: #ffffff;
          color:#000000;
          font-weight: bold;
          padding:5px 10px;
          font-size: 16px;
          line-height: 120%;"
          `;


  // const markersAjaxData = await fetch('')
  /* beautify preserve:start */
  async function fetchMarkersData() {
    const sendData = new FormData();
    sendData.append('action', 'infrastructure');
    const url = window.location.href.match(/localhost/)
      ? 'https://central-park-wp.smarto.com.ua/wp-admin/admin-ajax.php'
      : '/wp-admin/admin-ajax.php'
    let markersData = await fetch(url, {
      method: 'POST',
      body: sendData,
    });
    markersData = await markersData.json();
    if (!markersData) {
      console.warn('Wrong data recieved');
      return;
    };

    let formatedMarkersDataForMap = markersData.reduce((acc, el) => {
      if (!el.list) return acc;
      el.list.forEach(marker => {
        acc.push({
          content: `<div ${markerPopupStyle}>${marker.name}</div>`,
          position: { 
            lat: marker.coordinations.latitude, 
            lng: marker.coordinations.elevation 
          },
          type: el.code,
          id: marker.id,
          zIndex: 1000,
          icon: { url: markersAdresses[el.code], scaledSize: buildLogoSize }
        });
      });
      return acc;
    }, []);


    console.log(formatedMarkersDataForMap);
    return formatedMarkersDataForMap;
  }
//   const ajaxMarkers = fetchMarkersData();

//   ajaxMarkers.then(result => {
//     putMarkersOnMap(result, map);
//   })
//   console.log(ajaxMarkers);
  const markersData = [
    {
      content: `<div ${markerPopupStyle}>ЖК Rihert & Park</div>`,
      position: {     lat: 50.4701428, lng: 30.5010861 },
      type: 'main',
      id: '1',
      zIndex: 1000,
      icon: { url: markersAdresses.main, scaledSize: buildLogoSize },
    },

  ];
  putMarkersOnMap(markersData, map);

  function putMarkersOnMap(markers, map) {
    const infowindow = new google.maps.InfoWindow({
      content: '',
      maxWidth: 200,
    });
    const initedMarkers = [];
    markers.forEach((marker) => {
      const category = marker.type;
  
      const mapMarker = new google.maps.Marker({
        map,
        category,
        zIndex: marker.zIndex || 1,
        icon: marker.icon,
        dataId: +marker.id,
        content: marker.content,
        position: new google.maps.LatLng(marker.position.lat, marker.position.lng),
      });
      mapMarker.dataId = +marker.id;
      initedMarkers.push(mapMarker);
  
      google.maps.event.addListener(mapMarker, 'click', function () {
        infowindow.setContent(marker.content);
        infowindow.open(map, mapMarker);
        map.panTo(this.getPosition());
      });
      mapMarker.name = marker.type;
      gmarkers1.push(mapMarker);
    });
    map.initedMarkers = initedMarkers;
    markersHightlight(google, map, infowindow);
    markersHandler();
  }
  /* beautify preserve:end */
  
  
}



function markersHightlight(google, map, infowindow) {
  const $markerLinks = document.querySelectorAll('[data-marker-id]');
  // const infowindow = new google.maps.InfoWindow({
  //   content: '',
  //   maxWidth: 280,
  // });
  querySelectorWithNodeList('[data-marker-id]', (item) => {
    item.addEventListener('click', () => {

      const marker = map.initedMarkers.find(el => {
        return el.dataId === +item.dataset.markerId
      });
      if (marker === undefined) return;
      infowindow.setContent(marker.content);
      infowindow.open(map, marker);
      // console.log(marker);
    })
  })
  // console.log(document.querySelectorAll('[data-marker-id]'));
  // console.log(map);
}


function querySelectorWithNodeList(selector, cb = () => { }) {
  const $list = document.querySelectorAll(selector);
  $list.forEach(el => cb(el));
}


function markersHandler() {
  document.querySelector('.map-wrapper')
    .addEventListener('click', ({ target }) => {
      const map = window.googleMap;
      if (target.closest('[data-marker-id]') === null || !map) return;
      const markerId = target.closest('[data-marker-id]').dataset.markerId;
      const marker = map.initedMarkers.find(marker => marker.dataId == markerId);
      marker && map.setCenter(marker.getPosition());
      console.log(map.initedMarkers.find(marker => marker.dataId == markerId));
      console.log(map);
      // console.log(marker);
    })
}