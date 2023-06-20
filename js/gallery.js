// Get saved images from localStorage
let savedImages = localStorage.getItem('savedImages')
  ? JSON.parse(localStorage.getItem('savedImages')) : [];

const gallery = document.getElementById('gallery');

// Display saved images in the gallery
savedImages.forEach((imageUrl, index) => {
  displayImage(imageUrl, index);
});

function addImage() {
  const urlInput = document.getElementById('urlInput');
  const imageUrl = urlInput.value.trim();
  const marka = document.querySelector('.selectImg').value;

  let imageObject = {
    img: imageUrl,
    marka: marka
  }
  
  if (!imageUrl) {
    alert('Please enter an image URL.');
    return;
  }

  // Add the image URL to savedImages and localStorage
  savedImages.push(imageObject);
  localStorage.setItem('savedImages', JSON.stringify(savedImages));

  // Display the image in the gallery
  const index = savedImages.length - 1;
  displayImage(imageObject, index);

  urlInput.value = '';
}

function displayImage(imageObject, index) {
  const imageContainer = document.createElement('div');
  imageContainer.className = 'imageContainer';
  imageContainer.id = imageContainer-{index};
  if(JSON.parse(localStorage.getItem('admin'))){
    const deleteBtn = document.createElement('button');
    const deleteIcon = document.createTextNode('×');
    deleteBtn.appendChild(deleteIcon);
    deleteBtn.className = 'deleteBtn';
    deleteBtn.onclick = function() {
    // Remove the image from savedImages and localStorage
    savedImages.splice(index, 1);
    localStorage.setItem('savedImages', JSON.stringify(savedImages));
    // Remove the image from the gallery
    gallery.removeChild(imageContainer);
  };
  imageContainer.appendChild(deleteBtn);
  }
    const image = document.createElement('img');
    if(JSON.parse(localStorage.getItem('marka')) === imageObject.marka){
      image.src = imageObject.img;
    image.className = 'galleryImg';
    imageContainer.appendChild(image);

    image.addEventListener('click', function() { // добавляем обработчик события при клике на картинку
      const modalImage = document.createElement('img'); // создаем элемент для модального окна
      modalImage.src = this.src; // устанавливаем путь к изображению для модального окна
      modalImage.className = 'modalImage';

      const modal = document.createElement('div'); // создаем элемент для модального окна
      modal.className = 'galleryModal' 
      modal.appendChild(modalImage); // добавляем элемент картинки в модальное окно

      modal.addEventListener('click', function() { // добавляем обработчик события при клике на модальное окно
        modal.style.display = 'none'; // скрываем модальное окно
      });

      document.body.appendChild(modal); // добавляем элемент модального окна в конец тела документа
    });
    gallery.appendChild(imageContainer);
    }
    else if(JSON.parse(localStorage.getItem('marka')) === 'all'){
      image.src = imageObject.img;
      image.className = 'galleryImg';
      imageContainer.appendChild(image);
    
      image.addEventListener('click', function() { // добавляем обработчик события при клике на картинку
        const modalImage = document.createElement('img'); // создаем элемент для модального окна
        modalImage.src = this.src; // устанавливаем путь к изображению для модального окна
        modalImage.className = 'modalImage';
    
        const modal = document.createElement('div'); // создаем элемент для модального окна
        modal.className = 'galleryModal' 
        modal.appendChild(modalImage); // добавляем элемент картинки в модальное окно
    
        modal.addEventListener('click', function() { // добавляем обработчик события при клике на модальное окно
          modal.style.display = 'none'; // скрываем модальное окно
        });
    
        document.body.appendChild(modal); // добавляем элемент модального окна в конец тела документа
      });
      gallery.appendChild(imageContainer);
    }
  }