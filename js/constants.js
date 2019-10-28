'use strict';
(function () {
  var pinTemplate = document.querySelector('#pin')
                    .content
                    .querySelector('.map__pin');
  var mapBlock = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');

  window.constants = {
    ENTER_KEYCODE: 13,
    PIN_WIDTH: pinTemplate.clientWidth,
    PIN_HEIGHT: pinTemplate.clientHeight,
    BLOCK_WIDTH: mapBlock.clientWidth,
    MAP_BLOCK: mapBlock,
    PIN_TEMPLATE: pinTemplate,
    AD_FORM: adForm,
    PIN_COUNT: 5,
    MAP_FILTERS: {
      'housing-type': 'type'
    },
    OFFERS: []
  };
})();
