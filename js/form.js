'use strict';
(function () {
  var inputRoomNumber = window.constants.AD_FORM.querySelector('#room_number');
  var inputCapacity = window.constants.AD_FORM.querySelector('#capacity');

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

  inputCapacity.addEventListener('change', function () {
    if (!inputCapacity.selectedOptions[0].disabled) {
      inputCapacity.setCustomValidity('');
    }
  });

  inputRoomNumber.addEventListener('change', function () {
    setValidationCapacity();
  });

  setValidationCapacity();
})();
