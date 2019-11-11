'use strict';
(function () {
  // Доработайте обработчик отправки формы, который вы делали в задании «Личный проект: доверяй, но проверяй»,
  // так чтобы он отменял действие формы по умолчанию и отправлял данные формы на сервер посредством XHR https://js.dump.academy/keksobooking.
  // После успешной передачи данных на сервер верните страницу в неактивное состояние:
  // очистите заполненные поля;
  // удалите метки похожих объявлений и карточку активного объявления;
  // верните метку адреса в исходное положение, не забыв скорректировать координаты, отображаемые в поле «Адрес»;
  // Покажите сообщение об успешной отправке формы. Разметка сообщения находится блоке #success внутри шаблона template.
  // Сообщение должно исчезать по нажатию на клавишу Esc и по клику на произвольную область экрана.
  var onSaveErrorButtonEsc = function (evt) {
    window.util.isEscEvent(evt, removeErrorBlock);
  };

  // а вот здесь функции реакции на клик разные
  var onSaveErrorClick = function (evt) {
  // Сообщение должно исчезать после нажатия на кнопку .error__button, по нажатию на клавишу Esc и по клику на произвольную область экрана.
    evt.preventDefault();
    removeErrorBlock();
  };

  function removeErrorBlock() {
    window.data.mainBlock.lastChild.remove();
    document.removeEventListener('keydown', onSaveErrorButtonEsc);
    document.removeEventListener('click', onSaveErrorClick);
  }

  var onSaveError = function (errorMessage) {
    // Если при отправке данных произошла ошибка запроса, покажите соответствующее сообщение.
    // Разметку сообщения, которая находится в блоке #error в шаблоне template, нужно разместить в main.
    // с этого места
    var errorTemplate = document.querySelector('#error')
                        .content
                        .querySelector('.error');
    var errorBlock = errorTemplate.cloneNode(true);
    errorBlock.querySelector('.error__message').textContent = errorMessage;
    var mainBlock = document.querySelector('main');
    mainBlock.appendChild(errorBlock);

    // и до этого обработчик ошибки одинаковый

    document.addEventListener('keydown', onSaveErrorButtonEsc);
    document.addEventListener('click', onSaveErrorClick);
  };

  var onSaveSuccess = function () {
    removeErrorBlock();
    // cleanEverything();
  };

  window.data.adForm.addEventListener('submit', function (evt) {
    save(new FormData(window.data.adForm), onSaveSuccess, onSaveError);
    evt.preventDefault();
  });


  function save(data, successHandler, errorHandler) {
    var URL = 'https://js.dump.academy/keksobooking';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      successHandler();
    });
    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s
    xhr.open('POST', URL);
    xhr.send(data);
  }
})();
