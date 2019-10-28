'use strict';
window.map = (function () {
  var pinsList = window.constants.MAP_BLOCK.querySelector('.map__pins');
  var initialPinsList = pinsList.cloneNode(true);
  var address = window.constants.AD_FORM.querySelector('#address');

  var mapFilters = window.constants.MAP_BLOCK.querySelector('.map__filters');
  var mapPinMain = window.constants.MAP_BLOCK.querySelector('.map__pin--main');

  function onSuccess(data) {
    window.constants.OFFERS = data;
    window.map.renderPins(window.constants.OFFERS);
    mapPinMain.removeEventListener('keydown', mapPinMainKeydownHandler);
  }

  function activateElements(pin) {
    if (window.constants.MAP_BLOCK.classList.contains('map--faded')) {
      window.constants.MAP_BLOCK.classList.remove('map--faded');
      mapFilters.classList.remove('map-filters--disabled');
      window.form.activate(true);
      setAddress(pin);
      window.backend.load(onSuccess, window.backend.onError);
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

  var housingType = window.constants.MAP_BLOCK.querySelector('#housing-type');
  housingType.addEventListener('change', function () {
    var filteredOffersList = window.filter.set(window.constants.OFFERS, housingType);
    window.map.renderPins(filteredOffersList);
  });

  mapPinMain.addEventListener('keydown', mapPinMainKeydownHandler);

  setAddress(mapPinMain, true);
  window.form.activate(false);


  return {
    renderPins: function (offersList) {
      var fragment = document.createDocumentFragment();
      var pinCount = window.constants.PIN_COUNT < offersList.length ? window.constants.PIN_COUNT : offersList.length;
      for (var i = 0; i < pinCount; i++) {
        fragment.appendChild(window.pin.create(offersList[i]));
      }
      pinsList.innerHTML = '';
      pinsList.appendChild(initialPinsList);
      pinsList.appendChild(fragment);
    }
  };
})();
