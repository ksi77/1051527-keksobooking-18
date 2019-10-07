'use strict';
var ENTER_KEYCODE = 13;
// Напишите функцию для создания массива из 8 сгенерированных JS объектов. Каждый объект массива ‐ описание похожего объявления неподалёку. Структура объектов должна быть следующей:
var OFFERS_COUNT = 8;

var PHOTO_FILES = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var TIMES_OF_CHECK = ['12:00', '13:00', '14:00'];
var TITLE = 'Предложение №';
var TYPES_OF_HOUSE = ['palace', 'flat', 'house', 'bungalo'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var LETTERS = 'абвгдеёжзийклмнопрстуфхцчшщэюя   ';
var AVATAR_FILE_TEMPLATE = 'img/avatars/user{{x}}.png';
var DESCRIPTION_LENGTH = 500;

var pinsList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content;
var similarPin = pinTemplate.querySelector('.map__pin');
var address = document.querySelector('#address');
var PIN_WIDTH = similarPin.clientWidth;
var PIN_HEIGHT = similarPin.clientHeight;

var mapBlock = document.querySelector('.map');
var BLOCK_WIDTH = mapBlock.clientWidth;
var avatarFiles = createFileList(AVATAR_FILE_TEMPLATE, 8);
var offers = createOffersList(OFFERS_COUNT);

function createRandomString(letters, maxLength) {
  var stringLength = getRandomNumberBetween(100, maxLength);
  var string = '';
  for (var i = 0; i < stringLength - 1; i++) {
    string = string + letters.charAt(Math.round(Math.random() * letters.length));
  }
  string = string + '.';
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function createFileList(fileTemplate, fileCount) {
  var files = [];
  for (var i = 0; i < fileCount; i++) {
    files.push(fileTemplate.replace('{{x}}', '0' + (i + 1)));
  }
  return files;
}

function getRandomElement(array, uniqueElement) {
  var randomIndex = Math.round((array.length - 1) * Math.random());
  var randomElement = array[randomIndex];
  if (uniqueElement === true) {
    array.splice(randomIndex, 1);
  }
  return randomElement;
}

function getRandomNumberBetween(minNumber, maxNumber) {
  return Math.round(minNumber + Math.random() * (maxNumber - minNumber));
}

function getRandomArray(array, maxlength, uniqueElements) {
  var arrayCopy = array;
  var newArrayLength = (uniqueElements === true || maxlength > arrayCopy.lengtn) ? getRandomNumberBetween(1, arrayCopy.length) : maxlength;
  var newArray = [];
  for (var i = 0; i < newArrayLength; i++) {
    newArray.push(getRandomElement(arrayCopy, uniqueElements));
  }
  return newArray;
}

function createOffersList(offersListLength) {
  var offersList = [];
  for (var i = 0; i < offersListLength; i++) {
    offersList.push({
      author: {
        // Например, 01, 02 и т. д. Адреса изображений не повторяются
        avatar: getRandomElement(avatarFiles, true)
      },
      offer: {
        title: TITLE + (i + 1),
        address: '' + getRandomNumberBetween(100, 999) + ', ' + getRandomNumberBetween(100, 999),
        price: getRandomNumberBetween(200, 1000) + 'EUR',
        type: getRandomElement(TYPES_OF_HOUSE),
        rooms: getRandomNumberBetween(1, 10),
        guests: getRandomNumberBetween(1, 10),
        checkin: getRandomElement(TIMES_OF_CHECK),
        checkout: getRandomElement(TIMES_OF_CHECK),
        features: getRandomArray(FEATURES, FEATURES.length, true),
        description: createRandomString(LETTERS, DESCRIPTION_LENGTH),
        photos: getRandomArray(PHOTO_FILES, PHOTO_FILES.length, true)
      },
      location: {
        x: getRandomNumberBetween(PIN_WIDTH / 2, BLOCK_WIDTH) - PIN_WIDTH / 2,
        y: getRandomNumberBetween(130, 630) - PIN_HEIGHT
      }
    }
    );
  }
  return offersList;
}

function renderNewPin(offer) {
  var newPin = similarPin.cloneNode(true);
  var newPinImg = newPin.querySelector('img');
  newPinImg.src = offer.author.avatar;
  newPinImg.alt = offer.author.title;
  newPin.style.left = offer.location.x + 'px';
  newPin.style.top = offer.location.y + 'px';
  return newPin;
}

function renderOffersList(offersList) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < offersList.length; i++) {
    fragment.appendChild(renderNewPin(offersList[i]));
  }
  pinsList.appendChild(fragment);
}

// renderOffersList(offers);
// Все <input> и <select> формы .ad-form заблокированы с помощью атрибута disabled,
// добавленного на них или на их родительские блоки fieldset;
var adForm = document.querySelector('.ad-form');
var inputFields = adForm.querySelectorAll('input');
var selectFields = adForm.querySelectorAll('select');
var mapFilters = document.querySelector('.map__filters');
var mapPinMain = document.querySelector('.map__pin--main');
var inputRoomNumber = adForm.querySelector('#room_number');
var inputCapacity = adForm.querySelector('#capacity');

function activateElements() {
  mapBlock.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map-filters--disabled');
  disableElements([inputFields, selectFields], false);
}

function disableElements(arrayOfListsElements, disabled) {
  for (var i = 0; i < arrayOfListsElements.length; i++) {
    var currentList = arrayOfListsElements[i];
    for (var j = 0; j < currentList.length; j++) {
      currentList[j].disabled = disabled;
    }
  }
}

function setAddress(pin) {
  var addressX = 1 * (pin.style.top).replace('px', '') + pin.clientWidth / 2;
  var addressY = 1 * (pin.style.left).replace('px', '') + pin.clientHeight;
  address.textContent = Math.round(addressX) + ', ' + addressY;
}

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
      capacity2.disabled = false;
      capacity3.disabled = false;
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

disableElements([inputFields, selectFields], true);
// Первое взаимодействие с меткой (mousedown) переводит страницу в активное состояние.
mapPinMain.addEventListener('mousedown', function () {
  activateElements();
  setAddress(mapPinMain);
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    disableElements([inputFields, selectFields, adForm, mapFilters], false);
  }
});

setValidationCapacity();
