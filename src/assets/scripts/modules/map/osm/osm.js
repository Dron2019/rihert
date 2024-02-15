import { fetchMarkersData } from "../getMarkers";

export default async function osm($map) {
    if (!$map) return;
    const map = L.map($map).setView([51.505, -0.09], 16);

    const markers = await fetchMarkersData();

    window.osm = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        minZoom: 13
    }).addTo(map);


    putMarkersOnMap(markers, map);
    const initedMarkers = getInitedMarkers(map);
    handleFiltration(initedMarkers);


}

function handleFiltration(initedMarkers) {
 /** Массив, куда записываются выбраные категории */
    const choosedCategories = new Set();
    choosedCategories.add('main');
    window.choosedCategories = choosedCategories;

    const filterItems = document.querySelectorAll('[data-marker]');

    filterItems.forEach((item) => {
        item.addEventListener('click', (evt) => {
            evt.stopImmediatePropagation();
            item.classList.toggle('active');
            if (item.classList.contains('active')) {
                choosedCategories.add(item.dataset.category);
                if (item.dataset.multicategory) {
                    const innerCategories = item.dataset.multicategory.split('~');
                    innerCategories.forEach(el => choosedCategories.add(el));
                }
            } else {
                choosedCategories.delete(item.dataset.category);
                if (item.dataset.multicategory) {
                    const innerCategories = item.dataset.multicategory.split('~');
                    innerCategories.forEach(el => choosedCategories.delete(el));
                }
            }
            filterMarkers('main', choosedCategories, initedMarkers);
        });
    });
}

function getInitedMarkers(map) {
    const initedMarkers = [];
    map.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {
            initedMarkers.push(layer);
        }
    });
    return initedMarkers;
}


function putMarkersOnMap(markers, map) {
    markers.forEach((marker, index) => {
        if (index === 0) {
            map.setView([marker.position.lat, marker.position.lng], 15);
        }
        L.marker([marker.position.lat, marker.position.lng], {
            id: index,
            category: marker.type,
            icon: L.icon({
                iconUrl: marker.icon.url,
                iconSize: [33, 40.5], // size of the icon
                iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
                popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
            })
        
        }).addTo(map)
            .bindPopup(marker.content)
    });
}

function filterMarkers(category, categoriesArray, initedMarkers) {
    initedMarkers.forEach((el) => {
        if (categoriesArray.size <= 1) {
            el.setOpacity(1);
            return;
        }
        if (categoriesArray.has(el.options.category)) {
            el.setOpacity(1);
        } else {
            el.setOpacity(0);
        }
    });
};