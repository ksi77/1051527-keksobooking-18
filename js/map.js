'use strict';
window.map = (function () {
  var pinsList = window.data.mapBlock.querySelector('.map__pins');
  var mapFilters = window.data.mapBlock.querySelector('.map__filters');

  var mapPinMain = window.data.mapPinMain;
  var mapPinSize = window.data.MapPinSize;
  var mapPinMainInitialCoordinate = '';

  var DefinitionArea = {
    LEFT: 1,
    TOP: 130,
    RIGHT: 'window.data.mapBlock.offsetWidth',
    BOTTOM: 630
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
    window.adForm.setAddress(true);
    mapPinMain.removeEventListener('mousedown', onMapPinMainMousdown);
    mapPinMain.addEventListener('mousedown', onMapPinMainFirstMousdown);
    mapPinMain.addEventListener('keydown', onMapPinMainFirstKeydown);
  }

  function clearPins() {
    var pinsToRemove = pinsList.querySelectorAll('.map__pin:not(.map__pin--main)');
    pinsToRemove.forEach(function (item) {
      item.remove();
    });
    window.util.removeCard();
  }

  function onLoadSuccess(data) {
    window.data.offers = data;
    window.map.renderPins(window.data.offers);
  }

  function activateElements() {
    if (window.data.mapBlock.classList.contains('map--faded')) {
      mapPinMainInitialCoordinate = new Coordinate(mapPinMain.style.left, mapPinMain.style.top);
      window.data.mapBlock.classList.remove('map--faded');
      mapFilters.classList.remove('map-filters--disabled');
      window.adForm.activate(true);
      window.backend.load(onLoadSuccess, window.messenger.onLoadError);
      mapPinMain.removeEventListener('mousedown', onMapPinMainFirstMousdown);
      mapPinMain.removeEventListener('keydown', onMapPinMainFirstKeydown);
      mapPinMain.addEventListener('mousedown', onMapPinMainMousdown);
    }
  }

  var onMapPinMainFirstKeydown = function (evt) {
    window.util.isEnterEvent(evt, activateElements);
  };

  var onMapPinMainFirstMousdown = function () {
    // Первое взаимодействие с меткой (mousedown) переводит страницу в активное состояние, удадяеь вызвавшие себя методы, добавляет новый метод на mousedown
    activateElements();
  };

  var onMapPinMainMousdown = function (evt) {
    var pinMargins = {
      left: DefinitionArea.LEFT - mapPinSize.WIDTH / 2,
      top: DefinitionArea.TOP - mapPinSize.HEIGHT,
      right: window.data.mapBlock.offsetWidth - mapPinSize.WIDTH / 2,
      bottom: DefinitionArea.BOTTOM - mapPinSize.HEIGHT
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
      window.adForm.setAddress(false);

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

  mapPinMain.addEventListener('mousedown', onMapPinMainFirstMousdown);

  mapPinMain.addEventListener('keydown', onMapPinMainFirstKeydown);

  window.adForm.activate(false);


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
      clearPins();
      mapFilters.reset();
      window.adForm.reset();
      resetMainPin();
      window.adForm.activate(false);
    },
  };
})();
