'use strict';
window.backend = (function () {
  var TIMEOUT = 10000;
  var SUCCESS_CODE = 200;
  var GET_URL = 'https://js.dump.academy/keksobooking/data';
  var POST_URL = 'https://js.dump.academy/keksobooking';

  function createXMLHttpRequest(metod, url, data, onSuccess, onError) {
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

    xhr.open(metod, url);
    xhr.send(data);
  }

  return {
    load: function (onSuccess, onError) {
      createXMLHttpRequest('GET', GET_URL, '', onSuccess, onError);
    },

    save: function (data, onSuccess, onError) {
      createXMLHttpRequest('POST', POST_URL, data, onSuccess, onError);
    },
  };
})();
