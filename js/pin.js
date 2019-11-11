'use strict';
(function () {
  var PIN_SIZE = {
    x: 50,
    y: 70
  };

  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  window.Pin = function (offer) {
    var newPin = pinTemplate.cloneNode(true);
    var newPinImg = newPin.querySelector('img');
    newPinImg.src = offer.author.avatar;
    newPinImg.alt = offer.author.title;
    newPin.style.left = offer.location.x - PIN_SIZE.x / 2 + 'px';
    newPin.style.top = offer.location.y - PIN_SIZE.y + 'px';

    function setActive() {
      window.util.removeCard();
      newPin.classList.add('map__pin--active');
      window.data.activePin = newPin;
      window.data.mapBlock.insertBefore(window.card.create(offer), mapFiltersContainer);
    }

    var onPinPress = function (evt) {
      window.util.isEnterEvent(evt, setActive());
    };

    newPin.addEventListener('click', function () {
      setActive();
    });

    newPin.addEventListener('keydown', onPinPress);

    return newPin;
  };
})();
