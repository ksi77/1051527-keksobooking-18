'use strict';
(function () {
  var pinsList = window.constants.MAP_BLOCK.querySelector('.map__pins');
  var address = window.constants.AD_FORM.querySelector('#address');

  function renderPins(offersList) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < offersList.length; i++) {
      fragment.appendChild(window.pin.createNewPin(offersList[i]));
    }
    pinsList.appendChild(fragment);
  }

  var inputFields = window.constants.AD_FORM.querySelectorAll('input');
  var selectFields = window.constants.AD_FORM.querySelectorAll('select');
  var mapFilters = window.constants.MAP_BLOCK.querySelector('.map__filters');
  var mapPinMain = window.constants.MAP_BLOCK.querySelector('.map__pin--main');


  function activateElements(pin) {
    if (window.constants.AD_FORM.classList.contains('ad-form--disabled')) {
      window.constants.MAP_BLOCK.classList.remove('map--faded');
      window.constants.AD_FORM.classList.remove('ad-form--disabled');
      mapFilters.classList.remove('map-filters--disabled');
      disableElements([inputFields, selectFields], false);
      setAddress(pin);
    }// Иначе форма уже активна
  }

  function disableElements(arrayOfListsElements, disabled) {
    for (var i = 0; i < arrayOfListsElements.length; i++) {
      var currentList = arrayOfListsElements[i];
      for (var j = 0; j < currentList.length; j++) {
        currentList[j].disabled = disabled;
      }
    }
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

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.constants.ENTER_KEYCODE) {
      activateElements(mapPinMain);
    }
  });

  // renderPins(window.data.offers);
  setAddress(mapPinMain, true);
  disableElements([inputFields, selectFields], true);

})();
