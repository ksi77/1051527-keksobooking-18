'use strict';
window.messenger = (function () {
  var mainBlock = document.querySelector('main');
  var resultMessageBlock = '';

  function removeMessageBlock(evt) {
    evt.preventDefault();
    resultMessageBlock.remove();
    document.removeEventListener('click', onResultMessageClick);
    document.removeEventListener('keydown', onResultMessageEsc);
  }

  var onResultMessageClick = function (evt) {
    removeMessageBlock(evt);
  };

  var onResultMessageEsc = function (evt) {
    window.util.isEscEvent(evt, removeMessageBlock(evt));
  };

  function appendBlock(blockName, errorMessage) {
    var blockTemplate = document.querySelector('#' + blockName)
                        .content
                        .querySelector('.' + blockName);
    var blockClone = blockTemplate.cloneNode(true);
    if (errorMessage) {
      blockClone.querySelector('.error__message').textContent = errorMessage;
    }
    mainBlock.appendChild(blockClone);
    return blockClone;
  }

  return {
    onLoadError: function (errorMessage) {
      resultMessageBlock = appendBlock('error', errorMessage);
      var errorButton = resultMessageBlock.querySelector('.error__button');
      errorButton.addEventListener('click', function () {
        window.map.totalReset();
        resultMessageBlock.remove();
      });
    },

    onSaveError: function (errorMessage) {
      resultMessageBlock = appendBlock('error', errorMessage);
      document.addEventListener('keydown', onResultMessageEsc);
      document.addEventListener('click', onResultMessageClick);
    },

    onSaveSuccess: function () {
      resultMessageBlock = appendBlock('success');
      window.map.totalReset();
      document.addEventListener('keydown', onResultMessageEsc);
      document.addEventListener('click', onResultMessageClick);
    }
  };
})();
