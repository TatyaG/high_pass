ymaps.ready(init);
    function init(){
        var myMap = new ymaps.Map("map", {
            center: [55.76963601332982, 37.636710499999985],
            zoom: 14
        });

        myMap.controls.remove('geolocationControl'); // удаляем геолокацию
        myMap.controls.remove('searchControl'); // удаляем поиск
        myMap.controls.remove('trafficControl'); // удаляем контроль трафика
        myMap.controls.remove('typeSelector'); // удаляем тип
        myMap.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
        myMap.controls.remove('zoomControl'); // удаляем контрол зуммирования
        myMap.controls.remove('rulerControl'); // удаляем контрол правил


        let myPlacemark = new ymaps.Placemark([55.76963601332982, 37.636710499999985], {}, {
            iconLayout: 'default#image',
            iconImageHref: 'img/Ellipse.svg',
            iconImageSize: [12, 12],
          });
          myMap.geoObjects.add(myPlacemark);

          myPlacemark.events.add('click', function() {
            document.querySelector('.address-block').classList.add('address-block--active');
          })
    }


const closeBtn = document.querySelector('.close');
closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.address-block').classList.remove('address-block--active');

})


// search

const searchBtn = document.querySelector('.header__search');
const closeSearch = document.querySelector('.close-search');

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.search-block').classList.add('active');
})

closeSearch.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.search-block').classList.remove('active');
})

const burgerBtn = document.querySelector('.burger');
const closeMenu = document.querySelector('.close-menu');

burgerBtn.addEventListener('click', (e) => {
    document.querySelector('.burger-menu').classList.add('burger-menu--active');
})

closeMenu.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.burger-menu').classList.remove('burger-menu--active');
})


// validation

const validator = new window.JustValidate('.contacts__form', {
  errorLabelStyle: {
    color: '#FF3030',
  }
});

validator
  .addField('#name', [
    {
      rule: 'required',
      errorMessage: 'Введите имя',
    },
  ])
  .addField('#email', [
    {
      rule: 'required',
      errorMessage: 'Введите e-mail',
    },
    {
      rule: 'email',
      errorMessage: 'Недопустимый формат',
    },
  ])


  const validate = new window.JustValidate('.about__form', {
    errorLabelStyle: {
      color: '#F06666',
    }
  });

validate
.addField('#about-email', [
  {
    rule: 'required',
    errorMessage: 'Введите e-mail',
  },
  {
    rule: 'email',
    errorMessage: 'Недопустимый формат',
  },
])

