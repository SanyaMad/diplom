function addArticle() {
    // получаем значения полей из формы
    var title = document.getElementById('article-title').value;
    var text = document.getElementById('article-text').value;
    var photo = document.getElementById('article-photo').files[0];
    
    // создаем объект статьи
    var article = {  
      title: title,
      text: text,
      photo: ''
    };
    
    if (photo) {
      // кодируем фото в base64 и сохраняем его в объекте статьи
      var reader = new FileReader();
      reader.readAsDataURL(photo); 
      reader.onloadend = function() {
        article.photo = reader.result;
        saveArticle(article); // сохраняем статью в localStorage
      }
    } else {
      saveArticle(article); // сохраняем статью в localStorage без фото
    }
    // очищаем форму после добавления статьи
    document.getElementById('article-title').value = '';
    document.getElementById('article-text').value = '';
    document.getElementById('article-photo').value = '';
  }
  
  function saveArticle(article) {
    // получаем список статей из localStorage
    var articles = JSON.parse(localStorage.getItem('articles')) || [];
    
    // добавляем новую статью в список
    articles.push(article);
    
    // сохраняем обновленный список статей в localStorage
    localStorage.setItem('articles', JSON.stringify(articles));
    
    // отображаем добавленную статью на странице
    displayArticles();
  }
  
  function deleteArticle(index) {
    // получаем список статей из localStorage
    var articles = JSON.parse(localStorage.getItem('articles')) || [];
    
    // удаляем статью из списка по индексу
    articles.splice(index, 1);
    
    // сохраняем обновленный список статей в localStorage
    localStorage.setItem('articles', JSON.stringify(articles));
    
    // отображаем обновленный список статей на странице
    displayArticles();
  }
  
  function displayArticles() {
    // получаем список статей из localStorage
    var articles = JSON.parse(localStorage.getItem('articles')) || [];
    
    // отображаем список статей на странице
    var articlesList = document.getElementById('articles-list');
    articlesList.innerHTML = '';
    for (var i=0; i<articles.length; i++) {
      var article = articles[i];
      var li = document.createElement('div');
      li.classList.add('article__card');
      li.innerHTML = '<div class="article__content"><h2 class="article__cardTitle">'+article.title+'</h2><p class="article__cardText">'+article.text+'</p></div>';
      if (article.photo) {
        li.innerHTML += '<img src="'+article.photo+'" alt="'+article.title+'" class="article__cardIMG">';
      }
      // добавляем кнопку для удаления статьи
      if(JSON.parse(localStorage.getItem('admin'))){
        li.innerHTML += '<button type="button" onclick="deleteArticle('+i+')" class="articleBtn">Удалить</button>';
      }
      articlesList.appendChild(li);
    }
  }
  
  // отображаем добавленные статьи при загрузке страницы
  displayArticles();