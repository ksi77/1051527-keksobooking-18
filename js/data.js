'use strict';
window.data = (function () {
  var mapBlock = document.querySelector('.map');
  return {
    offers: [],
    mainBlock: document.querySelector('main'),
    mapBlock: mapBlock,
    blockWidht: mapBlock.clientWidth,
    adForm: document.querySelector('.ad-form'),
    activePin: '',
    openedCard: ''
  };
})();
