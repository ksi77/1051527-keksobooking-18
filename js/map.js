'use strict';
window.map = (function () {
  var pinsList = window.data.mapBlock.querySelector('.map__pins');
  var address = window.data.adForm.querySelector('#address');

  var mapFilters = window.data.mapBlock.querySelector('.map__filters');
  var mapPinMain = window.data.mapBlock.querySelector('.map__pin--main');

  var mapPinMainInitialCoordinate = '';

  var DEFINITION_AREA = {
    left: 1,
    top: 130,
    right: 'window.data.mapBlock.offsetWidth',
    bottom: 630
  };

  var MAIN_PIN_SIZE = {
    width: 66,
    height: 80,
    radius: 33
  };

  var Coordinate = function (x, y, constraints) {
    this.x = x;
    this.y = y;
    this._constraints = constraints;
  };

  Coordinate.prototype.setX = function (x) {
    if (x >= this._constraints.left &&
        x <= this._constraints.right) {
      this.x = x;
    }
  };

  Coordinate.prototype.setY = function (y) {
    if (y >= this._constraints.top &&
        y <= this._constraints.bottom) {
      this.y = y;
    }
  };

  function resetMainPin() {
    mapPinMain.style.left = mapPinMainInitialCoordinate.x;
    mapPinMain.style.top = mapPinMainInitialCoordinate.y;
  }

  function clearPins() {
    var pinsToRemove = pinsList.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pinsToRemove.length; i++) {
      pinsToRemove[i].remove();
    }
    window.util.removeCard();
  }

  function activateElements() {
    if (window.data.mapBlock.classList.contains('map--faded')) {
      mapPinMainInitialCoordinate = new Coordinate(mapPinMain.style.left, mapPinMain.style.top);
      window.data.mapBlock.classList.remove('map--faded');
      mapFilters.classList.remove('map-filters--disabled');
      window.form.activate(true);
      setAddress(false);
      window.backend.load(window.backend.onLoadSuccess, window.backend.onLoadError);
      mapPinMain.removeEventListener('mousedown', mapPinMainFirstMousdownHandler);
      mapPinMain.removeEventListener('keydown', mapPinMainFirstKeydownHandler);
      mapPinMain.addEventListener('mousedown', mapPinMainMousdownHandler);
    }
  }

  function setAddress(toCenter) {
    var addressX = mapPinMain.offsetLeft + (toCenter ? MAIN_PIN_SIZE.radius : MAIN_PIN_SIZE.width / 2);
    var addressY = mapPinMain.offsetTop + (toCenter ? MAIN_PIN_SIZE.radius : MAIN_PIN_SIZE.height);
    address.value = Math.round(addressX) + ', ' + Math.round(addressY);
  }

  var mapPinMainFirstKeydownHandler = function (evt) {
    window.util.isEnterEvent(evt, activateElements);
  };

  var mapPinMainFirstMousdownHandler = function () {
    // Первое взаимодействие с меткой (mousedown) переводит страницу в активное состояние, удадяеь вызвавшие себя методы, добавляет новый метод на mousedown
    activateElements();
  };

  var mapPinMainMousdownHandler = function (evt) {
    var pinMargins = {
      left: DEFINITION_AREA.left - MAIN_PIN_SIZE.width / 2,
      top: DEFINITION_AREA.top - MAIN_PIN_SIZE.height,
      right: window.data.mapBlock.offsetWidth - MAIN_PIN_SIZE.width / 2,
      bottom: DEFINITION_AREA.bottom - MAIN_PIN_SIZE.height
    };
    evt.preventDefault();

    var dragged = false;
    var startCoords = new Coordinate(evt.clientX, evt.clientY);
    var pinCoords = new Coordinate(mapPinMain.offsetLeft, mapPinMain.offsetTop, pinMargins);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      var shift = new Coordinate(startCoords.x - moveEvt.clientX, startCoords.y - moveEvt.clientY);


      startCoords = new Coordinate(moveEvt.clientX, moveEvt.clientY);

      pinCoords.setX(mapPinMain.offsetLeft - shift.x);
      pinCoords.setY(mapPinMain.offsetTop - shift.y);

      mapPinMain.style.left = pinCoords.x + 'px';
      mapPinMain.style.top = pinCoords.y + 'px';
      setAddress(false);

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (evtClick) {
          evtClick.preventDefault();
          mapPinMain.removeEventListener('click', onClickPreventDefault);
        };
        mapPinMain.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  mapPinMain.addEventListener('mousedown', mapPinMainFirstMousdownHandler);

  mapPinMain.addEventListener('keydown', mapPinMainFirstKeydownHandler);

  setAddress(true);
  window.form.activate(false);


  return {
    renderPins: function (offersList) {
      clearPins();
      var fragment = document.createDocumentFragment();
      var pinCount = window.constants.PIN_COUNT < offersList.length ? window.constants.PIN_COUNT : offersList.length;
      for (var i = 0; i < pinCount; i++) {
        fragment.appendChild(new window.Pin(offersList[i]));
      }

      pinsList.appendChild(fragment);
    },

    totalReset: function () {
      window.data.mapBlock.classList.add('map--faded');
      mapFilters.classList.add('map-filters--disabled');
      window.form.activate(false);
      clearPins();
      resetMainPin();
      window.data.adForm.reset();
      setAddress(mapPinMain);
      mapPinMain.addEventListener('mousedown', mapPinMainFirstMousdownHandler);
      mapPinMain.addEventListener('keydown', mapPinMainFirstKeydownHandler);
    }
  };
})();
