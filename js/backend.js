'use strict';
// Создайте новый модуль и опишите в нем функции взаимодействия с удаленным сервером
//  через XHR. В этом задании ограничимся получением данных с сервера при помощи объекта XMLHttpRequest.
// Подключите модуль в index.html и протестируйте решение.

window.backend = (function () {
  return {
    load: function (onSuccess, onError) {
      var URL = 'https://js.dump.academy/keksobooking/data';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
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

      xhr.timeout = 10000;

      xhr.open('GET', URL);
      xhr.send();
    },
    onError: function (errorMessage) {
      // Если при загрузке данных произошла ошибка запроса, покажите соответствующее
      // сообщение в блоке main,
      // используя блок #error из шаблона template
      var errorTemplate = document.querySelector('#error')
                          .content
                          .querySelector('.error');
      var errorBlock = errorTemplate.cloneNode(true);
      errorBlock.querySelector('.error__message').textContent = errorMessage;
      var mainBlock = document.querySelector('main');
      mainBlock.appendChild(errorBlock);

      var errorButton = errorBlock.querySelector('.error__button');
      errorButton.addEventListener('click', function (evt) {
        evt.preventDefault();
        mainBlock.lastChild.remove();
        window.backend.load(window.map.renderPins, window.backend.onError);
      });
    }
  };
})();
