'use strict';
window.filter = (function () {
  var MAP_FILTERS = {
    'housing-type': 'type'
  };

  return {
    // Функция выборки из массива, параметры: массив и поле-селект, по значению которого происходит выборка.
    set: function (array, filterField) {
      // Значение - это первый (и единственный? там же не мультиселект?) элемент списка выбранных элементов
      var filterValue = filterField.selectedOptions[0].value;
      // функция, которая возвращает true, если элемент удовлетворяет условиям выборки, имеет 1-2-3 параметра.
      // (как использовать 2(индекс) и 3(массив) я не поняла)
      function isFilterTrue(element) {
        // поскольку имя поля-селект не соответствует имени свойства объекта предложений в массиве, который вернул сервер,
        // я сделала глобальное перечисление, в котором эти имена поставлены в соответствие
        var dataFilterName = MAP_FILTERS[filterField.name];
        // и теперь по полученному имени достаю значение и проверяю, равно ли оно значению выбранного поля
        if (element.offer[dataFilterName] === filterValue) {
          return true;
        } else {
          return false;
        }
      }

      // Если выбранное поле имеет значение "любой", значит массив можно не обрабатывать
      // Это работает пока, потому что передается всегда исходный массив, полученный с сервера.
      // Потом, наверное, перенесу сравнение на 'any' внутрь isFilterTrue (когда будет множественный фильтр)
      // Не думала еще про это.
      if (filterValue === 'any') {
        return array;
      } else {
        return array.filter(isFilterTrue);
      }
    }
  };
})();
