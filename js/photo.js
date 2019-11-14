// Файл avatar.js
// Доработайте форму подачи объявления так, чтобы в неё можно было загружать аватарку и фотографию жилья.

'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  // и показываться в блоке .ad-form-header__preview.
  var avatarPreview = document.querySelector('.ad-form-header__preview img');

  avatarChooser.addEventListener('change', function (evt) {
    var file = evt.target.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = 'url(' + reader.result + ')';
      });

      reader.readAsDataURL(file);
    }
  });
  // Фотография жилья должна загружаться через поле загрузки файлов
  // в блоке .ad-form__upload
  var photoChooser = document.querySelector('.ad-form__upload input[type=file]');
  // и показываться в блоке .ad-form__photo.
  var photoPreview = document.querySelector('.ad-form__photo');

  photoChooser.addEventListener('change', function (evt) {
    var file = evt.target.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        photoPreview.style.backgroundImage = 'url(' + reader.result + ')';
      });

      reader.readAsDataURL(file);
    }
  });

})();
