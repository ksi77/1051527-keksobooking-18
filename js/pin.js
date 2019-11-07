'use strict';
(function () {
  var mapFiltersContainer = document.querySelector('.map__filters-container');

  window.Pin = function (offer) {
    var newPin = window.data.pinTemplate.cloneNode(true);
    var newPinImg = newPin.querySelector('img');
    newPinImg.src = offer.author.avatar;
    newPinImg.alt = offer.author.title;
    newPin.style.left = offer.location.x + 'px';
    newPin.style.top = offer.location.y + 'px';

    function setActive() {
      window.card.remove();
      newPin.classList.add('map__pin--active');
      window.data.activePin = newPin;
      window.data.mapBlock.insertBefore(window.card.create(offer), mapFiltersContainer);
    }

    var onPinPress = function (evt) {
      window.util.isEscEvent(evt, setActive());
    };

    newPin.addEventListener('click', function () { // я хочу эту метод поместить в прототип. Что-то не получается ничего.
      setActive();
    });

    newPin.addEventListener('mousedown', onPinPress);

    return newPin;
  };
})();
