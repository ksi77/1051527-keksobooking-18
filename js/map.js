'use strict';
window.map = (function () {
  var pinsList = window.data.mapBlock.querySelector('.map__pins');
  var address = window.data.adForm.querySelector('#address');
  var housingType = window.data.mapBlock.querySelector('#housing-type');

  var mapFilters = window.data.mapBlock.querySelector('.map__filters');
  var mapPinMain = window.data.mapBlock.querySelector('.map__pin--main');
  var Rect = function (left, top, right, bottom) {
    this.left = left;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
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

  var mapPinMainSize = new Coordinate(64, 80); // Y - Это из стилевого файла: 65+22-6. Должно быть 81

  var mapPinMainFirstKeydownHandler = function (evt) {
    if (evt.keyCode === window.constants.ENTER_KEYCODE) {
      activateElements(mapPinMain);
    }
  };

  function activateElements(pin) {
    if (window.data.mapBlock.classList.contains('map--faded')) {
      window.data.mapBlock.classList.remove('map--faded');
      mapFilters.classList.remove('map-filters--disabled');
      window.form.activate(true);
      setAddress(pin);
      window.backend.load(window.backend.onSuccess, window.backend.onError);
      mapPinMain.removeEventListener('mousedown', mapPinMainFirstMousdownHandler);
      mapPinMain.removeEventListener('keydown', mapPinMainFirstKeydownHandler);
      mapPinMain.addEventListener('mousedown', mapPinMainMousdownHandler);
    }// Иначе форма уже активна, эта проверка, возможно, лишняя
  }

  function setAddress(pin, toCenter) {
    var addressX = pin.offsetLeft + mapPinMainSize.x / 2;
    var addressY = pin.offsetTop + (toCenter ? pin.clientHeight / 2 : mapPinMainSize.y);
    address.value = Math.round(addressX) + ', ' + Math.round(addressY);
  }

  var mapPinMainMousdownHandler = function (evt) {
    var pinMargins = new Rect(1 - mapPinMainSize.x / 2, 130 - mapPinMainSize.y, window.data.mapBlock.offsetWidth - mapPinMainSize.x / 2, 630 - mapPinMainSize.y);
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
      setAddress(mapPinMain, false);

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

  var mapPinMainFirstMousdownHandler = function () {
    // Первое взаимодействие с меткой (mousedown) переводит страницу в активное состояние, удадяеь вызвавшие себя методы, добавляет новый метод на mousedown
    activateElements(mapPinMain);
  };

  mapPinMain.addEventListener('mousedown', mapPinMainFirstMousdownHandler);

  housingType.addEventListener('change', function () {
    var filteredOffersList = window.filter.set(window.data.offers, housingType);
    window.map.renderPins(filteredOffersList);
  });

  mapPinMain.addEventListener('keydown', mapPinMainFirstKeydownHandler);

  setAddress(mapPinMain, true);
  window.form.activate(false);


  return {
    renderPins: function (offersList) {
      var pinsToRemove = pinsList.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var i = 0; i < pinsToRemove.length; i++) {
        pinsToRemove[i].remove();
      }

      var fragment = document.createDocumentFragment();
      var pinCount = window.constants.PIN_COUNT < offersList.length ? window.constants.PIN_COUNT : offersList.length;
      for (i = 0; i < pinCount; i++) {
        fragment.appendChild(new window.Pin(offersList[i]));
      }

      pinsList.appendChild(fragment);
    }
  };
})();
