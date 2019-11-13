'use strict';
window.backend = (function () {
  var TIMEOUT = 10000;
  var SUCCESS_CODE = 200;

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
  };
})();
