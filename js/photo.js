'use strict';

window.photo = (function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_AVATAR_IMG = 'img/muffin-grey.svg';
  var fileChoosers = {
    avatar: {
      chooser: document.querySelector('.ad-form__field input[type=file]'),
      preview: document.querySelector('.ad-form-header__preview img')
    },
    images: {
      chooser: document.querySelector('.ad-form__upload input[type=file]'),
      preview: document.querySelector('.ad-form__photo')
    }
  };

  function onFileChooserChange(evt) {
    var file = evt.target.files[0];
    var fileName = file.name.toLowerCase();
    var preview = fileChoosers[evt.target.id].preview;

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (preview.tagName === 'IMG') {
          preview.src = reader.result;
        } else {
          preview.style.backgroundImage = 'url(' + reader.result + ')';
        }
      });

      reader.readAsDataURL(file);
    }
  }

  Object.keys(fileChoosers).forEach(function (key) {
    fileChoosers[key].chooser.addEventListener('change', onFileChooserChange);
  });

  return {
    reset: function () {
      Object.keys(fileChoosers).forEach(function (key) {
        var preview = fileChoosers[key].preview;
        if (preview.tagName === 'IMG') {
          preview.src = DEFAULT_AVATAR_IMG;
        } else {
          preview.style.backgroundImage = '';
        }
      });
    }
  };
})();
