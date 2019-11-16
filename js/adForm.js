'use strict';
window.adForm = (function () {
  var adForm = window.data.adForm;
  var resetButton = adForm.querySelector('.ad-form__reset');
  var inputRoomNumber = adForm.querySelector('#room_number');
  var inputCapacity = adForm.querySelector('#capacity');
  var inputTimeIn = adForm.querySelector('#timein');
  var inputTimeOut = adForm.querySelector('#timeout');
  var inputAddress = adForm.querySelector('#address');

  var arrayOfListsElements = [
    adForm.querySelectorAll('input'),
    adForm.querySelectorAll('select'),
    adForm.querySelectorAll('textarea')
  ];
  var inputPrice = adForm.querySelector('#price');
  var inputHousingType = adForm.querySelector('#type');

  function setAddress(toCenter) {
    var addressX = window.data.mapPinMain.offsetLeft + (toCenter ? window.data.MapPinSize.RADIUS : window.data.MapPinSize.WIDTH / 2);
    var addressY = window.data.mapPinMain.offsetTop + (toCenter ? window.data.MapPinSize.RADIUS : window.data.MapPinSize.HEIGHT);
    inputAddress.value = Math.round(addressX) + ', ' + Math.round(addressY);
  }

  function setValidationCapacity() {
    var selectedRoomNumber = inputRoomNumber.selectedOptions[0].value;
    var capacities = [
      inputCapacity.querySelector('[value="0"]'),
      inputCapacity.querySelector('[value="1"]'),
      inputCapacity.querySelector('[value="2"]'),
      inputCapacity.querySelector('[value="3"]')
    ];

    function setDisabled(arrayOfValues) {
      capacities.forEach(function (item, index) {
        item.disabled = arrayOfValues[index];
      });
    }

    switch (selectedRoomNumber) {
      // 1 комната — «для 1 гостя»;
      case '1': // 1 комната
        setDisabled([true, false, true, true]);
        break;
      // 2 комнаты — «для 2 гостей» или «для 1 гостя»;
      case '2': // 2 комнаты
        setDisabled([true, false, false, true]);
        break;
      // 3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»;
      case '3': // 3 комнаты
        setDisabled([true, false, false, false]);
        break;
      // 100 комнат — «не для гостей».
      case '100': // 100 комнат
        setDisabled([false, true, true, true]);
        break;
    }
    if (inputCapacity.selectedOptions[0].disabled) {
      inputCapacity.setCustomValidity('Выберите доступное количество гостей');
    }
  }

  function setValidationPrice() {
    var selectedHousingType = inputHousingType.selectedOptions[0].value;
    function setPrice(min) {
      inputPrice.min = min;
      inputPrice.placeholder = min;
    }
    switch (selectedHousingType) {
      case 'bungalo':
        setPrice('0');
        break;
      case 'flat':
        setPrice('1000');
        break;
      case 'house':
        setPrice('5000');
        break;
      case 'palace':
        setPrice('10000');
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
    evt.preventDefault();
    window.backend.save(new FormData(adForm), window.messenger.onSaveSuccess, window.messenger.onSaveError);
  });

  resetButton.addEventListener('click', function () {
    window.map.totalReset();
  });

  resetButton.addEventListener('kewdown', function (evt) {
    window.util.isEscEvent(evt, window.map.totalReset());
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
  setAddress(true);

  return {
    activate: function (active) {
      if (active) {
        adForm.classList.remove('ad-form--disabled');
        window.adForm.setAddress(false);
      } else {
        adForm.classList.add('ad-form--disabled');
      }
      arrayOfListsElements.forEach(function (currentArray) {
        currentArray.forEach(function (element) {
          element.disabled = !active;
        });
      });
    },

    reset: function () {
      adForm.reset();
      window.photo.reset();
    },

    setAddress: setAddress
  };

})();
