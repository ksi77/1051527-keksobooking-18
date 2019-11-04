'use strict';
window.map = (function () {
  var pinsList = window.data.mapBlock.querySelector('.map__pins');
  var initialPinsList = pinsList.cloneNode(true);
  var address = window.data.adForm.querySelector('#address');

  var mapFilters = window.data.mapBlock.querySelector('.map__filters');
  var mapPinMain = window.data.mapBlock.querySelector('.map__pin--main');

  function activateElements(pin) {
    if (window.data.mapBlock.classList.contains('map--faded')) {
      window.data.mapBlock.classList.remove('map--faded');
      mapFilters.classList.remove('map-filters--disabled');
      window.form.activate(true);
      setAddress(pin);
      window.backend.load(window.backend.onSuccess, window.backend.onError);
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
    if (evt.keyCode === window.data.ENTER_KEYCODE) {
      activateElements(mapPinMain);
    }
  };

  var housingType = window.data.mapBlock.querySelector('#housing-type');
  housingType.addEventListener('change', function () {
    var filteredOffersList = window.filter.set(window.data.offers, housingType);
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
        fragment.appendChild(new window.Pin(offersList[i]));
      }
      pinsList.innerHTML = '';
      pinsList.appendChild(initialPinsList);
      pinsList.appendChild(fragment);
    }
  };
})();
