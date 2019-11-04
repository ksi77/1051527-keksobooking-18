'use strict';
window.constants = (function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapBlock = document.querySelector('.map');

  return {
    ENTER_KEYCODE: 13,
    ESC_KEYCODE: 27,
    PIN_COUNT: 5,
    mapBlock: mapBlock,
    blockWidht: mapBlock.clientWidth,
    pinTemplate: pinTemplate,
    pinWidth: pinTemplate.clientWidth,
    pinHeight: pinTemplate.clientHeight,
    adForm: document.querySelector('.ad-form')
  };
})();
