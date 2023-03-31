
    const fileInput = document.getElementById('file-input');
    const image = document.getElementById('image');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    // Load selected image on file input change
    fileInput.addEventListener('change', function () {
      const reader = new FileReader();
      reader.onload = function (event) {
        image.onload = function () {
          canvas.width = image.width;
          canvas.height = image.height;
          context.drawImage(image, 0, 0);
        };
        image.src = event.target.result;
      };
      reader.readAsDataURL(this.files[0]);
    });

    // Crop function
    document.getElementById('crop-button').addEventListener('click', function () {
      const cropWidth = 300;
      const cropHeight = 300;
      const cropX = (image.width - cropWidth) / 2;
      const cropY = (image.height - cropHeight) / 2;

      canvas.width = cropWidth;
      canvas.height = cropHeight;
      context.drawImage(image, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
      image.src = canvas.toDataURL();
    });

    // Rotate function
    document.getElementById('rotate-button').addEventListener('click', function () {
      const rotateAngle = 90 * Math.PI / 180;
      canvas.width = image.height;
      canvas.height = image.width;
      context.translate(canvas.width / 2, canvas.height / 2);
      context.rotate(rotateAngle);
      context.drawImage(image, -image.width / 2, -image.height / 2);
      image.src = canvas.toDataURL();
    });

    // Flip function
    document.getElementById('flip-button').addEventListener('click', function () {
      canvas.width = image.width;
      canvas.height = image.height;
      context.translate(canvas.width, 0);
      context.scale(-1, 1);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      image.src = canvas.toDataURL();
    });

    
    document.getElementById('reset-button').addEventListener('click', function () {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    });



    document.getElementById('download-button').addEventListener('click', function () {
      var link = document.createElement('a');
      link.download = 'edited-image.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });








