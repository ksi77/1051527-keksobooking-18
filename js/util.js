'use strict';
window.util = (function () {
  return {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === window.constants.ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === window.constants.ENTER_KEYCODE) {
        action();
      }
    },

    removeCard: function () {
      if (window.data.openedCard) {
        window.data.openedCard.remove();
        window.data.openedCard = '';
      }

      if (window.data.activePin) {
        window.data.activePin.classList.remove('map__pin--active');
        window.data.activePin = '';
      }
    },
  };
})();
