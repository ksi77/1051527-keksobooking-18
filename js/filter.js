// Воспользуйтесь приёмом «устранение дребезга» для того, чтобы сделать так, чтобы при переключении
// фильтра обновление списка элементов, подходящих под фильтры, происходило не чаще, чем один раз в полсекунды.

'use strict';
window.filter = (function () {
  var mapFilters = {
    'housing-type': 'type',
    'housing-rooms': 'rooms',
    'housing-guests': 'guests',
    'housing-price': 'price',
    'filter-wifi': 'wifi',
    'filter-dishwasher': 'dishwasher',
    'filter-parking': 'parking',
    'filter-washer': 'washer',
    'filter-elevator': 'elevator',
    'filter-conditioner': 'conditioner'
  };

  var filters = [];
  var setFilter = window.debounce(function () {
    var array = window.data.offers;
    var dataFilterName = '';
    var filterValue = '';

    function isPriceInRange(price, range) {
      price = Number(price);
      switch (range) {
        case 'high':
          if (price >= 50000) {
            return true;
          }
          break;
        case 'low':
          if (price < 10000) {
            return true;
          }
          break;
        case 'middle':
          if (price >= 10000 & price < 50000) {
            return true;
          }
          break;
      }
      return false;
    }

    function isFilterTrue(element) {
      switch (dataFilterName) {
        case 'price':
          return isPriceInRange(element.offer[dataFilterName], filterValue);
        case 'guests':
        case 'rooms':
          return Number(filterValue) === Number(element.offer[dataFilterName]);
        default:
          return element.offer[dataFilterName].toString().indexOf(filterValue) + 1;
      }
    }

    function setFilterValue(item) {
      if (item.type === 'select-one') {
        filterValue = item.selectedOptions[0].value;
        dataFilterName = mapFilters[item.id];
      } else if (item.type === 'checkbox') {
        filterValue = item.checked === true ? item.value : 'any';
        dataFilterName = 'features';
      }
    }

    filters.forEach(function (item) {
      setFilterValue(item);
      array = (filterValue === 'any') ? array : array.filter(isFilterTrue);
    });
    window.map.renderPins(array);
  });

  Object.keys(mapFilters).forEach(function (key) {
    var filterElement = window.data.mapBlock.querySelector('#' + key);
    filterElement.addEventListener('change', setFilter);
    filters.push(filterElement);
  });


})();
