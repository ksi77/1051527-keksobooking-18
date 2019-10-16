'use strict';
window.map = (function () {
  var pinsList = window.constants.MAP_BLOCK.querySelector('.map__pins');
  var address = window.constants.AD_FORM.querySelector('#address');

  var mapFilters = window.constants.MAP_BLOCK.querySelector('.map__filters');
  var mapPinMain = window.constants.MAP_BLOCK.querySelector('.map__pin--main');


  function activateElements(pin) {
    if (window.constants.MAP_BLOCK.classList.contains('map--faded')) {
      window.constants.MAP_BLOCK.classList.remove('map--faded');
      mapFilters.classList.remove('map-filters--disabled');
      window.form.activate(true);
      setAddress(pin);
      window.backend.load(window.map.renderPins, window.backend.onError);
      mapPinMain.removeEventListener('keydown', mapPinMainKeydownHandler);
    }// Иначе форма уже активна
  }

  function setAddress(pin, toCenter) {
    var addressX = pin.offsetLeft + pin.clientWidth / 2;
    var addressY = pin.offsetTop + (toCenter ? pin.clientHeight / 2 : pin.clientHeight);
    address.value = Math.round(addressX) + ', ' + Math.round(addressY);
  }

  // Первое взаимодействие с меткой (mousedown) переводит страницу в активное состояние.
  mapPinMain.addEventListener('mousedown', function () {
    activateElements(mapPinMain);
  });

  var mapPinMainKeydownHandler = function (evt) {
    if (evt.keyCode === window.constants.ENTER_KEYCODE) {
      activateElements(mapPinMain);
    }
  };

  mapPinMain.addEventListener('keydown', mapPinMainKeydownHandler);

  setAddress(mapPinMain, true);
  window.form.activate(false);


  return {
    renderPins: function (offersList) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < offersList.length; i++) {
        fragment.appendChild(window.pin.create(offersList[i]));
      }
      pinsList.appendChild(fragment);
    }
  };
})();
