import markersFromPrevSite from "./markersFromPrevSite";

const baseFolder = window.location.href.match(/localhost/)
? './assets/images/infrastructure/markers-for-google/'
: '/wp-content/themes/rihert/assets/images/infrastructure/markers-for-google/';

const markersAdresses = {
    main: `${baseFolder}main.png`,
    metro: `${baseFolder}metro.svg`,
    "education": `${baseFolder}university.svg`,
    "schools": `${baseFolder}schools.svg`,
    "park": `${baseFolder}green-zones.svg`,
    "shop": `${baseFolder}markets.svg`,
    "medicine": `${baseFolder}medicine.svg`,
    "sport": `${baseFolder}sport.svg`,
    "meal": `${baseFolder}meal.svg`,
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

export async function fetchMarkersData(google) {


    const buildLogoSize = google ? new google.maps.Size(33, 40.5) : 0;
    const sendData = new FormData();
    sendData.append('action', 'infrastructure');
    const url = window.location.href.match(/localhost/)
      ? 'https://central-park-wp.smarto.com.ua/wp-admin/admin-ajax.php'
      : '/wp-admin/admin-ajax.php'
    // let markersData = window.location.href.match(/localhost|smarto/) ? Promise.resolve(mockData()) : await fetch(url, {
    //   method: 'POST',
    //   body: sendData,
    // });
    let markersData = Promise.resolve(mockData());
    // markersData = window.location.href.match(/localhost|smarto/) ? mockData() : await markersData.json();
    markersData = mockData();
    if (!markersData) {
      console.warn('Wrong data recieved');
      return;
    };

    // console.log(markersData);
    let formatedMarkersDataForMap = markersData.reduce((acc, el) => {
      // if (!el.list) return acc;
      acc.push({
        content: `<div ${markerPopupStyle}>${el.name}</div>`,
          position: {
            lat: el.coordinations.latitude,
            lng: el.coordinations.elevation
          },
          category: el.category,
          type: el.code,
          id: el.id,
          zIndex: el.zIndex || 1,
          icon: { url: markersAdresses[el.code], scaledSize: buildLogoSize }
      })
      // el.list.forEach(marker => {
      //   acc.push({
      //     content: `<div ${markerPopupStyle}>${marker.name}</div>`,
      //     position: {
      //       lat: marker.coordinations.latitude,
      //       lng: marker.coordinations.elevation
      //     },
      //     type: el.code,
      //     id: marker.id,
      //     zIndex: 2,
      //     icon: { url: markersAdresses[el.code], scaledSize: buildLogoSize }
      //   });
      // });
      return acc;
    }, []);


    // console.log(formatedMarkersDataForMap);

    // markersFromPrevSite().forEach(marker => {
    //     formatedMarkersDataForMap.push({
    //         content: marker.description,
    //         position: {
    //           lat: marker.lat,
    //           lng: marker.lng
    //         },
    //         type: marker.category,
    //         id: marker.id,
    //         zIndex: 1,
    //         icon: { url: markersAdresses[marker.category], scaledSize: buildLogoSize }
    //       })
    // })

    return formatedMarkersDataForMap;
}



function mockData() {
    return [
        // {
        //     "name": "Rams Denizkent Bayramoğlu",
        //     "code": "main",
        //     "list": [
        //         {
        //             "name": "<a style='text-decoration:none; color: rgba(0,151,217,1); font-weight: bold' target='_blank' href='https://ramsdenizkent.com/'>Rams Denizkent Bayramoğlu</a>",
        //             "id": "00",
        //             "coordinations": {
        //                 "latitude": "40.794796",
        //                 "elevation": "29.350719"
        //             }
        //         }
        //     ]
        // },
        {
          name: 'Ріхерт&Парк' ,
          code: 'main',
          zIndex: 3,
          coordinations: {
            latitude: 50.4701921,
            elevation: 30.498578
          },
        },
        {
          name: 'Тараса Шевченко' ,
          code: 'metro',
          coordinations: {
            latitude: 50.4740062,
            elevation: 30.5038193
          },
        },
        {
          name: 'Контрактова площа' ,
          code: 'metro',
          coordinations: {
            latitude: 50.4664817,
            elevation: 30.5133583
          },
        },
        {
           name: 'Києво-могилянська академія' ,
           code: 'education',
           coordinations: {
            latitude: 50.4660416,
            elevation: 30.5226772
          },
          },
        {
          name: 'КМБШ' ,
          code: 'education',
          coordinations: {
            latitude: 50.4660416,
            elevation: 30.5226772
          },
        },
        {
          name: 'Українська школа вільних наук'  ,
          code: 'education',
          coordinations: {
            latitude: 50.47377971177414,
            elevation:  30.509400865726203
          },
        },
        {
          name: 'Ліцей №100 «Поділ»' ,
          code: 'schools',
          coordinations: {
            latitude: 50.461408848152686,
            elevation:  30.519144015205505
          },
        },
        {
          name: 'Школа І-ІІІ ступенів №25' ,
          code: 'schools',
          coordinations: {
            latitude: 50.457821620648964,
            elevation:  30.518515119793697
          },
        },
        {
          name: 'Київське вище професійне училище водного транспорту' ,
          code: 'schools',
          coordinations: {
            latitude: 50.463462179018585,
            elevation:  30.52184154961619
          },
        },
        {
          name: 'Київський професійний ліцей сфери послуг'  ,
          code: 'schools',
          coordinations: {
            latitude: 50.468083881868324,
            elevation:  30.514720728072614
          },
        },
        {
          name: 'Приватний ліцензований садок BabyNest Podil' ,
          code: 'schools',
          coordinations: {
            latitude: 50.47371952929318,
            elevation:  30.50941991348393
          },
        },
        {
          name: 'Заклад дошкільної освіти №676 «Сонечко»' ,
          code: 'schools',
          coordinations: {
            latitude: 50.468881527220326,
            elevation:  30.51502502693002
          },
        },
        {
          name: 'Заклад дошкільної освіти №16' ,
          code: 'schools',
          coordinations: {
            latitude: 50.461736114086165,
            elevation:  30.516618371982137
          },
        },
        {
          name: 'Школа-дитячий садок «Поділля»'  ,
          code: 'schools',
          coordinations: {
            latitude: 50.470587690719036,
            elevation:  30.51132649704351
          },
        },
        {
          name: 'Сквер імені Василя Сліпака' ,
          code: 'park',
          coordinations: {
            latitude: 50.461528182672154,
            elevation:  30.51615624853041
          },
        },
        {
          name: 'Сквер на Щекавицькій площі' ,
          code: 'park',
          coordinations: {
            latitude: 50.46905148428956,
            elevation:  30.509750380854964
          },
        },
        {
          name: 'Сквер Гейдара Алієва'  ,
          code: 'park',
          coordinations: {
            latitude: 50.46186820292323,
            elevation:  30.490097111975867
          },
        },
        {
          name: 'Самосад' ,
          code: 'park',
          coordinations: {
            latitude: 50.46719802983957,
            elevation:  30.518917158412986
          },
        },
        { name: 'Сільпо, П.Сагайдачного, 41', 
          code: 'shop',
        coordinations: {
          latitude: 50.46292234168906,
          elevation:  30.518756366070853 },
        },
        { name: 'Сільпо, Ярославська, 56а', 
        code: 'shop',
        coordinations: {
          latitude: 50.471690800786476,
          elevation:  30.517555447961385 },
        },
        { name: 'Сільпо, Оленівська,3' ,
        code: 'shop',
        coordinations: {
          latitude: 50.47171830118794,
          elevation:  30.50249068736818 },
        },
        { name: 'АТБ, Межигірська, 55/20', 
        code: 'shop',
        coordinations: {
          latitude: 50.471940059117856,
          elevation:  30.506496480132487 },
        },
        { name: 'АТБ, Констянтинівська, 71' ,
        code: 'shop',
        coordinations: {
          latitude: 50.4728129319896,
          elevation:  30.501822988627474 },
        },
        { 
          name: 'Новус (Нижній Вал, 17/8)' ,
          code: 'shop',
          coordinations: {
            latitude: 50.46556567473693,
            elevation:  30.510853875561896
          },
        },
        { 
          name: 'Клінічна лікарня №15' ,
          code: 'medicine',
          coordinations: {
            latitude: 50.46604728929463,
            elevation:  30.521863954642175
          },
        },
        { 
          name: 'Поліклініка Республіканської клінічної лікарні' ,
          code: 'medicine',
          coordinations: {
            latitude: 50.46064030246638,
            elevation:  30.522892477291013
          },
        },
        { 
          name: 'Амбулаторія №1, КНП "ЦПМСД №1" Подільського район' ,
          code: 'medicine',
          coordinations: {
            latitude: 50.47142926918802,
            elevation:  30.512091378637187
          },
        },
        { 
          name: 'Аптека Доброго дня (Констянтинівська, 71)' ,
          code: 'medicine',
          coordinations: {
            latitude: 50.47201727711961,
            elevation:  30.502947032009942
          },
        },
        { 
          name: 'Ніколаб (Ярославська, 5/2)' ,
          code: 'medicine',
          coordinations: {
            latitude: 50.46693230095641,
            elevation:  30.50909000166158
          },
        },
        { 
          name: 'Сінево (Костянтинівська, 20)' ,
          code: 'medicine',
          coordinations: {
            latitude: 50.46812251816475,
            elevation:  30.5109288821071
          },
        },
        { 
          name: 'Діла (Нижній Вал, 37/20)' ,
          code: 'medicine',
          coordinations: {
            latitude: 50.46810831319958,
            elevation:  30.514254090293946
          },
        },
        { 
          name: 'SportLife (Волоська, 62)' ,
          code: 'sport',
          coordinations: {
            latitude: 50.47355231757776,
            elevation:  30.51131704791436
          },
        },
        { 
          name: 'Гіперіон' ,
          code: 'sport',
          coordinations: {
            latitude: 50.473513980174836,
            elevation:  30.498539477303485
          },
        },
        { 
          name: 'Кінотеатр Жовтень'  ,
          code: 'sport',
          coordinations: {
            latitude: 50.46852633137716,
            elevation:  30.51033613915435
          },
        },
        { 
          name: 'Музей сучасного мистецтва' ,
          code: 'sport',
          coordinations: {
            latitude: 50.471864933131,
            elevation:  30.497974018939082
          },
        },
        { 
          name: 'Воздвиженка'  ,
          code: 'sport',
          coordinations: {
            latitude: 50.461336963699814,
            elevation:  30.50969167264748
          },
        },
        { 
          name: 'Mirali' ,
          code: 'meal',
          coordinations: {
            latitude: 50.477502037370165,
            elevation:  30.49876248671885
          },
        },
        { 
          name: 'Garage' ,
          code: 'meal',
          coordinations: {
            latitude: 50.47772730879304,
            elevation:  30.49877333916244
          },
        },
        { 
          name: 'Завертайло' ,
          code: 'meal',
          coordinations: {
            latitude: 50.466454172702896,
            elevation:  30.516214202208385
          },
        },
        { 
          name: 'Win Bar' ,
          code: 'meal',
          coordinations: {
            latitude: 50.466567487496185,
            elevation:  30.515875534447634
          },
        },
        { 
          name: 'Hum Hum' ,
          code: 'meal',
          coordinations: {
            latitude: 50.46730903780037,
            elevation:  30.5146938347999
          },
        },
        { 
          name: '3B Cafe' ,
          code: 'meal',
          coordinations: {
            latitude: 50.46752371794094,
            elevation:  30.515788310726837
          },
        },
    ]
}


