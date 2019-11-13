'use strict';
// Создайте новый модуль и опишите в нем функции взаимодействия с удаленным сервером
//  через XHR. В этом задании ограничимся получением данных с сервера при помощи объекта XMLHttpRequest.
// Подключите модуль в index.html и протестируйте решение.

window.backend = (function () {
  var TIMEOUT = 10000;
  var SUCCESS_CODE = 200;
  var mainBlock = document.querySelector('main');
  var resaultMessageBlock = '';

  function removeMessageBlock(evt) {
    evt.preventDefault();
    resaultMessageBlock.remove();
    document.removeEventListener('click', onResaultMessageClick);
    document.removeEventListener('keydown', onResaultMessageEsc);
  }

  var onResaultMessageClick = function (evt) {
    removeMessageBlock(evt);
  };

  var onResaultMessageEsc = function (evt) {
    window.util.isEscEvent(evt, removeMessageBlock);
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
    load: function (onSuccess, onError) {
      var URL = 'https://js.dump.academy/keksobooking/data';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === SUCCESS_CODE) {
          onSuccess(xhr.response);
        } else {
          onError('Статус ответа ' + xhr.status + ' ' + xhr. statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться');
      });

      xhr.timeout = TIMEOUT;

      xhr.open('GET', URL);
      xhr.send();
    },

    save: function (data, onSuccess, onError) {
      var URL = 'https://js.dump.academy/keksobooking';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === SUCCESS_CODE) {
          onSuccess(xhr.response);
        } else {
          onError('Статус ответа ' + xhr.status + ' ' + xhr. statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = TIMEOUT; // 10s
      xhr.open('POST', URL);
      xhr.send(data);
    },

    onLoadSuccess: function (data) {
      window.data.offers = data;
      window.map.renderPins(window.data.offers);
    },

    onLoadError: function (errorMessage) {
      resaultMessageBlock = appendBlock('error', errorMessage);
      var errorButton = resaultMessageBlock.querySelector('.error__button');
      errorButton.addEventListener('click', function () {
        window.map.totalReset();
        resaultMessageBlock.remove();
      });
    },

    onSaveError: function (errorMessage) {
      resaultMessageBlock = appendBlock('error', errorMessage);
      document.addEventListener('keydown', onResaultMessageEsc);
      document.addEventListener('click', onResaultMessageClick);
    },

    onSaveSuccess: function () {
      resaultMessageBlock = appendBlock('success');
      window.map.totalReset();
      document.addEventListener('keydown', onResaultMessageEsc);
      document.addEventListener('click', onResaultMessageClick);
    }
  };
})();
