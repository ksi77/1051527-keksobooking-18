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
    setup: document.querySelector('.setup'),
    coatColor: '',
    eyesColor: ''
  };
})();
