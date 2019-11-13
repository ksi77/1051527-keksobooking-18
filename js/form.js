'use strict';
window.form = (function () {
  var adForm = window.data.adForm;
  var inputRoomNumber = adForm.querySelector('#room_number');
  var inputCapacity = adForm.querySelector('#capacity');
  var inputTimeIn = adForm.querySelector('#timein');
  var inputTimeOut = adForm.querySelector('#timeout');
  var arrayOfListsElements = [
    adForm.querySelectorAll('input'),
    adForm.querySelectorAll('select'),
    adForm.querySelectorAll('textarea')
  ];
  var inputPrice = adForm.querySelector('#price');
  var inputHousingType = adForm.querySelector('#type');

  function setValidationCapacity() {
    var selectedRoomNumber = inputRoomNumber.selectedOptions[0].value;
    var capacity1 = inputCapacity.querySelector('[value="1"]');
    var capacity2 = inputCapacity.querySelector('[value="2"]');
    var capacity3 = inputCapacity.querySelector('[value="3"]');
    var capacity0 = inputCapacity.querySelector('[value="0"]');

    switch (selectedRoomNumber) {
      // 1 комната — «для 1 гостя»;
      case '1': // 1 комната
        capacity1.disabled = false;
        capacity2.disabled = true;
        capacity3.disabled = true;
        capacity0.disabled = true;
        break;
      // 2 комнаты — «для 2 гостей» или «для 1 гостя»;
      case '2': // 2 комнаты fftt
        capacity1.disabled = false;
        capacity2.disabled = false;
        capacity3.disabled = true;
        capacity0.disabled = true;
        break;
      // 3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»;
      case '3': // 3 комнаты ffft
        capacity1.disabled = false;
        capacity2.disabled = false;
        capacity3.disabled = false;
        capacity0.disabled = true;
        break;
      // 100 комнат — «не для гостей».
      case '100': // 100 комнат tttf
        capacity1.disabled = true;
        capacity2.disabled = true;
        capacity3.disabled = true;
        capacity0.disabled = false;
        break;
    }
    if (inputCapacity.selectedOptions[0].disabled) {
      inputCapacity.setCustomValidity('Выберите доступное количество гостей');
    }
  }

  function setValidationPrice() {
    var selectedHousingType = inputHousingType.selectedOptions[0].value;
    switch (selectedHousingType) {
      case 'bungalo':
        inputPrice.min = '0';
        inputPrice.placeholder = '0';
        break;
      case 'flat':
        inputPrice.min = '1000';
        inputPrice.placeholder = '1000';
        break;
      case 'house':
        inputPrice.min = '5000';
        inputPrice.placeholder = '5000';
        break;
      case 'palace':
        inputPrice.min = '10000';
        inputPrice.placeholder = '10000';
        break;
      default:
    }
  }

  function setValidationTime(timeFieldName) {
    switch (timeFieldName) {
      case 'timeIn':
        inputTimeIn.options[inputTimeOut.options.selectedIndex].selected = true;
        break;
      case 'timeOut':
        inputTimeOut.options[inputTimeIn.options.selectedIndex].selected = true;
        break;
    }
  }

  adForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(adForm), window.backend.onSaveSuccess, window.backend.onSaveError);
    evt.preventDefault();
  });

  inputCapacity.addEventListener('change', function () {
    if (!inputCapacity.selectedOptions[0].disabled) {
      inputCapacity.setCustomValidity('');
    }
  });

  inputRoomNumber.addEventListener('change', function () {
    setValidationCapacity();
  });

  inputHousingType.addEventListener('change', function () {
    setValidationPrice();
  });

  inputTimeIn.addEventListener('change', function () {
    setValidationTime('timeOut');
  });

  inputTimeOut.addEventListener('change', function () {
    setValidationTime('timeIn');
  });

  setValidationCapacity();
  setValidationPrice();

  return {
    activate: function (active) {
      if (active) {
        adForm.classList.remove('ad-form--disabled');
      } else {
        adForm.classList.add('ad-form--disabled');
      }

      for (var i = 0; i < arrayOfListsElements.length; i++) {
        var currentList = arrayOfListsElements[i];
        for (var j = 0; j < currentList.length; j++) {
          currentList[j].disabled = !active;
        }
      }
    }
  };

})();
