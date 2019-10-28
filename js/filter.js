'use strict';
window.filter = (function () {
  return {
    set: function (array, filterField) {
      var filterValue = filterField.selectedOptions[0].value;
      function isFilterTrue(element) {
        var dataFilterName = window.constants.MAP_FILTERS[filterField.name];
        if (element.offer[dataFilterName] === filterValue) {
          return true;
        } else {
          return false;
        }
      }
      if (filterValue === 'any') {
        return array;
      } else {
        return array.filter(isFilterTrue);
      }

    }
  };
})();
