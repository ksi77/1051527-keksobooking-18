'use strict';
window.map = (function () {
  var pinsList = window.data.mapBlock.querySelector('.map__pins');
  var initialPinsList = pinsList.cloneNode(true);
  var address = window.data.adForm.querySelector('#address');

  var mapFilters = window.data.mapBlock.querySelector('.map__filters');
  var mapPinMain = window.data.mapBlock.querySelector('.map__pin--main');

  var Rect = function (left, top, right, bottom) {
    this.left = left;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
  };

  var MAP_MARGINS = new Rect(1, 130, window.data.mapBlock.offsetWidth, 630);

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

  function activateElements(pin) {
    if (window.data.mapBlock.classList.contains('map--faded')) {
      window.data.mapBlock.classList.remove('map--faded');
      mapFilters.classList.remove('map-filters--disabled');
      window.form.activate(true);
      setAddress(pin);
      window.backend.load(window.backend.onSuccess, window.backend.onError);
    }// Иначе форма уже активна
  }

  function setAddress(pin, toCenter) {
    var addressX = pin.offsetLeft + pin.clientWidth / 2;
    var addressY = pin.offsetTop + (toCenter ? pin.clientHeight / 2 : pin.clientHeight);
    address.value = Math.round(addressX) + ', ' + Math.round(addressY);
  }

  var mapPinMainMousdownHandler = function (evt) {
    evt.preventDefault();
    // Это для отладки 2 строчки, чтобы  очевидно было, что попали.
    var mapFiltersContainer = document.querySelector('.map__filters-container');
    window.data.mapBlock.insertBefore(window.card.create(window.data.offers[1]), mapFiltersContainer);

    var dragged = false;
    var startCoords = new Coordinate(evt.clientX, evt.clientY, MAP_MARGINS);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = new Coordinate(startCoords.x - moveEvt.clientX, startCoords.y - moveEvt.clientY, MAP_MARGINS);

      startCoords.setX(moveEvt.clientX);
      startCoords.setY(moveEvt.clientY);

      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
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
    // Первое взаимодействие с меткой (mousedown) переводит страницу в активное состояние.
    activateElements(mapPinMain);
    mapPinMain.removeEventListener('mousedown', mapPinMainFirstMousdownHandler);
    mapPinMain.removeEventListener('keydown', mapPinMainFirstKeydownHandler);
    mapPinMain.addEventListener('mousedown', mapPinMainMousdownHandler);
  };

  mapPinMain.addEventListener('mousedown', mapPinMainFirstMousdownHandler);

  var mapPinMainFirstKeydownHandler = function (evt) {
    if (evt.keyCode === window.constants.ENTER_KEYCODE) {
      activateElements(mapPinMain);
      mapPinMain.removeEventListener('mousedown', mapPinMainFirstMousdownHandler);
      mapPinMain.removeEventListener('keydown', mapPinMainFirstKeydownHandler);
      mapPinMain.addEventListener('mousedown', mapPinMainMousdownHandler);
    }
  };

  var housingType = window.data.mapBlock.querySelector('#housing-type');
  housingType.addEventListener('change', function () {
    var filteredOffersList = window.filter.set(window.data.offers, housingType);
    window.map.renderPins(filteredOffersList);
  });

  mapPinMain.addEventListener('keydown', mapPinMainFirstKeydownHandler);

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
