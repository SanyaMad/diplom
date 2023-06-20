const forumPostsBlock = document.querySelector('#forum-list');
const postForm = document.querySelector('#forum-form');
let titleInput = document.getElementById("post-title");
let messageInput = document.getElementById("post-message");
let userNameSpan = document.getElementById("nick");
let forumPosts = JSON.parse(localStorage.getItem('forumPosts')) || [];


// Функция для генерации HTML-разметки поста
function generatePostMarkup() {
  let title = titleInput.value;
  let message = messageInput.value;
  let userId = userNameSpan.dataset.userId;
  let userName = userNameSpan.innerHTML;

  let post = {
    title: title,
    message: message,
    userId: userId, // добавляем поле userId в объект поста
    userName: userName
  };
  
  return (`<div class="forum__post">
  <div class="forumUser"> 
    <p class="forumUser__text">Пользователь:</p>
    <p class="forumUser__name">${post.userName}</p> 
  </div>
  <div class="forum__postContent">
    <h3 class="forum__postTitle">Тема: ${post.title}</h3> 
    <p class="forum__postText">${post.message}</p>
  </div>
  <a href="forumPost.html" class="forum__postBtn">
  <img src="img/forumBtn.png" alt="img" class="forum__postBtnImg"></a>
  </div>`);
}

// Функция для добавления нового поста
function addNewPost(event) {
  event.preventDefault(); // Отменяем стандартное поведение формы
    const formData = new FormData(event.target); // Получаем данные из формы
    formData.append('userName', userNameSpan.innerHTML); // Добавляем значение span в форму под именем userName
    const newPost = Object.fromEntries(formData); // Преобразуем данные в объект
    forumPosts.push(newPost); // Добавляем новый пост в массив постов
    localStorage.setItem('forumPosts', JSON.stringify(forumPosts)); // Сохраняем посты в localStorage
    const postMarkup = generatePostMarkup(newPost); // Генерируем HTML-разметку для нового поста
    forumPostsBlock.insertAdjacentHTML('beforeend', postMarkup); // Вставляем новый пост в блок
    postForm.reset(); // Сбрасываем значения формы
}

// Перебираем массив постов и добавляем их HTML-разметку в блок
forumPosts.forEach(post => {
  let userName = 'unknown user';
  if (post.userId === userNameSpan.dataset.userId) {
    userName = userNameSpan.innerHTML;
  }
  else {
    const user = JSON.parse(localStorage.getItem(post.userId));
    if (user) {
      userName = user.name;
    }
  }
  
  const postMarkup = 
  `<div class="forum__post">
  <div class="forumUser"> 
    <p class="forumUser__text">Пользователь:</p>
    <p class="forumUser__name">${post.userName}</p> 
  </div>
  <div class="forum__postContent">
    <h3 class="forum__postTitle">Тема: ${post.title}</h3> 
    <p class="forum__postText">${post.message}</p>
  </div>
  <a href="forumPost.html" class="forum__postBtn">
  <img src="img/forumBtn.png" alt="img" class="forum__postBtnImg"></a>
  </div>`
  ;
  forumPostsBlock.insertAdjacentHTML('beforeend', postMarkup);
});

// Добавляем обработчик события submit для формы
postForm.addEventListener('submit', addNewPost);