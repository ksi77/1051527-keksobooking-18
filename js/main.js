'use strict';
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
var AVATAR_FILE_PREFIX = 'img/avatars/user';
var DESCRIPTION_LENGTH = 500;

var pinsList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content;
var similarPin = pinTemplate.querySelector('.map__pin');
var PIN_WIDTH = similarPin.clientWidth;
var PIN_HEIGHT = similarPin.clientHeight;

var mapBlock = document.querySelector('.map');
var BLOCK_WIDTH = mapBlock.clientWidth;
var avatarFiles = createFileList(AVATAR_FILE_PREFIX, 8, '.png');
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

function createFileList(fileTemplatePrefix, fileCount, fileExtention) {
  var files = [];
  for (var i = 0; i < fileCount; i++) {
    files.push(fileTemplatePrefix + '0' + (i + 1) + fileExtention);
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
  var newArraylength = (uniqueElements === true || maxlength > arrayCopy.lengtn) ? getRandomNumberBetween(1, arrayCopy.length) : maxlength;
  var newArray = [];
  for (var i = 0; i < newArraylength; i++) {
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
  for (var i = 0; i < offers.length; i++) {
    fragment.appendChild(renderNewPin(offersList[i]));
  }
  pinsList.appendChild(fragment);
}

mapBlock.classList.remove('map--faded');
renderOffersList(offers);
