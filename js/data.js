'use strict';
window.data = (function () {
  var mapBlock = document.querySelector('.map');
  return {
    offers: [],
    mapPinMain: mapBlock.querySelector('.map__pin--main'),
    mapBlock: mapBlock,
    blockWidht: mapBlock.clientWidth,
    adForm: document.querySelector('.ad-form'),
    activePin: '',
    openedCard: '',
    MapPinSize: {
      WIDTH: 66,
      HEIGHT: 80,
      RADIUS: 33
    }
  };
})();
