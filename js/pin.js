'use strict';
window.pin = function () {
  return {
    create: function (offer) {
      var newPin = window.constants.PIN_TEMPLATE.cloneNode(true);
      var newPinImg = newPin.querySelector('img');
      newPinImg.src = offer.author.avatar;
      newPinImg.alt = offer.author.title;
      newPin.style.left = offer.location.x + 'px';
      newPin.style.top = offer.location.y + 'px';
      return newPin;
    }
  };
}();
