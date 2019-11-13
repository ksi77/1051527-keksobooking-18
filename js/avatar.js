// Файл avatar.js
// Доработайте форму подачи объявления так, чтобы в неё можно было загружать аватарку и фотографию жилья.
//

//
// Фотография жилья должна загружаться через поле загрузки файлов
// в блоке .ad-form__upload и показываться в блоке .ad-form__photo.
'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  // Аватарка пользователя должна загружаться через поле загрузки файлов в блоке .ad-form__field
  var fileChooser = document.querySelector('.ad-form__field input[type=file]');
  // и показываться в блоке .ad-form-header__preview.
  var preview = document.querySelector('.ad-form-header__preview');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
