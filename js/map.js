'use strict';
(function () {
  var mapBlock = document.querySelector('.map');
  var pinsList = document.querySelector('.map__pins');
  var address = document.querySelector('#address');

  function createNewPin(offer) {
    var newPin = window.constants.PIN_TEMPLATE.cloneNode(true);
    var newPinImg = newPin.querySelector('img');
    newPinImg.src = offer.author.avatar;
    newPinImg.alt = offer.author.title;
    newPin.style.left = offer.location.x + 'px';
    newPin.style.top = offer.location.y + 'px';
    return newPin;
  }

  function renderPins(offersList) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < offersList.length; i++) {
      fragment.appendChild(createNewPin(offersList[i]));
    }
    pinsList.appendChild(fragment);
  }
  // Все <input> и <select> формы .ad-form заблокированы с помощью атрибута disabled,
  // добавленного на них или на их родительские блоки fieldset;
  var adForm = document.querySelector('.ad-form');
  var inputFields = adForm.querySelectorAll('input');
  var selectFields = adForm.querySelectorAll('select');
  var mapFilters = document.querySelector('.map__filters');
  var mapPinMain = document.querySelector('.map__pin--main');


  function activateElements(pin) {
    if (adForm.classList.contains('ad-form--disabled')) {
      mapBlock.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
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
