'use strict';
window.card = (function () {
  var cardTemplate = document.querySelector('#card')
                    .content
                    .querySelector('.map__card');
  var offerType = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

  function correctFormOfWord(word, number) {
    var numberNum = Number(number);
    var room = number + ' комнат';
    var guest = ' для ' + number + ' гостей';
    if (numberNum % 10 === 1) {
      room = number + ' комната';
      guest = ' для ' + number + ' гостя';
    } else if (numberNum === 0) {
      guest = ' не для гостей';
    } else if (numberNum % 10 < 5) {
      room = number + ' комнаты';
    }
    return (word === 'комната') ? room : guest;
  }

  function createFeaturesList(dataFeatures) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < dataFeatures.length; i++) {
      var newFeature = document.createElement('li');
      newFeature.classList.add('popup__feature');
      newFeature.classList.add('popup__feature--' + dataFeatures[i]);
      fragment.appendChild(newFeature);
    }
    return fragment;
  }

  function createPhotosList(photoTemplate, dataPhotos) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < dataPhotos.length; i++) {
      var newPhoto = photoTemplate.cloneNode(true);
      newPhoto.src = dataPhotos[i];
      fragment.appendChild(newPhoto);
    }
    return fragment;
  }

  // На основе первого по порядку элемента из сгенерированного массива
  // и шаблона #card создайте DOM-элемент объявления, заполните его данными из объекта:
  return {
    create: function (dataCard) {
      var newCard = cardTemplate.cloneNode(true);
      // Выведите заголовок объявления offer.title в заголовок .popup__title.
      if (!dataCard.hasOwnProperty('offer')) {
        return '';
      }

      var offer = dataCard.offer;

      function setElement(className, propertyName, fieldName, value) {
        var element = newCard.querySelector('.' + className);
        if (offer.hasOwnProperty(fieldName)) {
          element[propertyName] = value;
        } else {
          element.remove();
        }
      }

      setElement('popup__title', 'textContent', 'title', offer.title);
      // Выведите адрес offer.address в блок .popup__text--address.
      setElement('popup__text--address', 'textContent', 'address', offer.address);
      // Выведите цену offer.price в блок .popup__text--price строкой вида {{offer.price}}₽/ночь. Например, 5200₽/ночь.
      setElement('popup__text--price', 'textContent', 'price', offer.price + '₽/ночь');
      // В блок .popup__type выведите тип жилья offer.type: Квартира для flat, Бунгало для bungalo, Дом для house, Дворец для palace.
      setElement('popup__type', 'textContent', 'type', offerType[offer.type]);
      // Выведите количество гостей и комнат offer.rooms и offer.guests в блок .popup__text--capacity
      // строкой вида {{offer.rooms}} комнаты для {{offer.guests}} гостей. Например, 2 комнаты для 3 гостей.
      setElement('popup__text--capacity', 'textContent', 'rooms', correctFormOfWord('комната', offer.rooms) + correctFormOfWord('гость', offer.guests));
      // Время заезда и выезда offer.checkin и offer.checkout в блок .popup__text--time строкой вида
      // Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}. Например, заезд после 14:00, выезд до 12:00.
      setElement('popup__text--time', 'textContent', 'checkin', 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout);
      // В список .popup__features выведите все доступные удобства в объявлении.
      var features = newCard.querySelector('.popup__features');
      if (offer.hasOwnProperty('features')) {
        features.innerHTML = '';
        features.appendChild(createFeaturesList(offer.features));
      } else {
        features.remove();
      }
      // В блок .popup__description выведите описание объекта недвижимости offer.description.
      setElement('popup__description', 'description', offer.description);
      // В блок .popup__photos выведите все фотографии из списка offer.photos.
      // Каждая из строк массива photos должна записываться как src соответствующего изображения.
      var photos = newCard.querySelector('.popup__photos');
      var photoTemplate = photos.querySelector('.popup__photo');
      if (offer.hasOwnProperty('photos')) {
        photos.innerHTML = '';
        photos.appendChild(createPhotosList(photoTemplate, offer.photos));
      } else {
        photos.remove();
      }
      // Замените src у аватарки пользователя — изображения, которое записано в .popup__avatar —
      // на значения поля author.avatar отрисовываемого объекта.
      newCard.querySelector('.popup__avatar').src = dataCard.author.avatar;

      var onOfferCardEscPress = function (evt) {
        window.util.isEscEvent(evt, removeOfferCard);
      };

      function removeOfferCard() {
        window.util.removeCard();
        document.removeEventListener('keydown', onOfferCardEscPress);
      }

      var closeButton = newCard.querySelector('.popup__close');

      closeButton.addEventListener('click', function () {
        removeOfferCard();
      });

      document.addEventListener('keydown', onOfferCardEscPress);

      window.data.openedCard = newCard;
      return newCard;
    },
  };

})();
