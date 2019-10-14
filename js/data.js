'use strict';
(function () {
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

  function getRandomNumberBetween(minNumber, maxNumber) {
    return Math.round(minNumber + Math.random() * (maxNumber - minNumber));
  }

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
          x: getRandomNumberBetween(window.constants.PIN_WIDTH / 2, window.constants.BLOCK_WIDTH) - window.constants.PIN_WIDTH / 2,
          y: getRandomNumberBetween(130, 630) - window.constants.PIN_HEIGHT
        }
      }
      );
    }
    return offersList;
  }

  var avatarFiles = createFileList(AVATAR_FILE_TEMPLATE, 8);
  var offers = createOffersList(OFFERS_COUNT);
  window.data = {
    offers: offers
  };
})();
