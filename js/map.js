'use strict';
(function () {
  var pinsList = window.constants.MAP_BLOCK.querySelector('.map__pins');
  var address = window.constants.AD_FORM.querySelector('#address');

  function renderPins(offersList) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < offersList.length; i++) {
      fragment.appendChild(window.pin.create(offersList[i]));
    }
    pinsList.appendChild(fragment);
  }


  var mapFilters = window.constants.MAP_BLOCK.querySelector('.map__filters');
  var mapPinMain = window.constants.MAP_BLOCK.querySelector('.map__pin--main');


  function activateElements(pin) {
    if (window.constants.MAP_BLOCK.classList.contains('map--faded')) {
      window.constants.MAP_BLOCK.classList.remove('map--faded');
      mapFilters.classList.remove('map-filters--disabled');
      window.form.activate(true);
      setAddress(pin);
      mapPinMain.removeEventListener('keydown', keydownMapPinMainHandler);
    }// Иначе форма уже активна
  }

  function setAddress(pin, toCenter) {
    var addressX = 1 * (pin.style.top).replace('px', '') + pin.clientWidth / 2;
    var addressY = 1 * (pin.style.left).replace('px', '') + 1 * ((toCenter) ? pin.clientHeight / 2 : pin.clientHeight);
    address.value = Math.round(addressX) + ', ' + Math.round(addressY);
  }

  // Первое взаимодействие с меткой (mousedown) переводит страницу в активное состояние.
  mapPinMain.addEventListener('mousedown', function () {
    activateElements(mapPinMain);
  });

  var keydownMapPinMainHandler = function (evt) {
    if (evt.keyCode === window.constants.ENTER_KEYCODE) {
      activateElements(mapPinMain);
    }
  };

  mapPinMain.addEventListener('keydown', keydownMapPinMainHandler);

  // renderPins(window.data.offers);
  setAddress(mapPinMain, true);
  window.form.activate(false);

})();
