'use strict';
window.data = (function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapBlock = document.querySelector('.map');
  return {
    offers: [],
    mapBlock: mapBlock,
    blockWidht: mapBlock.clientWidth,
    pinTemplate: pinTemplate,
    pinWidth: pinTemplate.clientWidth,
    pinHeight: pinTemplate.clientHeight,
    adForm: document.querySelector('.ad-form'),
    activePin: '',
    openedCard: ''
  };
})();
